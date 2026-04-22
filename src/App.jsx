import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";
import AppRoutes from "./common/routes/AppRoutes";
import { getEnv } from "./common/utils/env";
import { useAuthBootstrap } from "./common/hooks/useAuthBootstrap";
import { useConfigureApiClientAuth } from "./common/hooks/useConfigureApiClientAuth";
import LoadingSessions from "./common/components/LoadingSessions";

const App = () => {
  const { googleClientId } = getEnv();
  useConfigureApiClientAuth();
  const { isReady } = useAuthBootstrap();

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
      >
        {isReady ? (
          <>
            <AppRoutes />
          </>
        ) : (
          <LoadingSessions />
        )}
      </SnackbarProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
