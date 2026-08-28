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

    login: build.mutation({
      query: (params) => ({
        url: "/user/login",
        method: "POST",
        body: params,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserByIdPostsQuery,
  useLoginMutation,
} = usersApi;
