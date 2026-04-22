import axios from "axios";
import { getEnv } from "../utils/env";

const { apiBaseUrl } = getEnv();

let authHandlers = {
  getAccessToken: null,
  setAuth: null,
  clearAuth: null,
  onRefreshFailure: null,
};

let csrfToken = null;

const setCsrfToken = (token) => {
  csrfToken = token || null;
};

const configureApiClientAuth = (handlers) => {
  authHandlers = {
    ...authHandlers,
    ...handlers,
  };
};

// Shared API client with base URL and cookies enabled.
const apiClient = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

// Always return response.data for consistency.
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error?.config || {};
    const status = error?.response?.status;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await apiClient.post(
          "/api/v1/google-auth/retry-login",
          {},
          { skipAuthRefresh: true },
        );

        if (refreshResponse?.success && refreshResponse?.data?.accessToken) {
          authHandlers.setAuth?.({
            accessToken: refreshResponse.data.accessToken,
            user: refreshResponse.data.user,
          });

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${
            refreshResponse.data.accessToken
          }`;

          return apiClient.request(originalRequest);
        }
      } catch {
        authHandlers.clearAuth?.();
        await authHandlers.onRefreshFailure?.();
      }
    }

    return Promise.reject(error);
  },
);

apiClient.interceptors.request.use((config) => {
  const accessToken = authHandlers.getAccessToken?.();

  if (accessToken && !config.headers?.Authorization) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (csrfToken && !config.headers?.["X-XSRF-TOKEN"]) {
    config.headers = config.headers || {};
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }

  return config;
});

export { configureApiClientAuth, setCsrfToken };
export default apiClient;
