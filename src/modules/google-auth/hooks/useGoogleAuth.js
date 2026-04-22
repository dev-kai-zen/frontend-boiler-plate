import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAuthStore from "../../../common/store/authStore";
import { SESSION_HINT_KEY } from "../../../common/constants/session";
import googleAuthApi from "../api/googleAuthApi";
import { useShallow } from "zustand/react/shallow";

/**
 * Handles redirect when already authenticated and Google sign-in flow.
 * @returns {{ handleGoogleLogin: (credentialResponse: object) => Promise<void>, handleLoginError: () => void }}
 */
export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);

  const { accessToken, user, setAuth } = useAuthStore(
    useShallow((state) => {
      return {
        accessToken: state.accessToken,
        user: state.user,
        setAuth: state.setAuth,
      };
    }),
  );

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (accessToken && user) {
      navigate("/home", { replace: true });
    }
  }, [accessToken, user, navigate]);

  const handleGoogleLogin = async (credentialResponse) => {
    const googleToken = credentialResponse?.credential;
    if (!googleToken) {
      enqueueSnackbar("Login failed. Please try again.", { variant: "error" });
      return;
    }

    try {
      setLoading(true);
      const response = await googleAuthApi.loginWithGoogleToken(googleToken);

      if (response?.success && response?.data?.accessToken) {
        setAuth({
          accessToken: response.data.accessToken,
          user: response.data.user,
          permissions: response.data.permissions,
        });
        try {
          localStorage.setItem(SESSION_HINT_KEY, "1");
        } catch {
          // ignore
        }

        enqueueSnackbar("Logged in successfully", { variant: "success" });
      } else {
        const message = response?.message || "Login failed. Please try again.";
        enqueueSnackbar(message, { variant: "error" });
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      enqueueSnackbar(message, {
        variant: "error",
        style: { whiteSpace: "pre-line" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginError = () => {
    enqueueSnackbar(
      "Google sign-in was cancelled or failed. Please try again.",
      {
        variant: "error",
      },
    );
  };

  return { handleGoogleLogin, handleLoginError, loading };
};
