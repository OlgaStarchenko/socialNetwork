import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),

    getUserByIdPosts: build.query({
      query: (id) => ({
        url: `/users/${id}/posts`,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserByIdPostsQuery } = usersApi;
