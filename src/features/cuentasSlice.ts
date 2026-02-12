import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
import { Cuenta } from "../types";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { saveCuentasToLocalStorage } from "../utils";

const initialState: Cuenta[] = [];

const cuentasSlice = createSlice({
    name: "cuentas",
    initialState,
    reducers: {
        setCuentas: (
            state: Cuenta[],
            action: PayloadAction<Cuenta[]>
        ) => {
            return action.payload;
        },
        addCuenta: (
            state: Cuenta[],
            action: PayloadAction<Cuenta>
        ) => {
            const newArray = [...state, action.payload];
            saveCuentasToLocalStorage(newArray);
            return newArray;
        },
        updateCuenta: (
            state: Cuenta[],
            action: PayloadAction<Cuenta>
        ) => {
            const newArray = state.map((cuenta) => {
                if (cuenta.id == action.payload.id) {
                    return {
                        ...action.payload,
                        updatedAt: format(
                            new Date(),
                            "dd/MM/yyyy"
                        ),
                    };
                }
                return cuenta;
            });
            saveCuentasToLocalStorage(newArray);
            return newArray;
        },
    },
});

export const { setCuentas, addCuenta, updateCuenta } =
    cuentasSlice.actions;

export default cuentasSlice.reducer;
