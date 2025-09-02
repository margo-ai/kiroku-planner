import { useTheme } from "@/app/providers/ThemeProvider/useTheme";
import ThemeIcon from "@/shared/assets/icons/theme.svg";

import cls from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <button className={cls.themeIconButton} onClick={toggleTheme}>
      <ThemeIcon />
    </button>
  );
};
