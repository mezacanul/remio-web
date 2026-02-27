import { baseApi } from "./baseApi";

export const invitadosApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInvitado: builder.query<any, Partial<any>>({
            query: ({ id, cuenta }) =>
                `/invitados/${id}?cuenta=${cuenta}`,
            providesTags: ["CurrentInvitado"],
        }),
        pushInvitado: builder.mutation<any, Partial<any>>({
            query: (newInvitado) => ({
                url: "/invitados",
                method: "POST",
                body: newInvitado,
            }),
            invalidatesTags: [
                "CurrentCuenta",
                "CurrentInvitado",
            ],
        }),
        updateInvitado: builder.mutation<any, Partial<any>>(
            {
                query: (payload) => ({
                    url: `/invitados/${payload.invitadoID}?cuenta=${payload.cuentaID}`,
                    method: "PATCH",
                    body: payload,
                }),
                invalidatesTags: [
                    "CurrentCuenta",
                    "CurrentInvitado",
                ],
            }
        ),
    }),
    overrideExisting: false,
});

export const {
    useGetInvitadoQuery,
    usePushInvitadoMutation,
    useUpdateInvitadoMutation,
} = invitadosApi;
