import { ChatBubbleIcon, EyeOpenIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Badge,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { instance } from "../axiosInstance";

export default function PostItem({ post }) {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    image: "",
  });

  useEffect(() => {
    instance.get(`/users/${post.userId}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  });

  return (
    <Box width={"100%"}>
      <Card>
        <Flex direction={"column"} gap={"2"}>
          <Flex justify={"between"}>
            <Flex gap="3" align="center">
              <Avatar size="3" src={user.image} radius="full" fallback="T" />
              <Box>
                <Text as="div" size="2" weight="bold">
                  {user.firstName} {user.lastName}
                </Text>
                <Text as="div" size="2" color="gray">
                  {user.username}
                </Text>
              </Box>
            </Flex>

            <Flex gap={"2"} maxWidth={"200px"} wrap={"wrap"} justify={"end"}>
              {post.tags.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}
            </Flex>
          </Flex>

          <Separator size={"4"} />

          <Flex direction={"column"} gap={"2"}>
            <Heading size={"5"}>{post.title}</Heading>
            <Text>{post.body}</Text>
          </Flex>
          <Separator size={"4"} />
          <Flex justify={"between"}>
            <Flex gap={"4"}>
              <Flex align={"center"} gap={"1"}>
                <HeartIcon />
                <Text> {post.reactions.likes}</Text>
              </Flex>

              <Flex align={"center"} gap={"1"}>
                <ChatBubbleIcon />
                <Text> 10</Text>
              </Flex>
            </Flex>

            <Flex align={"center"} gap={"1"}>
              <EyeOpenIcon />
              <Text> {post.views}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
