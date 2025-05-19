import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/orders",
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
      query: (orderData) => {
        const formData = new FormData();
        formData.append("order_type", orderData.type);
        formData.append("size", orderData.size);
        if (orderData.style) formData.append("style", orderData.style);
        formData.append("quantity", orderData.quantity);
        formData.append("total_price", orderData.total_price);
        formData.append("full_name", orderData.full_name);
        formData.append("contact_info", orderData.contact_info);

        orderData.files.forEach((file) => {
          formData.append("files", file);
        });

        return {
          url: "/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null && key !== "files") {
            formData.append(key, value);
          }
        });
        if (data.files && data.files.length > 0) {
          data.files.forEach((file) => {
            formData.append("files", file);
          });
        }

        return {
          url: `/${orderId}`,
          method: "PUT",
          body: formData,
        };
      },
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
