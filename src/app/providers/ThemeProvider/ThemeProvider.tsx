import { PropsWithChildren, useMemo, useState } from "react";

import { LOCAL_STORAGE_THEME_KEY } from "@/shared/const/localStorage";

import { Theme, ThemeContext, ThemeContextProps } from "./ThemeContext";

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.Light;

export const ThemeProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const themeValue: ThemeContextProps = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme]
  );
  document.body.className = theme;

  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
};
