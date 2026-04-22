import { createTheme } from "@mui/material/styles";
import { getFontPresetTokens } from "../font/fontPresets";
import { themeTokens } from "./themeTokens";

/**
 * @param {'light' | 'dark'} mode
 * @param {'extraSmall' | 'small' | 'medium' | 'large'} [fontSizePreset]
 */
export const createAppMuiTheme = (mode, fontSizePreset = "small") => {
  const { brand, light, dark, fontFamily: fontTokens } = themeTokens;
  const isDark = mode === "dark";
  const colors = isDark ? dark : light;
  const f = getFontPresetTokens(fontSizePreset);
  const defaultFontFamily = fontTokens.default;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? dark.primary : brand.primary,
        contrastText: "rgb(255, 255, 255)",
      },
      secondary: {
        main: isDark ? dark.secondary : brand.secondary,
        contrastText: isDark ? dark.onSecondary : "rgb(255, 255, 255)",
      },
      tertiary: {
        main: isDark ? dark.tertiary : brand.tertiary,
        contrastText: isDark ? dark.onTertiary : brand.secondary,
      },
      background: {
        default: colors.backgroundDefault,
        paper: colors.backgroundPaper,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
        brand: isDark ? dark.primary : brand.primary,
      },
      /** Sidebar (always on brand slate): use dark-mode hover tint in both themes. */
      sidebarItemHover: dark.itemHover,
      itemHover: colors.itemHover,
      action: {
        hover: colors.itemHover,
      },
    },
    typography: {
      fontFamily: defaultFontFamily,
      /** Use in `sx` instead of raw numeric weights. */
      fontWeightHeavy: 800,
      /** Hero / score emphasis — use instead of raw `900` in `sx`. */
      fontWeightExtraBold: 900,
      h1: { fontSize: f.h1 },
      h2: { fontSize: f.h2 },
      h3: { fontSize: f.h3 },
      h4: { fontSize: f.h4 },
      h5: { fontSize: f.h5 },
      h6: { fontSize: f.h6 },
      subtitle1: { fontSize: f.subtitle1 },
      body1: { fontSize: f.body1 },
      body2: { fontSize: f.body2 },
      caption: { fontSize: f.caption },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: "clamp(0.875rem, 0.2rem + 1.4vw, 1rem)",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          body: {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
          "*": {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
          "*::-webkit-scrollbar": {
            display: "none",
          },
          'input[type="number"]': {
            MozAppearance: "textfield",
            "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          },
        },
      },
      ...(isDark && {
        MuiSvgIcon: {
          defaultProps: {
            color: "primary",
          },
        },
      }),
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === "light"
                ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                : "0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
          },
        },
      },
    },
  });
};
