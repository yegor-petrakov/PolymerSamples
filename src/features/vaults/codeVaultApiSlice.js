import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const codeVaultAdapter = createEntityAdapter({})

const initialState = codeVaultAdapter.getInitialState()

export const codeVaultApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewCodeVault: builder.mutation({
            query: initialCodeVault => ({
                url: '/codesinvaults',
                method: 'POST',
                body: {
                    ...initialCodeVault,
                }
            }),
            invalidatesTags: ['Vault', 'Code']
        }),
        deleteCodeVault: builder.mutation({
            query: ({ id }) => ({
                url: `/codesinvaults/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ['Vault', 'Code']
        }),
    }),
})

export const {
    useAddNewCodeVaultMutation,
    useDeleteCodeVaultMutation
} = codeVaultApiSlice