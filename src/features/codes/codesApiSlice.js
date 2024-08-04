import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const vaultsAdapter = createEntityAdapter({})

const initialState = vaultsAdapter.getInitialState()

export const codesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCodes: builder.query({
            query: () => ({
                url: '/codes',
            }),
            providesTags: ['Code']
        }),
        getCodeById: builder.query({
            query: (id) => ({
                url: `/codes/${id}`,
            }),
            providesTags: ['Code']
        }),
        addNewCode: builder.mutation({
            query: code => ({
                url: '/codes',
                method: 'POST',
                body: {
                    ...code,
                }
            }),
            invalidatesTags: ['Code', 'Vault']
        }),
        updateCode: builder.mutation({
            query: (code) => ({
                url: `/codes/${code.id}`,
                method: 'PUT',
                body: code,
            }),
            invalidatesTags: ['Code', 'Vault']
        }),
        deleteCode: builder.mutation({
            query: ({ id }) => ({
                url: `/codes/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Code', 'Vault']
        }),

    }),
})

export const {
    useGetCodesQuery,
    useGetCodeByIdQuery,
    useUpdateCodeMutation,
    useDeleteCodeMutation,
    useAddNewCodeMutation
} = codesApiSlice