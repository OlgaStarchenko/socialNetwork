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
} from "@radix-ui/themes";
import PostList from "../components/PostList";
import { useGetUserByIdQuery, useGetUserByIdPostsQuery } from "../api/usersApi";

export default function PersonPage() {
  const { id } = useParams();

  const { data } = useGetUserByIdQuery(id, {
    skip: !id,
  });
  const user = data ? data : {};

  const { data: dataPosts } = useGetUserByIdPostsQuery(id, {
    skip: !id,
  });

  const posts = dataPosts ? dataPosts.posts : [];

  console.log(dataPosts);

  return (
    <>
      <Header />
      <Container size={"3"} mt={"8"}>
        <Heading mb={"5"}>Person Info</Heading>
        <Card>
          <Flex style={{ justifyContent: "space-around" }}>
            <Card>
              <Flex gap="3" align="center">
                <Avatar size="3" src={user.image} radius="full" fallback="T" />
                <Box>
                  <Text
                    as="div"
                    size="2"
                    weight="bold"
                    style={{ color: "initial" }}
                  >
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text as="div" size="2" color="gray">
                    {user.username}
                  </Text>
                </Box>
              </Flex>
            </Card>
            <Card>
              <Text
                as="div"
                size="2"
                weight="bold"
                style={{ color: "initial" }}
              >
                {user.email}
              </Text>
              <Text as="div" size="2" color="gray">
                {user.phone}
              </Text>
            </Card>
            <Card>
              <Text
                as="div"
                size="2"
                weight="bold"
                style={{ color: "initial" }}
              >
                {user.birthDate}
              </Text>
              <Text as="div" size="2" color="gray">
                {user.age} years old
              </Text>
            </Card>
          </Flex>
        </Card>
        <Heading my={"5"}>Person Posts</Heading>
        <Flex direction="column">
          <PostList posts={posts} />
        </Flex>
      </Container>
    </>
  );
}
