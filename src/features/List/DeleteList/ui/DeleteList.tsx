import { message } from "antd";
import { FirebaseError } from "firebase/app";
import { getDatabase, ref, remove } from "firebase/database";
import { useState } from "react";

import { useAuthContext } from "@/features/Auth";
import DeleteIcon from "@/shared/assets/icons/delete.svg";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import cls from "./DeleteList.module.scss";

interface DeleteListProps {
  listId: string;
}

export const DeleteList = (props: DeleteListProps) => {
  const { user } = useAuthContext();

  const { listId } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    const db = getDatabase();
    const list = ref(db, `users/${user?.uid}/${listId}`);
    try {
      await remove(list);
      message.success({ content: "Список удалён!" });
      console.log("Список удалён!");
      handleClose();
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        messageApi.error({ content: error.message });
      } else {
        messageApi.error({ content: "Произошла неизвестная ошибка" });
      }
    }
  };

  const handleClose = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <>
      {contextHolder}
      <Button
        variant="clear"
        className={cls.deleteTaskBtn}
        onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
      >
        <DeleteIcon />
      </Button>
      <Modal isOpen={isDeleteModalOpen} onClose={handleClose}>
        <Typography size="l" title="Удалить список?" titleMb={24} />
        <Stack gap="24">
          <Button
            variant="outline"
            color="error"
            onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          >
            Отмена
          </Button>
          <Button color="success" onClick={handleDelete}>
            Удалить
          </Button>
        </Stack>
      </Modal>
    </>
  );
};
