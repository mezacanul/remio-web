import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Cuenta } from "@/src/types";

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
        setCurrentCuenta: (
            state: Cuenta,
            action: PayloadAction<Cuenta>
        ) => {
            state.id = action.payload.id;
            state.nombre = action.payload.nombre;
            state.invitados = action.payload.invitados;
            state.codigo = action.payload.codigo;
            state.createdAt = action.payload.createdAt;
            state.updatedAt = action.payload.updatedAt;
        },
    },
});

export const { setCurrentCuenta } =
    currentCuentaSlice.actions;
export default currentCuentaSlice.reducer;
