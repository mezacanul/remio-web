import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const sidemenuSlice = createSlice({
    name: "sidemenu",
    initialState,
    reducers: {
        toggleIsOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { toggleIsOpen, setIsOpen } =
    sidemenuSlice.actions;

export default sidemenuSlice.reducer;
