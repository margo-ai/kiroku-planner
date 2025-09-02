import { memo } from "react";

import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

const ErrorPage = memo(() => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Stack
      fullWidth
      align="center"
      direction="column"
      justify="center"
      gap="24"
      style={{ height: "80vh" }}
    >
      <Typography size="l" title="Произошла ошибка" />
      <Button variant="outline" onClick={reloadPage}>
        Обновить страницу
      </Button>
    </Stack>
  );
});

export default ErrorPage;
