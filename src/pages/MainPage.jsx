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
import { useEffect, useMemo, useState } from "react";
import { instance } from "../axiosInstance";
import { sortValues } from "../utils/constants";
import _debounce from "lodash/debounce";

export default function MainPage({ theme, changeTheme }) {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [selectedSort, setSelectedSort] = useState("1");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleDebounceFn = (inputValue) => {
    setSearch(inputValue);
  };

  const debounceFn = useMemo(() => _debounce(handleDebounceFn, 1000), []);

  useEffect(() => {
    let URL = "/posts";
    if (activeTag) {
      URL += `/tag/${activeTag}`;
    }
    if (selectedSort) {
      URL += `?sortBy=${sortValues[selectedSort].sortBy}&order=${sortValues[selectedSort].order}`;
    }
    if (search.trim()) {
      URL = `/posts/search?q=${search}`;
    }

    console.log(URL);

    instance.get(URL).then((res) => {
      console.log(res.data);
      setPosts(res.data.posts);
    });

    instance.get("/posts/tags").then((res) => {
      console.log(res.data);
      setTags(res.data.slice(0, 18));
    });
  }, [activeTag, selectedSort, search]);

  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

  const selectTag = (tag) => {
    setActiveTag(tag);
  };

  const selectSort = (value) => {
    setSelectedSort(value);
  };

  const clearSortingAndFiltering = () => {
    setActiveTag("");
    setSelectedSort("1");
  };

  console.log("searchInput", searchInput);
  console.log("search", search);

  return (
    <>
      <Header theme={theme} changeTheme={changeTheme} />
      <Container size={"3"} mt={"8"}>
        <TextField.Root
          placeholder="Search the docs…"
          size={"3"}
          value={searchInput}
          onChange={({ target }) => {
            setSearchInput(target.value);
            debounceFn(target.value);
          }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Flex gap={"3"} mt={"3"}>
          <Flex direction="column">
            <PostList posts={posts} />
          </Flex>

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

                <Select.Root
                  size="1"
                  defaultValue="1"
                  value={selectedSort}
                  onValueChange={selectSort}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="1">Default</Select.Item>
                    <Select.Item value="2">Title ↑</Select.Item>
                    <Select.Item value="3">Title ↓</Select.Item>
                    <Select.Item value="4">Views</Select.Item>
                  </Select.Content>
                </Select.Root>

                <Button onClick={clearSortingAndFiltering}>Clear</Button>
              </Flex>
            </Card>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
