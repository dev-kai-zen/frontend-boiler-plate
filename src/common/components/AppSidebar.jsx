import { Drawer, Box, Typography } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../store/authStore";
import SidebarMenu from "./SidebarMenu";
import { formatRoleDisplay } from "../utils/formatRoleDisplay";
import { themeTokens } from "../theme/themeTokens";

const AppSidebar = ({ open, variant, onClose, onNavigate, drawerWidth }) => {
  const user = useAuthStore(useShallow((state) => state.user));

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        // Only persistent drawer reserves space in the flex row; temporary (mobile) overlays with no layout shift.
        width: variant === "persistent" ? drawerWidth : 0,
        flexShrink: 0,
        transition: (theme) =>
          theme.transitions.create(["width", "transform"], {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        [`& .MuiDrawer-paper`]: {
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          width: drawerWidth,
          backgroundColor: themeTokens.brand.secondary,
          color: "rgb(255, 255, 255)",
          boxShadow:
            "4px 0 20px 0 rgba(0,0,0,0.08), 12px 0 16px -12px rgba(0,0,0,0.04)",
        },
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          pt: 1,
        }}
      >
        <img
          src="/asa_philippines_logo_dark.png"
          alt="ASA Icon"
          style={{
            width: "100px",
            height: "50px",
            objectFit: "contain",
            display: "block",
          }}
        />
        <Typography
          variant="h6"
          sx={(theme) => ({
            textAlign: "center",
            color: "inherit",
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          APECC
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto", color: "inherit" }}>
        <SidebarMenu onNavigate={onNavigate} />
      </Box>
      {user?.role?.role_name && (
        <Box
          sx={{
            flexShrink: 0,
            px: 2,
            py: 1.5,
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: "inherit",
          }}
        >
          <Typography variant="caption" sx={{ color: "inherit" }}>
            Logged as: {formatRoleDisplay(user.role.role_name)}
          </Typography>
        </Box>
      )}
    </Drawer>
  );
};

export default AppSidebar;
