import { Link } from "react-router-dom";

import { AvatarDropdown } from "@/features/AvatarDropdown";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./Header.module.scss";

export const Header = () => {
  return (
    <header>
      <Stack className={cls.header} justify="space-between">
        <Link to="/" className={cls.title}>
          <Typography title="Kiroku" size="xl" />
        </Link>
        <Stack gap="24">
          <ThemeSwitcher />
          <AvatarDropdown />
        </Stack>
      </Stack>
    </header>
  );
};
