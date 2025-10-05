import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "@/features/Auth";
import { Avatar } from "@/shared/ui/Avatar";
import { Button } from "@/shared/ui/Button";
import { Dropdown, DropdownItem } from "@/shared/ui/Dropdown";
import { Skeleton } from "@/shared/ui/Skeleton";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./AvatarDropdown.module.scss";

const fallbackImgLink = "src/shared/assets/images/image-avatar-fallback.svg";

export const AvatarDropdown = () => {
  const navigate = useNavigate();
  const { logOut, user, loading } = useAuthContext();

  const [messageApi, contextHolder] = message.useMessage();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        messageApi.error({ content: error.message });
      } else {
        messageApi.error({ content: "Произошла неизвестная ошибка" });
      }
    }
  };

  const items: DropdownItem[] = [
    {
      key: "1",
      content: "На доску",
      href: "/board"
    },
    {
      key: "2",
      content: "Профиль",
      href: "/profile"
    },
    { key: "3", content: "Выйти", onClick: handleLogout }
  ];

  const trigger = loading ? (
    <Stack gap="12">
      <Skeleton width={50} height={50} borderRadius="50%" />
      <Skeleton width={100} height={20} />
    </Stack>
  ) : (
    <Button data-testid="avatar-button" className={cls.avatarButton} variant="clear">
      <Avatar size={50} src={user?.photo ?? fallbackImgLink} />
      <Typography dataTestId="user-name" title={user?.name ?? ""} />
    </Button>
  );
  return (
    <div>
      {contextHolder}
      <Dropdown
        data-testid="avatar-dropdown"
        className={cls.avatarDropdown}
        items={items}
        triggerEvent="click"
      >
        {trigger}
      </Dropdown>
    </div>
  );
};
