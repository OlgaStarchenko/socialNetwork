import {
  CaretDownIcon,
  CaretUpIcon,
  ChatBubbleIcon,
  EyeOpenIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
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
import { useState } from "react";

import { Link } from "react-router";
import { useGetCommentsListQuery } from "../api/postsApi";
import { useGetUserByIdQuery } from "../api/usersApi";

export default function PostItem({ post }) {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const { data } = useGetCommentsListQuery(post.id, {
    skip: !isCommentsVisible || !post.id,
  });

  const { data: dataUser } = useGetUserByIdQuery(post.userId, {
    skip: !post.userId,
  });

  const comments = data ? data.comments : [];
  const user = dataUser
    ? dataUser
    : {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
        image: "",
      };

  const toggleCommentsVisibility = () => {
    setIsCommentsVisible(!isCommentsVisible);
  };

  return (
    <Box width={"100%"}>
      <Card>
        <Flex direction={"column"} gap={"2"}>
          <Flex justify={"between"}>
            <Link to={`/person/${user.id}`}>
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
            </Link>

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
          <Flex justify={"between"} mb={"2"}>
            <Flex gap={"4"}>
              <Flex align={"center"} gap={"1"}>
                <HeartIcon />

                <Text> {post.reactions.likes}</Text>
              </Flex>

              <Flex align={"center"} gap={"1"}>
                <ChatBubbleIcon onClick={toggleCommentsVisibility} />
                {isCommentsVisible ? <CaretUpIcon /> : <CaretDownIcon />}
              </Flex>
            </Flex>

            <Flex align={"center"} gap={"1"}>
              <EyeOpenIcon />
              <Text> {post.views}</Text>
            </Flex>
          </Flex>
        </Flex>
        {isCommentsVisible &&
          comments.map((comment, index) => (
            <Box key={`${comment}-${index}`}>
              <Separator size={"4"} />
              <Flex direction={"column"} gap={"3"} mt={"2"} mb={"2"}>
                <Card key={comment.id}>
                  <Flex gap="3" direction={"column"}>
                    <Flex justify={"between"}>
                      <Flex gap={"2"} align={"center"}>
                        <Avatar
                          size="1"
                          radius="full"
                          fallback={comment.user.fullName
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        />

                        <Text as="div" size="1" color="gray">
                          {comment.user.username}
                        </Text>
                      </Flex>
                      <Flex align={"center"} gap={"1"}>
                        <HeartIcon />

                        <Text size={"1"}> {comment.likes}</Text>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Text size={"2"}>{comment.body}</Text>
                    </Flex>
                  </Flex>
                </Card>
              </Flex>
            </Box>
          ))}
      </Card>
    </Box>
  );
}
