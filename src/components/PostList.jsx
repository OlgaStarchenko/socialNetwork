import { Flex } from "@radix-ui/themes";
import PostItem from "./PostItem";

export default function PostList({ posts }) {
  return (
    <Flex direction={"column"} gap={"3"}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Flex>
  );
}
