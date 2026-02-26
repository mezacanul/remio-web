import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const currentCuentaApi = createApi({
    reducerPath: "currentCuentaApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["CurrentCuenta"],
    endpoints: (builder) => ({
        // GET: Provides the tag
        getCurrentCuenta: builder.query<any, string>({
            query: (id) => `/cuentas/${id}`,
            providesTags: ["CurrentCuenta"],
        }),

        // // POST: Invalidates the tag
        // createCuenta: builder.mutation<any, Partial<any>>({
        //     query: (newCuenta) => ({
        //         url: "/cuentas",
        //         method: "POST",
        //         body: newCuenta,
        //     }),
        //     invalidatesTags: ["Cuentas"],
        // }),
    }),
});

export const {
    useGetCurrentCuentaQuery,
    // useCreateCuentaMutation,
} = currentCuentaApi;
