import { create } from "zustand";
import { FONT_PRESET_KEYS } from "../font/fontPresets";

export { FONT_PRESET_KEYS, FONT_PRESET_TOKENS } from "../font/fontPresets";

const STORAGE_KEY = "fontSizePreset";

const readStoredPreset = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (FONT_PRESET_KEYS.includes(v)) return v;
  } catch {
    // ignore
  }
  return "small";
};

const persistPreset = (preset) => {
  try {
    localStorage.setItem(STORAGE_KEY, preset);
  } catch {
    // ignore
  }
};

/**
 * App-wide UI font scale. Default: `small`. Sizes are `rem` via `FONT_PRESET_TOKENS`.
 *
 *   import useFontStore, { FONT_PRESET_TOKENS } from "./fontStore";
 *   const preset = useFontStore((s) => s.fontSizePreset);
 *   const label = FONT_PRESET_TOKENS[preset].sidebarLabel;
 *
 * Non-React: getFontPresetTokens(useFontStore.getState().fontSizePreset)
 */
export const useFontStore = create((set, get) => ({
  fontSizePreset: readStoredPreset(),

  /**
   * @param {'extraSmall' | 'small' | 'medium' | 'large'} preset
   */
  setFontSizePreset: (preset) => {
    const next = FONT_PRESET_KEYS.includes(preset) ? preset : "small";
    persistPreset(next);
    set({ fontSizePreset: next });
  },

  /** Alias for `setFontSizePreset`. */
  setFontSize: (preset) => get().setFontSizePreset(preset),
}));

export { getFontPresetTokens } from "../font/fontPresets";
