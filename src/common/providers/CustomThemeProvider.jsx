import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeStore } from "../store/themeStore";
import { useFontStore } from "../store/fontStore";
import { createAppMuiTheme } from "../theme/createAppMuiTheme";

/**
 * Subscribes to theme mode + font preset; supplies MUI ThemeProvider.
 */
export const CustomThemeProvider = ({ children }) => {
  const mode = useThemeStore((s) => s.mode);
  const fontSizePreset = useFontStore((s) => s.fontSizePreset);
  const theme = useMemo(
    () => createAppMuiTheme(mode, fontSizePreset),
    [mode, fontSizePreset],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
