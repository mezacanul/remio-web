import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const cuentasApi = createApi({
    reducerPath: "cuentasApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Cuentas"],
    endpoints: (builder) => ({
        // GET: Provides the tag
        getCuentas: builder.query<any[], string>({
            query: (userId) => `/cuentas?userId=${userId}`,
            providesTags: ["Cuentas"],
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
    useGetCuentasQuery,
    // useCreateCuentaMutation,
} = cuentasApi;
