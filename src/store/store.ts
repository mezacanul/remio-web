import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/src/features/userSlice";
import sidemenuReducer from "@/src/features/sidemenuSlice";
import cuentasReducer from "@/src/features/cuentasSlice";
import currentCuentaReducer from "@/src/features/currentCuentaSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        sidemenu: sidemenuReducer,
        cuentas: cuentasReducer,
        currentCuenta: currentCuentaReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
