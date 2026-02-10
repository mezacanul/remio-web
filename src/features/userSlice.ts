import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "1234567890",
    number: 9993000000,
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
