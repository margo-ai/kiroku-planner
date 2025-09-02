import { Stack } from "../ui/Stack";

import { Content } from "./Content/Content";
import { Header } from "./Header/Header";

export const Layout = () => {
  return (
    <Stack fullHeight align="stretch" direction="column">
      <Header />
      <Content />
    </Stack>
  );
};
