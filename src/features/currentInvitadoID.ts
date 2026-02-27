import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

interface CurrentInvitadoID {
    id: string | null;
}
const initialState: CurrentInvitadoID = {
    id: null,
};

const currentInvitadoIDSlice = createSlice({
    name: "currentInvitadoID",
    initialState,
    reducers: {
        setCurrentInvitadoID: (
            state: CurrentInvitadoID,
            action: PayloadAction<string>
        ) => {
            state.id = action.payload;
        },
        resetCurrentInvitadoID: (
            state: CurrentInvitadoID
        ) => {
            state.id = null;
        },
    },
});

export const {
    setCurrentInvitadoID,
    resetCurrentInvitadoID,
} = currentInvitadoIDSlice.actions;
export default currentInvitadoIDSlice.reducer;
