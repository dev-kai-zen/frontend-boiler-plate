import { create } from "zustand";

const STORAGE_KEY = "themeMode";

const readStoredMode = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

const persistMode = (mode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // ignore
  }
};

/**
 * Global theme mode (light / dark). Static palette/type tokens: `themeTokens` (re-exported below).
 *
 *   import useThemeStore, { themeTokens } from "./themeStore";
 *   const mode = useThemeStore((s) => s.mode);
 *   themeTokens.brand.primary
 *   themeTokens.dark.primary / themeTokens.dark.secondary
 */
export const useThemeStore = create((set) => ({
  mode: readStoredMode(),

  setMode: (mode) => {
    const next = mode === "dark" ? "dark" : "light";
    persistMode(next);
    set({ mode: next });
  },

  toggleColorMode: () =>
    set((state) => {
      const next = state.mode === "light" ? "dark" : "light";
      persistMode(next);
      return { mode: next };
    }),
}));

export { themeTokens } from "../theme/themeTokens";
