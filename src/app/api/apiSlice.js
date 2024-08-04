import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    // baseUrl: 'https://api.polymer.ex-game.ru/api',
    baseUrl: 'http://localhost:80/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
            headers.set('Accept', 'application/json, text/plain')
            headers.set('Content-Type', 'application/json;charset=UTF-8')
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log("api: ", api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)

    const { error } = result

    if (error?.status === 401) {
        // console.log('sending refresh token')

        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'POST',
        }, api, extraOptions)

        if (refreshResult?.data) {

            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult.data }))

            // retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {

            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired."
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Code', 'Vault', 'User', 'CodeVault'],
    endpoints: builder => ({})
})