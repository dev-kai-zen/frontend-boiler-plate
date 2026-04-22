import { Box, CircularProgress, Typography } from "@mui/material";
import { themeTokens } from "../theme/themeTokens";

const LoadingSessions = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 4,
          borderRadius: 3,
          bgcolor: themeTokens.brand.secondary,
          color: "text.primary",
          boxShadow: (theme) =>
            theme.palette.mode === "light"
              ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
        }}
      >
        <Typography variant="h6" sx={{ color: themeTokens.brand.primary }}>
          Loading session
        </Typography>
        <CircularProgress aria-label="Loading session" />
      </Box>
    </Box>
  );
};

export default LoadingSessions;
