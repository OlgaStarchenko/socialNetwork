import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  TextField,
} from "@radix-ui/themes";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { instance } from "../axiosInstance";

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    instance.get("/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data.posts);
    });

    instance.get("/posts/tags").then((res) => {
      console.log(res.data);
      setTags(res.data.slice(0, 18));
    });
  }, []);

  const selectTag = (tag) => {
    setActiveTag(tag);
  };

  return (
    <>
      <Header />
      <Container size={"3"} mt={"8"}>
        <TextField.Root placeholder="Search the docs…" size={"3"}>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex gap={"3"} mt={"3"}>
          <PostList posts={posts} />
          <Box minWidth={"250px"}>
            <Card>
              <Flex direction={"column"} gap={"4"}>
                <Heading size={"3"}> Filter By:</Heading>
                <Grid columns="3" gap="3" rows="repeat(auto, auto)">
                  {tags.map((tag) => (
                    <Button
                      key={tag.slug}
                      size={"1"}
                      variant={activeTag === tag.slug ? "classic" : "outline"}
                      onClick={() => {
                        selectTag(tag.slug);
                      }}
                    >
                      {tag.name}
                    </Button>
                  ))}
                </Grid>
                <Heading size={"3"}> Sort By:</Heading>

                <Select.Root size="1" defaultValue="1">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="1">Default</Select.Item>
                    <Select.Item value="2">Title ↑</Select.Item>
                    <Select.Item value="3">Title ↓</Select.Item>
                    <Select.Item value="4">Views</Select.Item>
                  </Select.Content>
                </Select.Root>

                <Button>Clear</Button>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
