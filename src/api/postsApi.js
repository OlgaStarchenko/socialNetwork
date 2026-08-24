import { sortValues } from "../utils/constants";
import { baseApi } from "./baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPostsList: build.query({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const { page, activeTag, selectedSort, search } = arg;

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
        const result = await baseQuery(URL);

        return {
          data: {
            posts: result.data.posts,
            pageCount: Math.ceil(result.data.total / limit),
          },
        };
      },
    }),

    getTagsList: build.query({
      query: () => ({
        url: "/posts/tags",
      }),
    }),

    getCommentsList: build.query({
      query: (id) => ({
        url: `/posts/${id}/comments`,
      }),
    }),
  }),
});

export const {
  useGetPostsListQuery,
  useGetTagsListQuery,
  useGetCommentsListQuery,
} = postsApi;
