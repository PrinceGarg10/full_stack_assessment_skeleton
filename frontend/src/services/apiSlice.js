import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL, BASE_URL } from './apiUrl';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: () => API_URL.GET_ALL_USER,
        }),

        getHomeByUser: builder.query({
            query: (params) => ({
                url: API_URL.GET_HOME_BY_USER,
                method: 'GET',
                params
            }),
        }),

        getUserByHome: builder.query({
            query: (params) => ({
                url: API_URL.GET_USER_BY_HOME,
                method: 'GET',
                params
            }),
        }),

        updateUserInHome: builder.mutation({
            query: (newData) => ({
                url: API_URL.UPDATE_USER_IN_HOME,
                method: 'PATCH',
                body: newData,
            }),
        }),
    }),
});

export const { useGetAllUserQuery, useGetHomeByUserQuery, useGetUserByHomeQuery, useUpdateUserInHomeMutation } = apiSlice;
