import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/src/features/userSlice";
import sidemenuReducer from "@/src/features/sidemenuSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        sidemenu: sidemenuReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
