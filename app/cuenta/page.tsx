"use client";

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

export default function CuentaPage() {
    const currentCuenta = useSelector(
        (state: RootState) => state.currentCuenta
    );
    const cuentasCount = useSelector(
        (state: RootState) => state.cuentas.length
    );
    const navigation = useRouter();
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);
    const [nombre, setNombre] = useState(
        currentCuenta?.nombre || ""
    );
    const [invitados, setInvitados] =
        // useState<Invitado[]>(invitadosData);
        useState<Invitado[]>(
            currentCuenta?.invitados || []
        );

    const invitadosMapped = useMemo(() => {
        if (invitados.length > 0) {
            let newInvitados = [];
            newInvitados = invitados.map((invitado) => {
                return {
                    id: invitado.id,
                    nombre: invitado.nombre,
                    joined: invitado.joined,
                    total: getInvitadoTotal(
                        invitado.consumos
                    ),
                };
            });
            return newInvitados;
        }
        return [];
    }, [invitados]);

    const totalCalculado = useMemo(() => {
        return invitadosMapped.reduce((acc, invitado) => {
            return acc + invitado.total;
        }, 0);
    }, [invitadosMapped]);

    useEffect(() => {
        if (currentCuenta.id == "") {
            console.log("initializeCurrentCuenta");
            dispatch(initializeCurrentCuenta());
        } else {
            console.log("currentCuenta", currentCuenta);
        }
    }, [currentCuenta]);

    useEffect(() => {
        // if (currentCuenta.invitados.length > 0) {
        setInvitados(currentCuenta.invitados);
        // }
    }, [currentCuenta.invitados]);

    function handleSaveAndNavigate(
        navigate: boolean = false,
        route: string | null = null
    ) {
        console.log("handleGuardar", nombre, invitados);
        const trimmedNombre = nombre.trim();
        const hasName = trimmedNombre != "";

        if (hasName || invitados.length > 0) {
            let newCuenta: Cuenta;
            if (currentCuenta.id) {
                newCuenta = {
                    ...currentCuenta,
                    nombre: trimmedNombre,
                    invitados: invitados,
                };
                console.log("updateCuenta", newCuenta);
                dispatch(updateCuenta(newCuenta));
            } else {
                newCuenta = createNewCuenta(
                    nombre,
                    invitados
                );
                newCuenta.nombre = hasName
                    ? trimmedNombre
                    : `Nueva Cuenta${
                          cuentasCount != 0
                              ? ` (${cuentasCount})`
                              : ""
                      }`;
                console.log("addCuenta", newCuenta);
                dispatch(addCuenta(newCuenta));
            }
            dispatch(setCurrentCuenta(newCuenta));
        }
        if (navigate && route) {
            navigation.push(route);
        }
    }

    function onDeleteCuenta() {
        dispatch(deleteCuenta(currentCuenta.id as string));
        navigation.push("/");
    }

    return (
        <div className="flex flex-col gap-3">
            <Header
                title={`${
                    !currentCuenta.id ? "Nueva " : ""
                } Cuenta`}
                onBack={() => {
                    handleSaveAndNavigate(true, "/");
                }}
            />
            <NameAndActions
                createdAt={
                    currentCuenta?.createdAt || undefined
                }
                nombre={nombre}
                setNombre={setNombre}
                handleSaveAndNavigate={
                    handleSaveAndNavigate
                }
                nameRef={nameRef}
                onDeleteCuenta={onDeleteCuenta}
            />

            {/* <Button
                title="Agregar Invitado +"
                onClick={() => navigation.push("/invitado")}
            /> */}

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
    nameRef: React.RefObject<HTMLInputElement | null>;
    nombre: string;
    setNombre: (nombre: string) => void;
    handleSaveAndNavigate: (
        navigate?: boolean,
        route?: string
    ) => void;
    createdAt: string | undefined;
    onDeleteCuenta: () => void;
};
function NameAndActions({
    nameRef,
    nombre,
    setNombre,
    handleSaveAndNavigate,
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
                <div className="flex flex-col justify-between items-center gap-1">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-2xl text-remiu-primary">
                        {/* {"$100.00"} */}
                        {`$${totalCalculado.toFixed(2)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
