import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccountMenu from "./AccountMenu";
import AppBreadcrumbs from "./AppBreadcrumbs";
import FontSizeControl from "./FontSizeControl";
import ThemeToggle from "./ThemeToggle";

const AppHeader = ({ open, onToggleDrawer, drawerWidth, isMobile }) => {
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        zIndex: isMobile ? theme.zIndex.appBar : theme.zIndex.drawer + 1,
        bgcolor: "background.paper",
        color: "text.brand",
        width: !isMobile && open ? `calc(100% - ${drawerWidth}px)` : "100%",
        transition: (innerTheme) =>
          innerTheme.transitions.create(["width", "transform"], {
            easing: innerTheme.transitions.easing.sharp,
            duration:
              !isMobile && open
                ? innerTheme.transitions.duration.enteringScreen
                : innerTheme.transitions.duration.leavingScreen,
          }),
      })}
    >
      <Toolbar>
        <IconButton
          aria-label={open ? "close drawer" : "open drawer"}
          onClick={onToggleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          {open ? (
            <ChevronLeftIcon color="inherit" />
          ) : (
            <MenuIcon color="inherit" />
          )}
        </IconButton>

        {!isMobile && <AppBreadcrumbs />}

        <Box sx={{ flexGrow: 1 }} />
        <FontSizeControl />
        <ThemeToggle />
        <Box sx={{ mr: 1 }} />
        <AccountMenu isMobile={isMobile} />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
