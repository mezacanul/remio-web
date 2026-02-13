import { createSlice } from "@reduxjs/toolkit";
import { saveUserToLocalStorage } from "../utils";
import { User } from "../types";

const initialState: User = {
    token: null,
    number: null,
    name: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state, action) => {
            const user = {
                number: action.payload.number,
                token: action.payload.token,
                name: "",
            };
            saveUserToLocalStorage(user);
            return user;
        },
        setUser: (state, action) => {
            return action.payload;
        },
        logoutUser: (state) => {
            return initialState;
        },
        updateUser: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { initUser, setUser, logoutUser, updateUser } =
    userSlice.actions;
export default userSlice.reducer;
