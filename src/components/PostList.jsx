import { Flex, Skeleton } from "@radix-ui/themes";
import PostItem from "./PostItem";

export default function PostList({ posts, isLoading }) {
  const skeletons = [...new Array(3)].map((_, index) => (
    <Skeleton key={index} display={"block"} width="100%" height="250px" />
  ));
  return (
    <Flex direction={"column"} gap={"3"} flexGrow={"1"} minWidth={"0"}>
      {isLoading
        ? skeletons
        : posts.map((post) => <PostItem key={post.id} post={post} />)}
    </Flex>
  );
}
