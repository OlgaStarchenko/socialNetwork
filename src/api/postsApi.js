import { sortValues } from "../utils/constants";
import { baseApi } from "./baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPostsList: build.query({
      async queryFn(arg, api, extraOptions, baseQuery) {
        const state = api.getState();
        const { page, activeTag, selectedSort, search } = state.filter;

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
          posts: result.posts,
          pageCount: Math.ceil(result.total / limit),
        };
      },
    }),

    getTagsList: build.query({
      query: () => ({
        url: "/posts/tags",
      }),
    }),
  }),
});

export const { useGetPostsListQuery, useGetTagsListQuery } = postsApi;
