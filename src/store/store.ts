import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/src/features/userSlice";
import sidemenuReducer from "@/src/features/sidemenuSlice";
import cuentasReducer from "@/src/features/cuentasSlice";
import currentCuentaReducer from "@/src/features/currentCuentaSlice";
import { cuentasApi } from "./api/cuentasApi";

const store = configureStore({
    reducer: {
        user: userReducer,
        sidemenu: sidemenuReducer,
        cuentas: cuentasReducer,
        currentCuenta: currentCuentaReducer,
        [cuentasApi.reducerPath]: cuentasApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cuentasApi.middleware
        ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
