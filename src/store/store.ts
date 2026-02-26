import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/src/features/userSlice";
import sidemenuReducer from "@/src/features/sidemenuSlice";
import cuentasReducer from "@/src/features/cuentasSlice";
import currentCuentaReducer from "@/src/features/currentCuentaSlice";
import { cuentasApi } from "./api/cuentasApi";
import { currentCuentaApi } from "./api/currentCuentaApi";
import currentCuentaIDReducer from "@/src/features/currentCuentaID";

const store = configureStore({
    reducer: {
        user: userReducer,
        sidemenu: sidemenuReducer,
        cuentas: cuentasReducer,
        currentCuenta: currentCuentaReducer,
        currentCuentaID: currentCuentaIDReducer,
        [cuentasApi.reducerPath]: cuentasApi.reducer,
        [currentCuentaApi.reducerPath]:
            currentCuentaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cuentasApi.middleware,
            currentCuentaApi.middleware
        ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
