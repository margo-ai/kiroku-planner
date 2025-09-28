import { Link } from "react-router-dom";

import { useAuthContext } from "@/features/Auth";
import { AvatarDropdown } from "@/features/AvatarDropdown";
import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Loader } from "@/shared/ui/Loader";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./Header.module.scss";

export const Header = () => {
  // const { user, loading } = useAuthContext();
  // useEffect(() => {
  //   console.log(user, loading);
  // }, [user, loading]);

  // const updateData = async () => {
  //   if (currentUser) {
  //     await updateProfile(currentUser, {
  //       displayName: "Tony Stark",
  //       photoURL:
  //         "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/tony_stark.png"
  //     });
  //   }
  // };

  return (
    <header>
      <Stack className={cls.header} justify="space-between">
        <Link to="/" className={cls.title}>
          <Typography withoutMargin title="Kiroku" size="xl" />
        </Link>
        <Stack gap="24">
          <ThemeSwitcher />
          <AvatarDropdown />
        </Stack>
      </Stack>
    </header>
  );
};
