import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import { useThemeStore } from "../store/themeStore";

const drawerWidth = 240;

/**
 * Global shell: header, sidebar, main + Outlet. Only layout/UI state.
 */
const AppLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const open = isMobile ? mobileOpen : desktopOpen;
  const drawerVariant = isMobile
    ? "temporary"
    : open
      ? "persistent"
      : "temporary";

  const toggleDrawer = useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
      return;
    }
    setDesktopOpen((prev) => !prev);
  }, [isMobile]);

  const closeMobileDrawer = useCallback(() => {
    if (isMobile) setMobileOpen(false);
  }, [isMobile]);

  const mode = useThemeStore((s) => s.mode);
  const isLight = mode === "light";

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        ...(isLight && {
          backgroundColor: "background.default",
        }),
      }}
    >
      <AppHeader
        open={open}
        onToggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
      />

      <AppSidebar
        open={open}
        drawerWidth={drawerWidth}
        variant={drawerVariant}
        onClose={closeMobileDrawer}
        onNavigate={closeMobileDrawer}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          transition: (innerTheme) =>
            innerTheme.transitions.create("width", {
              easing: innerTheme.transitions.easing.sharp,
              duration:
                !isMobile && open
                  ? innerTheme.transitions.duration.enteringScreen
                  : innerTheme.transitions.duration.leavingScreen,
            }),
          width: !isMobile && open ? `calc(100% - ${drawerWidth}px)` : "100%",
          minWidth: 0,
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, minHeight: 0, p: 2, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
