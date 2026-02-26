import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";
// import { Cuenta, Invitado } from "@/src/types";
// import { v4 as uuidv4 } from "uuid";
// import { format } from "date-fns";

const initialState: { id: string | null } = {
    id: null,
};
const currentCuentaIDSlice = createSlice({
    name: "currentCuentaID",
    initialState,
    reducers: {
        setCurrentCuentaID: (state, action) => {
            state.id = action.payload;
        },
        resetCurrentCuentaID: (state) => {
            state.id = null;
        },
    },
});

export const { setCurrentCuentaID, resetCurrentCuentaID } =
    currentCuentaIDSlice.actions;
export default currentCuentaIDSlice.reducer;
