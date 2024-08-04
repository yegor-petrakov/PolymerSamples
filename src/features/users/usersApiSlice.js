import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
            }),
            providesTags: ['User']
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
            }),
            providesTags: ['User']
        }),
        addNewUser: builder.mutation({
            query: initialVault => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialVault,
                },
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice

