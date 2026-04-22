import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { configureApiClientAuth } from "../api/apiClient";
import useAuthStore from "../store/authStore";

/**
 * Binds the axios client to Zustand auth + refresh failure navigation.
 */
export const useConfigureApiClientAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlers = {
      getAccessToken: () => useAuthStore.getState().accessToken,
      setAuth: (payload) => {
        useAuthStore.getState().setAuth({
          accessToken: payload?.accessToken,
          user: payload?.user,
          permissions: payload?.permissions,
        });
      },
      clearAuth: () => {
        useAuthStore.getState().clearAuth();
      },
      onRefreshFailure: async () => {
        useAuthStore.getState().clearAuth();
        navigate("/login", { replace: true });
      },
    };

    configureApiClientAuth(handlers);
  }, [navigate]);
};
