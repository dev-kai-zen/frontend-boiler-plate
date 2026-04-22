/**
 * Global font presets — all sizes use `rem` so they scale with the root element.
 * Root size is tuned in MUI CssBaseline (`clamp`) for smaller viewports.
 */

export const FONT_PRESET_KEYS = ["extraSmall", "small", "medium", "large"];

/** @typedef {'extraSmall' | 'small' | 'medium' | 'large'} FontSizePreset */

/**
 * @type {Record<FontSizePreset, {
 *   body1: string,
 *   body2: string,
 *   caption: string,
 *   subtitle1: string,
 *   h6: string, h5: string, h4: string, h3: string, h2: string, h1: string,
 *   sidebarLabel: string, sidebarIcon: string,
 * }>}
 */
export const FONT_PRESET_TOKENS = {
  extraSmall: {
    body1: "0.8125rem",
    body2: "0.75rem",
    caption: "0.6875rem",
    subtitle1: "0.8125rem",
    h6: "0.9375rem",
    h5: "1rem",
    h4: "1.125rem",
    h3: "1.25rem",
    h2: "1.375rem",
    h1: "1.5rem",
    sidebarLabel: "0.75rem",
    sidebarIcon: "1.125rem",
  },
  small: {
    body1: "0.875rem",
    body2: "0.8125rem",
    caption: "0.75rem",
    subtitle1: "0.875rem",
    h6: "1rem",
    h5: "1.125rem",
    h4: "1.25rem",
    h3: "1.375rem",
    h2: "1.5rem",
    h1: "1.75rem",
    sidebarLabel: "0.8125rem",
    sidebarIcon: "1.25rem",
  },
  medium: {
    body1: "1rem",
    body2: "0.9375rem",
    caption: "0.8125rem",
    subtitle1: "1rem",
    h6: "1.125rem",
    h5: "1.25rem",
    h4: "1.375rem",
    h3: "1.5rem",
    h2: "1.75rem",
    h1: "2rem",
    sidebarLabel: "0.875rem",
    sidebarIcon: "1.5rem",
  },
  large: {
    body1: "1.125rem",
    body2: "1rem",
    caption: "0.875rem",
    subtitle1: "1.125rem",
    h6: "1.25rem",
    h5: "1.375rem",
    h4: "1.5rem",
    h3: "1.75rem",
    h2: "2rem",
    h1: "2.25rem",
    sidebarLabel: "1rem",
    sidebarIcon: "1.75rem",
  },
};

/**
 * @param {string} preset
 */
export const getFontPresetTokens = (preset) => {
  if (FONT_PRESET_KEYS.includes(preset)) {
    return FONT_PRESET_TOKENS[preset];
  }
  return FONT_PRESET_TOKENS.small;
};
