import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/orders",
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/${orderId}`,
      providesTags: (result, error, id) => [{ type: "Orders", id }],
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: "/",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, order }) => ({
        url: `/${orderId}`,
        method: "PUT",
        body: order,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        "Orders",
        { type: "Orders", id: orderId },
      ],
    }),

    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
