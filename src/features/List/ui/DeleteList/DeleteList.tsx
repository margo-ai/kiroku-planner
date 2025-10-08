import { message } from "antd";
import { useState } from "react";

import { useAuthContext } from "@/features/Auth";
import DeleteIcon from "@/shared/assets/icons/delete.svg";
import { Button } from "@/shared/ui/Button";
import { Modal } from "@/shared/ui/Modal";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

import { useRemoveListMutation } from "../../api/listApi";

import cls from "./DeleteList.module.scss";

interface DeleteListProps {
  listId: string;
}

export const DeleteList = (props: DeleteListProps) => {
  const { listId } = props;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useAuthContext();

  const [removeList] = useRemoveListMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    try {
      await removeList({ listId, userId: user?.uid || "" }).unwrap();
      message.success({ content: "Список удалён!" });
      handleCloseModal();
    } catch (error) {
      console.error(error);
      messageApi.error({ content: "Произошла неизвестная ошибка" });
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <>
      {contextHolder}
      <Button
        data-testid="delete-list-button"
        variant="clear"
        className={cls.deleteListBtn}
        onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
      >
        <DeleteIcon />
      </Button>
      <Modal dataTestId="delete-list-modal" isOpen={isDeleteModalOpen} onClose={handleCloseModal}>
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
