import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    number: null,
    name: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state, action) => {
            state.number = action.payload.number;
            state.token = action.payload.token;
        },
    },
});

export const { initUser } = userSlice.actions;
export default userSlice.reducer;
