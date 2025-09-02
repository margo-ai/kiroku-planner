import { useContext } from "react";

import { Theme, ThemeContext } from "./ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";

interface UseThemeReturn {
  theme: Theme;
  isLightTheme: boolean;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTeme = theme === Theme.Dark ? Theme.Light : Theme.Dark;
    setTheme?.(newTeme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTeme);
  };

  return { theme: theme || Theme.Light, isLightTheme: theme === Theme.Light, toggleTheme };
};
