import { Consumo, Invitado } from "@/types/base";
import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

interface ConsumoWithID extends Consumo {
    _id?: string;
}

interface CurrentInvitado
    extends Omit<Invitado, "consumo"> {
    consumo: ConsumoWithID[];
    _id?: string | null;
}

const initialState: CurrentInvitado = {
    _id: null,
    nombre: "",
    consumo: [],
};

const currentInvitadoSlice = createSlice({
    name: "currentInvitado",
    initialState,
    reducers: {
        setCurrentInvitado: (
            state: CurrentInvitado,
            action: PayloadAction<CurrentInvitado>
        ) => {
            return action.payload;
        },
        addConsumo: (
            state: CurrentInvitado,
            action: PayloadAction<Consumo>
        ) => {
            return {
                ...state,
                consumo: [...state.consumo, action.payload],
            };
        },
        updateConsumo: (
            state: CurrentInvitado,
            action: PayloadAction<ConsumoWithID>
        ) => {
            return {
                ...state,
                consumo: state.consumo.map((consumo) =>
                    consumo._id === action.payload._id
                        ? action.payload
                        : consumo
                ),
            };
        },
        resetCurrentInvitado: (state: CurrentInvitado) => {
            return initialState;
        },
    },
});

export const {
    setCurrentInvitado,
    resetCurrentInvitado,
    addConsumo,
    updateConsumo,
} = currentInvitadoSlice.actions;
export default currentInvitadoSlice.reducer;
