import { useParams } from "react-router";
import Header from "../components/Header";
import {
  Avatar,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Skeleton,
} from "@radix-ui/themes";
import PostList from "../components/PostList";
import { useGetUserByIdQuery, useGetUserByIdPostsQuery } from "../api/usersApi";

export default function PersonPage() {
  const { id } = useParams();

  const { data, isLoading: isLoadingUser } = useGetUserByIdQuery(id, {
    skip: !id,
  });
  const user = data ? data : {};

  const { data: dataPosts, isLoading: isLoadingPosts } =
    useGetUserByIdPostsQuery(id, {
      skip: !id,
    });

  const posts = dataPosts ? dataPosts.posts : [];

  const skeletonsPosts = [...new Array(3)].map((_, index) => (
    <Skeleton key={index} width="100%" height="250px" />
  ));

  return (
    <>
      <Header />
      <Container size={"3"} mt={"8"}>
        <Heading mb={"5"}>Person Info</Heading>
        <Card>
          <Flex style={{ justifyContent: "space-around" }}>
            <Card>
              <Flex gap="3" align="center">
                {isLoadingUser ? (
                  <Skeleton height={"40px"} width={"40px"} />
                ) : (
                  <Avatar
                    size="3"
                    src={user.image}
                    radius="full"
                    fallback="T"
                  />
                )}

                <Box>
                  <Flex direction={"column"} gap={"1"}>
                    {isLoadingUser ? (
                      <Skeleton>
                        <Text>Nicholas Bailey</Text>
                      </Skeleton>
                    ) : (
                      <Text
                        as="div"
                        size="2"
                        weight="bold"
                        style={{ color: "initial" }}
                      >
                        {user.firstName} {user.lastName}
                      </Text>
                    )}
                    {isLoadingUser ? (
                      <Skeleton>
                        <Text>nicholasb</Text>
                      </Skeleton>
                    ) : (
                      <Text as="div" size="2" color="gray">
                        {user.username}
                      </Text>
                    )}
                  </Flex>
                </Box>
              </Flex>
            </Card>
            <Card>
              <Flex direction={"column"} gap={"1"}>
                {isLoadingUser ? (
                  <Skeleton>
                    <Text>nicholas.bailey@x.dummyjson.com</Text>
                  </Skeleton>
                ) : (
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                    style={{ color: "initial" }}
                  >
                    {user.email}
                  </Text>
                )}
                {isLoadingUser ? (
                  <Skeleton>
                    <Text>+49 212-856-4272</Text>
                  </Skeleton>
                ) : (
                  <Text as="div" size="2" color="gray">
                    {user.phone}
                  </Text>
                )}
              </Flex>
            </Card>
            <Card>
              <Flex direction={"column"} gap={"1"}>
                {isLoadingUser ? (
                  <Skeleton>
                    <Text>1989-6-14</Text>
                  </Skeleton>
                ) : (
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                    style={{ color: "initial" }}
                  >
                    {user.birthDate}
                  </Text>
                )}
                {isLoadingUser ? (
                  <Skeleton>
                    <Text>36 years old</Text>
                  </Skeleton>
                ) : (
                  <Text as="div" size="2" color="gray">
                    {user.age} years old
                  </Text>
                )}
              </Flex>
            </Card>
          </Flex>
        </Card>
        <Heading my={"5"}>Person Posts</Heading>
        <Flex direction="column" gap={"4"}>
          {isLoadingPosts ? skeletonsPosts : <PostList posts={posts} />}
        </Flex>
      </Container>
    </>
  );
}
