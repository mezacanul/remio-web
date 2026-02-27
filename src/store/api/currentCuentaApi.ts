import { baseApi } from "./baseApi";

interface CuentaNamePayload {
    id: string;
    nombre: string;
}

export const currentCuentaApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentCuenta: builder.query<any, string>({
            query: (id) => `/cuentas/${id}`,
            providesTags: ["CurrentCuenta"],
        }),
        updateCuentaName: builder.mutation<
            any,
            CuentaNamePayload
        >({
            query: ({ id, nombre }) => ({
                url: `/cuentas/${id}`,
                method: "PATCH",
                body: { nombre },
            }),
            invalidatesTags: ["Cuentas", "CurrentCuenta"],
        }),
        deleteCuenta: builder.mutation<any, string>({
            query: (id) => ({
                url: `/cuentas/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cuentas"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetCurrentCuentaQuery,
    useUpdateCuentaNameMutation,
    useDeleteCuentaMutation,
} = currentCuentaApi;
