import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "../../session";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8080/api/admin`,
    prepareHeaders: (headers) => {
      const token = getSession()?.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users", "Orders"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, data }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetUserByIdQuery
} = adminApi;
