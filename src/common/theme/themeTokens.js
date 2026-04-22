/**
 * Tokens:
 * - **`themeTokens.brand`** — light UI kit (primary/secondary/tertiary/surface).
 * - **`themeTokens.light`** — layout + text on light (derived from `brand`).
 * - **`themeTokens.dark`** — full dark ramp; **`dark.primary`** matches accent (`brand.primary`); **`dark.secondary`** / **`dark.tertiary`** are dark-surface tones (not `brand.secondary`).
 */

const brand = {
  primary: "rgb(255, 155, 81)",
  secondary: "rgb(37, 52, 63)",
  tertiary: "rgb(191, 201, 209)",
  surface: "rgb(234, 239, 239)",
};

/** Muted body text on light: was 58% brand.secondary · 42% brand.tertiary (no color-mix — MUI palette must parse as rgb/hex). */
const lightTextSecondary = "rgb(102, 115, 124)";

/** Light mode: backgrounds, text, hover (accents = `brand.*`). */
const light = {
  backgroundDefault: brand.surface,
  backgroundPaper: "rgb(255, 255, 255)",
  textPrimary: brand.secondary,
  textSecondary: lightTextSecondary,
  /** Row tint: was 14% brand.primary · brand.surface */
  itemHover: "rgb(237, 227, 217)",
};

/**
 * Dark mode: accent + neutrals for dark UI.
 * Use `themeTokens.dark.primary`, `.secondary`, `.tertiary` in code or `theme.palette` in MUI.
 */
const dark = {
  /** Same accent as `brand.primary` */
  primary: brand.primary,
  /** MUI secondary / muted actions on dark */
  secondary: "rgb(176, 186, 194)",
  onSecondary: "rgb(18, 18, 18)",
  /** Softer third tone (chips, dividers) */
  tertiary: "rgb(120, 130, 140)",
  onTertiary: "rgb(245, 245, 245)",
  backgroundDefault: "rgb(18, 18, 18)",
  backgroundPaper: "rgb(30, 30, 30)",
  textPrimary: "rgb(245, 245, 245)",
  textSecondary: "rgb(165, 175, 184)",
  itemHover: "rgba(255, 255, 255, 0.08)",
};

/**
 * Single font stack for the whole app. `createAppMuiTheme` sets `typography.fontFamily` from
 * **`fontFamily.default`**. Change only here (or override in `createAppMuiTheme`) to swap fonts.
 *
 * Inter + Plus Jakarta Sans are loaded in `index.html` (Google Fonts, `display=swap`).
 * After those, system fonts match native UI sans-serifs if web fonts fail or are still loading.
 */
export const themeTokens = {
  brand,
  light,
  dark,
  fontFamily: {
    default:
      '"Inter", "Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};
