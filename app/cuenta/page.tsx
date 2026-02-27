"use client";
import { skipToken } from "@reduxjs/toolkit/query";
import Button from "@/src/components/Common/Button";
import InvitadosList from "@/src/components/Cuenta/InvitadosList";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Common/Header";
import {
    useDeleteCuentaMutation,
    useUpdateCuentaNameMutation,
} from "@/src/store/api/currentCuentaApi";
import { RootState } from "@/src/store/store";
import { getInvitadoTotal } from "@/src/utils";
import { useGetCurrentCuentaQuery } from "@/src/store/api/currentCuentaApi";
import LoadingSpinner from "@/src/components/Common/LoadingSpinner";
import { useCreateCuentaMutation } from "@/src/store/api/cuentasApi";
import Summary from "@/src/components/Cuenta/Summary";
import NameAndActions from "@/src/components/Cuenta/NameAndActions";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCuentaID } from "@/src/features/currentCuentaID";

export default function CuentaPage() {
    const userId = useSelector(
        (state: RootState) => state.user._id
    );
    const [nombre, setNombre] = useState("");
    const currentCuentaID = useSelector(
        (state: RootState) => state.currentCuentaID.id
    );
    const {
        data: currentCuentaData,
        isLoading,
        isFetching,
        isError,
    } = useGetCurrentCuentaQuery(
        currentCuentaID
            ? (currentCuentaID as string)
            : skipToken
    );
    const [updateCuentaName] =
        useUpdateCuentaNameMutation();
    const [createCuenta] = useCreateCuentaMutation();
    const [deleteCuenta] = useDeleteCuentaMutation();
    const navigation = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentCuentaData) {
            setNombre(currentCuentaData.nombre);
            console.log(
                "currentCuentaData",
                currentCuentaData
            );
        }
    }, [currentCuentaData]);

    const invitadosMapped = useMemo(() => {
        if (currentCuentaData?.invitados.length > 0) {
            console.log(
                "currentCuentaData?.invitados",
                currentCuentaData?.invitados
            );

            const { invitados } = currentCuentaData;
            let invitadosWithTotal = [];
            invitadosWithTotal = invitados.map(
                (invitado: any) => {
                    return {
                        ...invitado,
                        total: getInvitadoTotal(
                            invitado.consumo
                        ),
                    };
                }
            );
            console.log(
                "invitadosWithTotal",
                invitadosWithTotal
            );
            return invitadosWithTotal;
        }
        return [];
    }, [currentCuentaData]);

    const totalCalculado = useMemo(() => {
        if (invitadosMapped) {
            return invitadosMapped.reduce(
                (acc: number, invitado: any) => {
                    return acc + invitado.total;
                },
                0
            );
        }
        return 0;
    }, [invitadosMapped]);

    async function handleSaveAndNavigate(
        navigate: boolean = false,
        route: string | null = null
    ) {
        const newNombre = nombre.trim();
        if (currentCuentaData?._id) {
            if (newNombre != currentCuentaData.nombre) {
                console.log("updating");
                updateCuentaName({
                    id: currentCuentaData._id,
                    nombre: nombre,
                });
            }
        } else {
            if (newNombre != "") {
                console.log("creating");
                const result = await createCuenta({
                    nombre: nombre,
                    invitados: [],
                    sharedConsumos: [],
                    userId: userId,
                }).unwrap();
                if (route == "/invitado") {
                    console.log("result", result);
                    dispatch(
                        setCurrentCuentaID(result._id)
                    );
                }
            }
        }
        if (navigate && route) {
            navigation.push(route);
        }
    }

    function handleDeleteCuenta() {
        deleteCuenta(currentCuentaData?._id as string);
        navigation.push("/");
    }

    if (isLoading || isFetching)
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingSpinner size="lg" />
            </div>
        );

    return (
        <div className="flex flex-col gap-3">
            <Header
                title={`${
                    !currentCuentaData?._id ? "Nueva " : ""
                } Cuenta`}
                onBack={() => {
                    handleSaveAndNavigate(true, "/");
                }}
            />
            <NameAndActions
                createdAt={
                    currentCuentaData?.createdAt ||
                    undefined
                }
                nombre={nombre}
                setNombre={setNombre}
                onDeleteCuenta={handleDeleteCuenta}
            />

            <div className="h-[38vh] overflow-y-auto mt-0 mb-4">
                {invitadosMapped.length === 0 && (
                    <div className="flex justify-center items-center h-full">
                        <div className="w-[60%]">
                            <Button
                                title="Agregar Invitado +"
                                onClick={() =>
                                    handleSaveAndNavigate(
                                        true,
                                        "/invitado"
                                    )
                                }
                            />
                        </div>
                    </div>
                )}

                {invitadosMapped.length > 0 && (
                    <InvitadosList
                        invitados={invitadosMapped}
                        onAddInvitado={() =>
                            handleSaveAndNavigate(
                                true,
                                "/invitado"
                            )
                        }
                    />
                )}
            </div>
            <Summary totalCalculado={totalCalculado} />
        </div>
    );
}
