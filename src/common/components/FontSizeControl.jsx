import { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import { useFontStore } from "../store/fontStore";
import { FONT_PRESET_KEYS } from "../font/fontPresets";

const optionCopy = {
  extraSmall: { label: "Extra small", hint: "Most compact" },
  small: { label: "Small", hint: "Compact text" },
  medium: { label: "Medium", hint: "Default" },
  large: { label: "Large", hint: "Easier to read" },
};

/**
 * Trigger shows **A** with superscript **+**; opens a menu to pick Small / Medium / Large.
 */
const FontSizeControl = () => {
  const theme = useTheme();
  const fontSizePreset = useFontStore((s) => s.fontSizePreset);
  const setFontSizePreset = useFontStore((s) => s.setFontSizePreset);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (key) => {
    setFontSizePreset(key);
    handleClose();
  };

  return (
    <>
      <IconButton
        id="font-size-button"
        size="small"
        onClick={handleOpen}
        aria-label="Text size. Choose extra small, small, medium, or large."
        aria-controls={open ? "font-size-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        title="Text size"
        sx={{
          mr: 0.25,
          borderRadius: 1.5,
          px: 1,
          color: "inherit",
        }}
      >
        <Typography
          component="span"
          sx={(theme) => ({
            fontWeight: theme.typography.fontWeightBold,
            fontSize: "1.05rem",
            lineHeight: 1,
            color: "inherit",
            letterSpacing: "-0.02em",
          })}
        >
          A
          <Box
            component="sup"
            sx={(theme) => ({
              fontSize: "0.5em",
              fontWeight: theme.typography.fontWeightBold,
              top: "-0.35em",
              marginLeft: "0.06em",
              lineHeight: 0,
              position: "relative",
            })}
          >
            +
          </Box>
        </Typography>
      </IconButton>

      <Menu
        id="font-size-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          list: {
            dense: true,
            "aria-labelledby": "font-size-button",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={(theme) => ({
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            Text size
          </Typography>
        </Box>
        <Divider />
        {FONT_PRESET_KEYS.map((key) => {
          const { label, hint } = optionCopy[key];
          const selected = fontSizePreset === key;
          return (
            <MenuItem
              key={key}
              selected={selected}
              onClick={() => handleSelect(key)}
              sx={{ minWidth: 200, py: 1.25 }}
            >
              <ListItemText
                primary={label}
                secondary={hint}
                slotProps={{
                  primary: {
                    fontWeight: selected
                      ? theme.typography.fontWeightBold
                      : theme.typography.fontWeightMedium,
                  },
                  secondary: { variant: "caption" },
                }}
              />
              {selected ? (
                <CheckIcon
                  fontSize="small"
                  color="primary"
                  sx={{ ml: 1, flexShrink: 0 }}
                />
              ) : (
                <Box sx={{ width: 24, ml: 1, flexShrink: 0 }} aria-hidden />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default FontSizeControl;
