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

  useEffect(() => {
    instance.get("/posts").then((res) => {
      console.log(res.data);
      setPosts(res.data.posts);
    });
  }, []);

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
                <Grid columns="4" gap="3" rows="repeat(4, auto)">
                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>

                  <Button size={"1"} variant="outline">
                    History
                  </Button>
                  <Button size={"1"} variant="outline">
                    History
                  </Button>
                </Grid>
                <Heading size={"3"}> Sort By:</Heading>

                <Select.Root size="1" defaultValue="apple">
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="apple">Apple</Select.Item>
                    <Select.Item value="orange">Orange</Select.Item>
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
