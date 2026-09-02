import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Skeleton,
  TextField,
} from "@radix-ui/themes";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import _debounce from "lodash/debounce";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveTag,
  changeSearch,
  changeSelectedSort,
  clearAllFilters,
} from "../store/slice/filterSlice";
import { useGetPostsListQuery, useGetTagsListQuery } from "../api/postsApi";
import ErrorMessage from "../components/ErrorMessage";

export default function MainPage() {
  const { page, activeTag, selectedSort, search } = useSelector(
    (state) => state.filter,
  );

  const {
    data,
    isLoading: isPostsLoading,
    error: errorPosts,
  } = useGetPostsListQuery({
    page,
    activeTag,
    selectedSort,
    search,
  });
  const {
    data: dataTags,
    isLoading: isTagsLoading,
    error: errorTags,
  } = useGetTagsListQuery();
  const posts = data ? data.posts : [];
  const pageCount = data ? data.pageCount : 1;
  const tags = dataTags ? dataTags.slice(0, 18) : [];
  const skeletonTags = [...new Array(18)].map((_, index) => (
    <Skeleton key={index} width={"100%"} height={"24px"} />
  ));

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const handleDebounceFn = (inputValue) => {
    dispatch(changeSearch(inputValue));
  };

  const debounceFn = useMemo(() => _debounce(handleDebounceFn, 1000), []);

  useEffect(() => {
    return () => {
      debounceFn.cancel();
    };
  }, [debounceFn]);

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
          <Flex direction="column" flexGrow={"1"}>
            <PostList
              posts={posts}
              isLoading={isPostsLoading}
              error={errorPosts}
            />
          </Flex>

          <Box minWidth={"250px"}>
            <Card>
              <Flex direction={"column"} gap={"4"}>
                <Heading size={"3"}> Filter By:</Heading>
                {errorTags ? (
                  <ErrorMessage error={errorTags} />
                ) : (
                  <Grid columns="3" gap="3" rows="repeat(auto, auto)">
                    {isTagsLoading
                      ? skeletonTags
                      : tags.map((tag) => (
                          <Button
                            key={tag.slug}
                            size={"1"}
                            variant={
                              activeTag === tag.slug ? "classic" : "outline"
                            }
                            onClick={() => {
                              dispatch(changeActiveTag(tag.slug));
                            }}
                          >
                            {tag.name}
                          </Button>
                        ))}
                  </Grid>
                )}
                <Heading size={"3"}> Sort By:</Heading>

                <Select.Root
                  size="1"
                  defaultValue="1"
                  value={selectedSort}
                  onValueChange={(value) => dispatch(changeSelectedSort(value))}
                >
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value="1">Default</Select.Item>
                    <Select.Item value="2">Title ↑</Select.Item>
                    <Select.Item value="3">Title ↓</Select.Item>
                    <Select.Item value="4">Views</Select.Item>
                  </Select.Content>
                </Select.Root>

                <Button
                  onClick={() => {
                    dispatch(clearAllFilters());
                    setSearchInput("");
                  }}
                >
                  Clear
                </Button>
              </Flex>
            </Card>
          </Box>
        </Flex>

        <Pagination pageCount={pageCount} />
      </Container>
    </>
  );
}
