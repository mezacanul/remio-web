import { baseApi } from "./baseApi";

export const cuentasApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCuentas: builder.query<any[], string>({
            query: (userId) => `/cuentas?userId=${userId}`,
            providesTags: ["Cuentas"],
        }),
        createCuenta: builder.mutation<any, Partial<any>>({
            query: (newCuenta) => ({
                url: "/cuentas",
                method: "POST",
                body: newCuenta,
            }),
            invalidatesTags: ["Cuentas"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCuentasQuery,
    useCreateCuentaMutation,
} = cuentasApi;
