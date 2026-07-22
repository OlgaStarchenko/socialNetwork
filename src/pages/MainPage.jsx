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
import Pagination from "../components/Pagination";

export default function MainPage() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState("");
  const [selectedSort, setSelectedSort] = useState("1");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const handleDebounceFn = (inputValue) => {
    setPage(1);
    setSearch(inputValue);
  };

  const debounceFn = useMemo(() => _debounce(handleDebounceFn, 1000), []);

  useEffect(() => {
    const limit = 10;
    const skip = (page - 1) * limit;

    let URL = `/posts?limit=${limit}&skip=${skip}`;
    if (activeTag) {
      URL = `/posts/tag/${activeTag}?limit=${limit}&skip=${skip}`;
    }
    if (selectedSort) {
      URL += `&sortBy=${sortValues[selectedSort].sortBy}`;
      URL += `&order=${sortValues[selectedSort].order}`;
    }
    if (search.trim()) {
      URL = `/posts/search?q=${search}&limit=${limit}&skip=${skip}`;
    }
    console.log(URL);

    instance.get(URL).then((res) => {
      setPosts(res.data.posts);

      setPageCount(Math.ceil(res.data.total / limit));
    });

    instance.get("/posts/tags").then((res) => {
      console.log(res.data);
      setTags(res.data.slice(0, 18));
    });
  }, [activeTag, selectedSort, search, page]);

  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

  const selectTag = (tag) => {
    setPage(1);
    setActiveTag(tag);
  };

  const selectSort = (value) => {
    setPage(1);
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
      <Header />
      <Container size={"3"} mt={"8"}>
        <TextField.Root
          placeholder="Search the posts…"
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

        <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
      </Container>
    </>
  );
}
