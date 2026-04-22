import { useEffect, useState } from "react";
import apiClient, { setCsrfToken } from "../api/apiClient";
import googleAuthApi from "../../modules/google-auth/api/googleAuthApi";
import { SESSION_HINT_KEY } from "../constants/session";
import useAuthStore from "../store/authStore";

/**
 * CSRF + optional session restore (cookie/hint flow used by the API).
 */
const bootstrapCsrf = async () => {
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await apiClient.get("/api/v1/csrf", {
        skipAuthRefresh: true,
      });
      if (response?.csrfToken) {
        setCsrfToken(response.csrfToken);
      }
      return;
    } catch {
      if (attempt === maxAttempts) {
        return;
      }
      const delayMs = 200 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

/**
 * @returns {{ isReady: boolean }}
 */
export const useAuthBootstrap = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      await bootstrapCsrf();

      const hasSessionHint = (() => {
        try {
          return !!localStorage.getItem(SESSION_HINT_KEY);
        } catch {
          return false;
        }
      })();

      if (!hasSessionHint) {
        if (active) setIsReady(true);
        return;
      }

      try {
        const response = await googleAuthApi.retryLogin();
        if (!active) return;

        if (response?.success && response?.data?.accessToken) {
          useAuthStore.getState().setAuth({
            accessToken: response.data.accessToken,
            user: response.data.user ?? null,
            permissions: response.data.permissions ?? [],
          });
          try {
            localStorage.setItem(SESSION_HINT_KEY, "1");
          } catch {
            // ignore
          }
        } else {
          useAuthStore.getState().clearAuth();
        }
      } catch {
        if (active) {
          useAuthStore.getState().clearAuth();
          try {
            localStorage.removeItem(SESSION_HINT_KEY);
          } catch {
            // ignore
          }
        }
      } finally {
        if (active) setIsReady(true);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  return { isReady };
};
