import { memo } from "react";

import { Button } from "@/shared/ui/Button";
import { Stack } from "@/shared/ui/Stack";
import { Typography } from "@/shared/ui/Typography";

const ErrorPage = memo(() => {
  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <Stack
      fullWidth
      align="center"
      direction="column"
      gap="24"
      justify="center"
      style={{ height: "80vh" }}
    >
      <Typography size="l" title="Произошла ошибка" titleMb={16} />
      <Button variant="outline" onClick={handleReloadPage}>
        Обновить страницу
      </Button>
    </Stack>
  );
});

export default ErrorPage;
