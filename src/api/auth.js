import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { startSession, endSession } from '../../session'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8080/auth` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/jwt/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: credentials.email,
          password: credentials.password,
        }),
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const token = data.access_token
          startSession({ email: arg.email, accessToken: token })
        } catch (err) {
          console.error('Login failed:', err)
        }
      },
    }),

    register: builder.mutation({
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    getMe: builder.query({
      query: () => '/me',
      providesTags: ['Me'],
      prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('accessToken')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
      },
    }),

    logout: builder.mutation({
      queryFn: async () => {
        endSession()
        return { data: true }
      },
      invalidatesTags: ['Me'],
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi
