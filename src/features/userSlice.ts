import { createSlice } from "@reduxjs/toolkit";
import { saveUserToLocalStorage } from "../utils";
import { User } from "@/types/base";
// import { User } from "../types";

const initialState: User = {
    _id: "user123",
    nombres: null,
    apellidos: null,
    email: null,
    profilePicture: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        initUser: (state, action) => {
            const user = action.payload as User;
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
