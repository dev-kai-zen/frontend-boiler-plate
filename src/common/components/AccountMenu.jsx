import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useShallow } from "zustand/react/shallow";
import googleAuthApi from "../../modules/google-auth/api/googleAuthApi";
import useAuthStore from "../store/authStore";
import { formatRoleDisplay } from "../utils/formatRoleDisplay";

const AccountMenu = ({ isMobile }) => {
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const { user, clearAuth } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      clearAuth: state.clearAuth,
    })),
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await googleAuthApi.logout();
      enqueueSnackbar("Logged out successfully", { variant: "success" });
    } catch {
      enqueueSnackbar("Logged out locally", { variant: "info" });
    } finally {
      clearAuth();
      navigate("/login");
    }
  };

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  return (
    <>
      <IconButton
        aria-label="account menu"
        onClick={handleAccountMenuOpen}
        edge="end"
        sx={{
          borderRadius: 9999,
          px: 1,
          py: 0.5,
          "&:hover": { borderRadius: 9999 },
        }}
      >
        {user?.picture ? (
          <Avatar src={user.picture} sx={{ width: 32, height: 32, mr: 1 }} />
        ) : (
          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Avatar>
        )}
        {!isMobile && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="body1">{user?.name}</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 0.5 }} variant="caption">
                  {formatRoleDisplay(user?.role.role_name)} • {user?.email}
                </Typography>
              </Box>
            </Box>
            <KeyboardArrowDownIcon
              color="inherit"
              sx={{ ml: 0.5, opacity: 0.85 }}
              fontSize="small"
            />
          </>
        )}
      </IconButton>
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleAccountMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
