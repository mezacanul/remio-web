import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

interface CurrentCuentaID {
    id: string | null;
}

const initialState: CurrentCuentaID = {
    id: null,
};
const currentCuentaIDSlice = createSlice({
    name: "currentCuentaID",
    initialState,
    reducers: {
        setCurrentCuentaID: (
            state: CurrentCuentaID,
            action: PayloadAction<string>
        ) => {
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
