import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeStore } from "../store/themeStore";

const ThemeToggle = () => {
  const mode = useThemeStore((s) => s.mode);
  const toggleColorMode = useThemeStore((s) => s.toggleColorMode);

  return (
    <IconButton onClick={toggleColorMode}>
      {mode === "dark" ? (
        <Brightness7  />
      ) : (
        <Brightness4  />
      )}
    </IconButton> 
  );
};

export default ThemeToggle;
