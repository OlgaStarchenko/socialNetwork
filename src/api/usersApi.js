import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery } = usersApi;
