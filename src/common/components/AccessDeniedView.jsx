import GppBadOutlinedIcon from "@mui/icons-material/GppBadOutlined";
import { Avatar, Box, Paper, Stack, Typography, alpha } from "@mui/material";
/**
 * Full-area friendly “permission denied” state for route guards and empty states.
 */
const AccessDeniedView = ({
  title = "Access restricted",
  message = "You do not have permission to view this page.",
  ...boxProps
}) => {
  return (
    <Box
      component="main"
      role="status"
      aria-live="polite"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "min(70vh, 560px)",
        py: 4,
        px: 2,
      }}
      {...boxProps}
    >
      <Paper
        elevation={0}
        sx={(theme) => ({
          maxWidth: 440,
          width: "100%",
          p: { xs: 3, sm: 4 },
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.6)
              : theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 12px rgba(0,0,0,0.35)"
              : "0 4px 24px rgba(0,0,0,0.06)",
        })}
      >
        <Stack spacing={2.5} alignItems="center" textAlign="center">
          <Avatar
            sx={(theme) => ({
              width: 56,
              height: 56,
              bgcolor: alpha(theme.palette.error.main, 0.12),
              color: "error.main",
            })}
            aria-hidden
          >
            <GppBadOutlinedIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Stack spacing={1}>
            <Typography
              component="h1"
              variant="h5"
              sx={(theme) => ({
                fontWeight: theme.typography.fontWeightBold,
                color: "text.primary",
                lineHeight: theme.typography.h5.lineHeight ?? 1.3,
              })}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.6 }}
            >
              {message}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AccessDeniedView;
