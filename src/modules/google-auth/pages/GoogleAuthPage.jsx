import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { themeTokens } from "../../../common/theme/themeTokens";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const GoogleAuthPage = () => {
  const { handleGoogleLogin, handleLoginError, loading } = useGoogleAuth();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 15% 20%, #eaf2ff 0%, rgba(234, 242, 255, 0) 45%)," +
            "radial-gradient(circle at 85% 80%, #ffe8cc 0%, rgba(255, 232, 204, 0) 40%)",
          zIndex: 0,
        }}
      />

      <Card
        elevation={0}
        sx={{
          zIndex: 1,
          width: "min(440px, 92vw)",
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: 6,
          textAlign: "center",
          bgcolor: "#fff",
          position: "relative",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              bgcolor: "rgba(255, 255, 255, 0.85)",
              zIndex: 2,
            }}
          >
            <CircularProgress size={48} />
          </Box>
        )}
        <Stack alignItems="center">
          <Box
            sx={{
              borderRadius: "10px",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/asa_philippines_logo_light.png"
              alt="ASA Icon"
              style={{
                width: "300px",
                height: "150px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>

          <Box>
            <Typography
              variant="h1"
              sx={{
                mb: 15,
                fontWeight: 400,
                color: themeTokens.brand.primary,
              }}
            >
              ASA Philippines Employee Credit Cooperative
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Sign in with your Asaphil Google Workspace Account
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={handleLoginError}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default GoogleAuthPage;
