import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Cuenta, Invitado } from "@/src/types";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

const initialState: Cuenta = {
    id: "",
    nombre: "",
    invitados: [],
    codigo: "",
    createdAt: "",
    updatedAt: "",
};

const currentCuentaSlice = createSlice({
    name: "currentCuenta",
    initialState,
    reducers: {
        resetCurrentCuenta: (state) => {
            return initialState;
        },
        setCurrentCuenta: (
            state: Cuenta | null,
            action: PayloadAction<Cuenta>
        ) => {
            return action.payload;
        },
        initializeCurrentCuenta: (state) => {
            const now = format(new Date(), "dd/MM/yyyy");
            // const uuid = uuidv4();
            // const codigo = uuid.slice(0, 6).toUpperCase();
            return {
                id: null,
                nombre: "",
                invitados: [],
                codigo: null,
                createdAt: now,
                updatedAt: now,
            };
        },
        addInvitadoToCurrentCuenta: (
            state: Cuenta | null,
            action: PayloadAction<Invitado>
        ) => {
            if (state) {
                state.invitados.push(action.payload);
            }
        },
        updateInvitadoInCurrentCuenta: (
            state: Cuenta,
            action: PayloadAction<Invitado>
        ) => {
            const updatedInvitado = action.payload;
            state.invitados = state.invitados.map(
                (invitado) =>
                    invitado.id === updatedInvitado.id
                        ? updatedInvitado
                        : invitado
            );
        },
        deleteInvitadoFromCurrentCuenta: (
            state: Cuenta,
            action: PayloadAction<string>
        ) => {
            state.invitados = state.invitados.filter(
                (invitado) => invitado.id != action.payload
            );
        },
    },
});

export const {
    initializeCurrentCuenta,
    setCurrentCuenta,
    addInvitadoToCurrentCuenta,
    resetCurrentCuenta,
    updateInvitadoInCurrentCuenta,
    deleteInvitadoFromCurrentCuenta,
} = currentCuentaSlice.actions;
export default currentCuentaSlice.reducer;
