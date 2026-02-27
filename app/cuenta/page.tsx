"use client";
import { skipToken } from "@reduxjs/toolkit/query";
import Button from "@/src/components/Common/Button";
import DropdownMenu from "@/src/components/Common/DropdownMenu";
import DropdownMenuItem from "@/src/components/Common/DropdownMenuItem";
import InvitadosList from "@/src/components/Cuenta/InvitadosList";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FaArrowLeft, FaShare } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
import { useRouter } from "next/navigation";
import Header from "@/src/components/Common/Header";
import {
    addCuenta,
    deleteCuenta,
    updateCuenta,
} from "@/src/features/cuentasSlice";
import { Cuenta, Invitado } from "@/src/types";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "@/src/store/store";
import {
    initializeCurrentCuenta,
    resetCurrentCuenta,
    setCurrentCuenta,
} from "@/src/features/currentCuentaSlice";
import {
    createNewCuenta,
    getInvitadoTotal,
} from "@/src/utils";
import { useGetCurrentCuentaQuery } from "@/src/store/api/currentCuentaApi";
import LoadingSpinner from "@/src/components/Common/LoadingSpinner";
import { InvitadoJSON } from "@/types/frontend/json";
import { useCreateCuentaMutation } from "@/src/store/api/cuentasApi";
import {
    useDeleteCuentaMutation,
    useUpdateCuentaNameMutation,
} from "@/src/store/api/currentCuentaApi";

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
            let newInvitados = [];
            newInvitados = invitados.map(
                (invitado: any) => {
                    return {
                        ...invitado,
                        total: getInvitadoTotal(
                            invitado.consumo
                        ),
                    };
                }
            );
            console.log("newInvitados", newInvitados);
            return newInvitados;
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

    function handleSaveAndNavigate(
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
                createCuenta({
                    nombre: nombre,
                    invitados: [],
                    sharedConsumos: [],
                    userId: userId,
                });
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

    if (isLoading)
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

type NameAndActionsProps = {
    nameRef?: React.RefObject<HTMLInputElement | null>;
    nombre: string;
    setNombre: (nombre: string) => void;
    createdAt: string | undefined;
    onDeleteCuenta: () => void;
};

function NameAndActions({
    nameRef,
    nombre,
    setNombre,
    createdAt,
    onDeleteCuenta,
}: NameAndActionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-between items-start gap-1">
            <div className="w-full">
                <input
                    type="text"
                    placeholder="(sin nombre)"
                    className="w-full text-xl p-2 pb-1 pl-0 border-b border-gray-400 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                    // autoFocus
                    // onBlur={onSave}
                    ref={nameRef}
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                />
                <p className="text-sm text-gray-500 mt-2">
                    {createdAt || "--"}
                </p>
            </div>

            <DropdownMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                // title="Acciones"
                trigger={
                    <FaEllipsisV
                        size={24}
                        style={{
                            marginRight: "-8px",
                            marginTop: "14px",
                        }}
                    />
                }
            >
                <DropdownMenuItem
                    title="Codigo de invitación"
                    onClick={() => {}}
                />
                <DropdownMenuItem
                    title="Eliminar"
                    onClick={onDeleteCuenta}
                />
            </DropdownMenu>
        </div>
    );
}

function Summary({
    totalCalculado,
}: {
    totalCalculado: number;
}) {
    return (
        <div className="flex justify-between items-end gap-3 w-full border-t border-gray-400 pt-2">
            <div className="w-[4rem]">
                <Button
                    onClick={() => {}}
                    icon={<MdOutlineIosShare size={20} />}
                    py="3"
                />
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col items-end justify-between items-center gap-1">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-2xl text-remiu-primary">
                        {`$${totalCalculado.toFixed(2)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
