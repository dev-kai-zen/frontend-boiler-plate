import apiClient, { setCsrfToken } from "../../../common/api/apiClient";

let retryLoginInFlight = null;

/** Google OAuth + session HTTP helpers (login, refresh cookie session, logout, me). */
const googleAuthApi = {
  loginWithGoogleToken: async (googleToken) => {
    return apiClient.post("/api/v1/google-auth/login", { googleToken });
  },

  getMe: async () => {
    return apiClient.get("/api/v1/google-auth/me");
  },

  retryLogin: async () => {
    if (retryLoginInFlight) return retryLoginInFlight;
    retryLoginInFlight = (async () => {
      try {
        return await apiClient.post(
          "/api/v1/google-auth/retry-login",
          {},
          { skipAuthRefresh: true },
        );
      } catch (error) {
        if (
          error?.response?.status === 401 &&
          error?.response?.data?.message === "Not Logged In"
        ) {
          return null;
        }
        throw error;
      } finally {
        retryLoginInFlight = null;
      }
    })();
    return retryLoginInFlight;
  },

  logout: async () => {
    try {
      const csrfRes = await apiClient.get("/api/v1/csrf", {
        skipAuthRefresh: true,
      });
      if (csrfRes?.csrfToken) {
        setCsrfToken(csrfRes.csrfToken);
      }
    } catch {
      // still attempt logout with any in-memory token
    }
    return apiClient.post(
      "/api/v1/google-auth/logout",
      {},
      { skipAuthRefresh: true },
    );
  },
};

export default googleAuthApi;
