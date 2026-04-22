import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../store/authStore";
import { useSidebarMenu } from "../hooks/useSidebarMenu";
import { useFontStore } from "../store/fontStore";
import { getFontPresetTokens } from "../font/fontPresets";
import {
  hasPermission,
  hasVisibleDescendant,
  itemOrDescendantMatchesPath,
} from "../utils/sidebarMenuUtil";

const SIDEBAR_ITEM_SX = {
  borderRadius: 2,
  mx: 1,
  my: 0.25,
  color: "inherit",
  paddingY: 0.5,
  boxShadow: "inset 2px 0 0 transparent",
  transition: (theme) =>
    theme.transitions.create(["box-shadow", "background-color"], {
      duration: theme.transitions.duration.shortest,
    }),
  "& .MuiListItemIcon-root": {
    color: "inherit",
    minWidth: 40,
  },
  /* Hover (not current route): same tint as dark-mode itemHover + white left line. */
  "&:hover:not(.Mui-selected)": {
    backgroundColor: (theme) => theme.palette.sidebarItemHover,
    boxShadow: "inset 2px 0 0 rgba(255, 255, 255, 0.55)",
  },
  /* Active route: primary accent on the left edge only; text stays white. */
  "&.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: "inherit",
    boxShadow: (theme) => `inset 3px 0 0 ${theme.palette.primary.main}`,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      boxShadow: (theme) => `inset 3px 0 0 ${theme.palette.primary.main}`,
    },
    "& .MuiListItemIcon-root": {
      color: "inherit",
    },
  },
};

const SidebarMenu = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore(useShallow((state) => state.user));
  const { resolvedMenuItems, effectiveOpenMenus, handleToggle } =
    useSidebarMenu();

  const fontSizePreset = useFontStore((s) => s.fontSizePreset);
  const fontTok = getFontPresetTokens(fontSizePreset);
  const labelSx = { fontSize: fontTok.sidebarLabel };
  const iconSx = {
    color: "inherit",
    "& .MuiSvgIcon-root": { fontSize: fontTok.sidebarIcon },
  };

  const renderItem = (item, depth = 0) => {
    if (item.path) {
      if (!hasPermission(item, user)) return null;
      const leafActive = itemOrDescendantMatchesPath(item, location.pathname);
      return (
        <ListItem key={item.key} disablePadding>
          <ListItemButton
            selected={leafActive}
            onClick={() => {
              navigate(item.path);
              onNavigate?.();
            }}
            sx={SIDEBAR_ITEM_SX}
            aria-current={leafActive ? "page" : undefined}
          >
            {item.icon != null && (
              <ListItemIcon sx={iconSx}>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              slotProps={{ primary: { sx: labelSx } }}
            />
          </ListItemButton>
        </ListItem>
      );
    }

    if (item.children) {
      const visibleChildren = item.children.filter((child) =>
        hasVisibleDescendant(child, user),
      );
      if (visibleChildren.length === 0) return null;
      if (!hasPermission(item, user)) return null;

      const isOpen = !!effectiveOpenMenus[item.key];
      const subtreeActive = visibleChildren.some((child) =>
        itemOrDescendantMatchesPath(child, location.pathname),
      );
      return (
        <React.Fragment key={item.key}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleToggle(item.key)}
              aria-expanded={isOpen}
              selected={subtreeActive}
              sx={SIDEBAR_ITEM_SX}
            >
              {item.icon != null && (
                <ListItemIcon sx={iconSx}>
                  <item.icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { sx: labelSx } }}
              />
              {isOpen ? (
                <ExpandLess color="inherit" />
              ) : (
                <ExpandMore color="inherit" />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List
              component="nav"
              aria-label={item.label}
              disablePadding
              sx={{ pl: depth ? 3 + depth * 2 : 3 }}
            >
              {visibleChildren.map((child) => renderItem(child, depth + 1))}
            </List>
          </Collapse>
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <List
      component="nav"
      aria-label="Main navigation"
      sx={{ color: "inherit", bgcolor: "transparent" }}
    >
      {resolvedMenuItems.map((item) => {
        if (item.path && !hasPermission(item, user)) return null;
        if (item.children && !hasVisibleDescendant(item, user)) return null;
        return renderItem(item);
      })}
    </List>
  );
};

export default SidebarMenu;
