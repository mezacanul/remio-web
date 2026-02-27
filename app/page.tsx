"use client";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import LoadingSpinner from "@/src/components/Common/LoadingSpinner";
import { useGetCuentasQuery } from "@/src/store/api/cuentasApi";
import { formatDate } from "@/src/utils";
import { resetCurrentCuentaID } from "@/src/features/currentCuentaID";
import AddNewDropdown from "@/src/components/Home/AddNewDropdown";
import CuentasList from "@/src/components/Home/CuentasList";
import { CuentaListItem } from "@/types/main";
import EmptyNotice from "@/src/components/Home/EmptyNotice";

export default function Home() {
    const dispatch = useDispatch();
    const userId = useSelector(
        (state: RootState) => state.user._id
    );
    const {
        data: cuentasData,
        isLoading,
        isFetching,
        isError,
    } = useGetCuentasQuery(userId);

    useEffect(() => {
        dispatch(resetCurrentCuentaID());
    }, []);

    const cuentas = useMemo(() => {
        if (cuentasData) {
            return cuentasData?.map((cuenta) => {
                return {
                    ...cuenta,
                    createdAt: formatDate(cuenta.createdAt),
                };
            });
        }
        return null;
    }, [cuentasData]);

    if (isLoading || isFetching) {
        return (
            <div className="h-[40%] flex justify-center items-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="flex flex-col rounded-md h-[60%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {"Mis cuentas"}
                </h1>
                <AddNewDropdown />
            </div>

            {cuentas && cuentas.length === 0 && (
                <EmptyNotice />
            )}
            {cuentas && cuentas.length > 0 && (
                <CuentasList
                    cuentas={cuentas as CuentaListItem[]}
                />
            )}
        </div>
    );
}
