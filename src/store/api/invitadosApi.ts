import { baseApi } from "./baseApi";

export const invitadosApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getCuentas: builder.query<any[], string>({
        //     query: (userId) => `/cuentas?userId=${userId}`,
        //     providesTags: ["Cuentas"],
        // }),
        pushInvitado: builder.mutation<any, Partial<any>>({
            query: (newInvitado) => ({
                url: "/invitados",
                method: "PATCH",
                body: newInvitado,
            }),
            invalidatesTags: ["CurrentCuenta"],
        }),
        updateInvitado: builder.mutation<any, Partial<any>>(
            {
                query: (updatedInvitado) => ({
                    url: "/invitados",
                    method: "PUT",
                    body: updatedInvitado,
                }),
                invalidatesTags: ["CurrentCuenta"],
            }
        ),
    }),
    overrideExisting: false,
});

export const {
    usePushInvitadoMutation,
    useUpdateInvitadoMutation,
} = invitadosApi;
