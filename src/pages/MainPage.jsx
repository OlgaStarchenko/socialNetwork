import { Container, Flex, TextField } from "@radix-ui/themes";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function MainPage() {
  return (
    <>
      <Header />
      <Container size={"3"} mt={"8"}>
        <TextField.Root placeholder="Search the docs…" size={"3"}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex gap={"9"} mt={"3"}>
          <PostList />
        </Flex>
      </Container>
    </>
  );
}
