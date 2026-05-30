import { Flex } from "@radix-ui/themes";
import PostItem from "./PostItem";

export default function PostList() {
  return (
    <Flex direction={"column"} gap={"3"}>
      <PostItem />
      <PostItem />
    </Flex>
  );
}
