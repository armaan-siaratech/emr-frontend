/**
 * Advanced EMR HTTP Client with Credentials support & Silent Token Refresh Interceptor
 */

export interface FetchOptions extends RequestInit {
  retryOnAuthError?: boolean;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let isRefreshing = false;
let refreshSubscribers: Array<(success: boolean) => void> = [];

function subscribeTokenRefresh(cb: (success: boolean) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(success: boolean) {
  refreshSubscribers.forEach((cb) => cb(success));
  refreshSubscribers = [];
}

export async function apiClient<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { retryOnAuthError = true, headers, ...restOptions } = options;

  const isFormData = typeof FormData !== "undefined" && restOptions.body instanceof FormData;

  const reqHeaders = new Headers(headers);

  if (!isFormData && !reqHeaders.has("Content-Type")) {
    reqHeaders.set("Content-Type", "application/json");
  } else if (isFormData) {
    reqHeaders.delete("Content-Type");
  }

  const config: RequestInit = {
    credentials: "include",
    headers: reqHeaders,
    ...restOptions,
  };

  try {
    const response = await fetch(endpoint, config);

    // If request succeeded (2xx)
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      }
      return (await response.text()) as unknown as T;
    }

    // Handle 401 Unauthorized for silent refresh
    const isAuthPath =
      endpoint.includes("/login") || endpoint.includes("/refresh") || endpoint.includes("/logout");

    if (response.status === 401 && retryOnAuthError && !isAuthPath) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Trigger silent token refresh
          const refreshRes = await fetch("/api/account/refresh", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

          if (refreshRes.ok) {
            isRefreshing = false;
            onRefreshed(true);
            // Retry original request
            return apiClient<T>(endpoint, { ...options, retryOnAuthError: false });
          } else {
            isRefreshing = false;
            onRefreshed(false);
            throw new ApiError(401, "Session expired. Please log in again.");
          }
        } catch (refreshErr) {
          isRefreshing = false;
          onRefreshed(false);
          throw new ApiError(401, "Session expired. Please log in again.");
        }
      } else {
        // Queue pending request while token is refreshing
        return new Promise<T>((resolve, reject) => {
          subscribeTokenRefresh((success) => {
            if (success) {
              resolve(apiClient<T>(endpoint, { ...options, retryOnAuthError: false }));
            } else {
              reject(new ApiError(401, "Session expired. Please log in again."));
            }
          });
        });
      }
    }

    // Extract backend error message
    let errorDetail = `HTTP Error ${response.status}`;
    let errorData: any = null;
    try {
      errorData = await response.json();
      if (errorData?.detail) {
        errorDetail = typeof errorData.detail === "string" ? errorData.detail : JSON.stringify(errorData.detail);
      } else if (errorData?.message) {
        errorDetail = errorData.message;
      }
    } catch (_) {
      // Ignore JSON parse error on response
    }

    // Global Tenant Suspension Interceptor
    if (response.status === 403 && typeof errorDetail === "string" && (errorDetail.toLowerCase().includes("suspended") || errorDetail.toLowerCase().includes("restricted"))) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("tenant-suspended", { detail: errorDetail }));
      }
    }

    throw new ApiError(response.status, errorDetail, errorData);
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(500, err?.message || "Network error. Please check backend connection.");
  }
}
