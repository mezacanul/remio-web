"use client";

import Button from "@/src/components/Common/Button";
import Header from "@/src/components/Common/Header";
import ConsumoList from "@/src/components/Consumo/ConsumoList";
import DropdownMenu from "@/src/components/Common/DropdownMenu";
import DropdownMenuItem from "@/src/components/Common/DropdownMenuItem";
import { updateCuenta } from "@/src/features/cuentasSlice";
import {
    addInvitadoToCurrentCuenta,
    setCurrentCuenta,
    updateInvitadoInCurrentCuenta,
} from "@/src/features/currentCuentaSlice";
import { RootState } from "@/src/store/store";
import { Consumo, Invitado } from "@/src/types";
import {
    createNewConsumo,
    createNewInvitado,
    getById,
    getInvitadoTotal,
} from "@/src/utils";
import {
    useRouter,
    useSearchParams,
} from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import {
    IoClose,
    IoPerson,
    IoPersonCircle,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function InvitadoPage() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [currentInvitado, setCurrentInvitado] =
        useState<Invitado | null>(null);
    const navigation = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    const [nombre, setNombre] = useState("");
    const [consumos, setConsumos] = useState<Consumo[]>([]);
    const currentCuenta = useSelector(
        (state: RootState) => state.currentCuenta
    );
    const dispatch = useDispatch();
    const total = useMemo(() => {
        return getInvitadoTotal(consumos);
    }, [consumos]);
    const mtClass = total > 0 ? "" : "mt-5";

    useEffect(() => {
        if (id) {
            const invitado = getById(
                currentCuenta.invitados,
                id
            );
            if (invitado) {
                setCurrentInvitado(invitado);
                setNombre(invitado.nombre);
                setConsumos(invitado.consumos);
            }
        }
    }, [id]);

    function handleSaveAndNavigate(
        navigate: boolean = false,
        route: string | null = null
    ) {
        console.log("handleSaveAndNavigate");
        const trimmedNombre = nombre.trim();
        const hasName = trimmedNombre != "";
        if (hasName || consumos.length > 0) {
            console.log("hasName or consumos.length > 0");
            let newInvitado: Invitado;
            if (!currentInvitado) {
                newInvitado = createNewInvitado(
                    trimmedNombre,
                    consumos,
                    currentCuenta.invitados.length
                );
                dispatch(
                    addInvitadoToCurrentCuenta(newInvitado)
                );
            } else {
                newInvitado = {
                    ...currentInvitado,
                    nombre: trimmedNombre,
                    consumos: consumos,
                };
                dispatch(
                    updateInvitadoInCurrentCuenta(
                        newInvitado
                    )
                );
            }
        }
        if (navigate && route) {
            navigation.push(route);
        }
    }

    useEffect(() => {
        dispatch(updateCuenta(currentCuenta));
    }, [currentCuenta]);

    function onAddConsumo(consumo: Consumo) {
        setConsumos([...consumos, consumo]);
    }

    return (
        <div className="w-full">
            <Header
                title={`Invitado`}
                onBack={() =>
                    handleSaveAndNavigate(true, "/cuenta")
                }
            />
            <div className="flex items-center gap-2 mt-2 w-full">
                <span className="">
                    <BsPersonCircle size={24} />
                </span>
                <div className="w-full">
                    <NameAndActions
                        nombre={nombre}
                        setNombre={setNombre}
                    />
                </div>
            </div>

            {total > 0 && (
                <div className="flex flex-col gap-1 items-center justify-center mt-4">
                    <p className="font-bold">{"Total"}</p>
                    <p className="font-bold text-2xl text-remiu-primary">
                        {`$${total.toFixed(2)}`}
                    </p>
                </div>
            )}

            <div className={`${mtClass} w-[100%]`}>
                {!isAdding && consumos.length == 0 && (
                    <div className="flex justify-center">
                        <BotonAgregarConsumo
                            title="Agregar Consumo +"
                            onClick={() =>
                                setIsAdding(true)
                            }
                        />
                    </div>
                )}
                {isAdding && (
                    <ConsumoForm
                        onClose={() => setIsAdding(false)}
                        onAddConsumo={onAddConsumo}
                    />
                )}
                {!isAdding && consumos.length > 0 && (
                    <div className="mt-2 mb-5 w-[100%]">
                        <ConsumoList
                            consumos={consumos}
                            setIsAdding={setIsAdding}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function BotonAgregarConsumo({
    title,
    onClick,
}: {
    title: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="bg-remiu-primary px-4 flex items-center justify-center border-2 border-remiu-primary p-2 rounded-md"
        >
            <p className="text-white font-bold">{title}</p>
        </button>
    );
}

function ConsumoForm({
    onClose,
    onAddConsumo,
}: {
    onClose: () => void;
    onAddConsumo: (consumo: Consumo) => void;
}) {
    const defaultForm = {
        nombre: "",
        precio: "",
        cantidad: 1,
    };
    const [form, setForm] = useState(defaultForm);
    const total = useMemo(() => {
        const precio = Number(form.precio);
        if (precio !== 0 && form.cantidad !== 0) {
            return (precio * form.cantidad).toFixed(2);
        }
        return null;
    }, [form.precio, form.cantidad]);

    const classes = {
        input: "w-[50%] p-2 border-[1.5] border-remiu-primary rounded-md text-center bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500",
        inputNumber:
            "w-full p-2 border-b-2 border-gray-400 text-center text-black dark:text-white placeholder:text-gray-500 text-2xl",
        totalAlign: total ? "text-left" : "text-center",
    };

    const handleAmount = (type: "+" | "-") => {
        setForm({
            ...form,
            cantidad:
                type === "+"
                    ? form.cantidad + 1
                    : form.cantidad - 1,
        });
    };

    function handleAddConsumo() {
        const newConsumo = createNewConsumo(
            form.nombre,
            form.precio,
            form.cantidad
        );
        onAddConsumo(newConsumo);
        onClose();
        setForm(defaultForm);
    }

    const handlePrecioChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newValue = e.target.value;
        const processedValue = newValue.trim();
        if (
            Number(processedValue) ||
            processedValue === ""
        ) {
            setForm({
                ...form,
                precio: processedValue,
            });
        } else {
            return;
        }
    };
    return (
        <div className="w-[100%] border-1 border-gray-300/80 bg-white p-4 pb-5 shadow-lg rounded-xl my-3">
            <div className="pb-4 flex justify-between items-center">
                <p className="text-center font-bold">
                    {"Nuevo Consumo:"}
                </p>
                <button
                    className="text-gray-500"
                    onClick={onClose}
                >
                    <IoClose size={20} />
                </button>
            </div>
            <div className="flex gap-3">
                <input
                    type="text"
                    placeholder="Nombre*"
                    className={`${classes.input} text-left`}
                    value={form.nombre}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            nombre: e.target.value,
                        })
                    }
                />
                <div className="w-[50%] flex items-center justify-center gap-1">
                    <span className="text-xl font-bold">
                        {"$"}
                    </span>
                    <input
                        type="number"
                        placeholder="0"
                        className={`${classes.input} w-full text-xl`}
                        value={form.precio}
                        onChange={(e) =>
                            handlePrecioChange(e)
                        }
                    />
                </div>
            </div>

            <div className="flex justify-between gap-3">
                <div className="flex flex-col items-center py-3 mb-2 w-[50%]">
                    <p className="w-full text-left text-sm text-gray-600">
                        {"Total:"}
                    </p>
                    <p
                        className={`text-2xl font-bold text-remiu-primary ${classes.totalAlign} w-full`}
                    >
                        {total ? `$${total}` : "--"}
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 w-[42%] items-center">
                    <ButtonSmall
                        title="-"
                        onClick={() => handleAmount("-")}
                        disabled={form.cantidad === 1}
                    />
                    <input
                        type="number"
                        readOnly
                        value={form.cantidad}
                        placeholder="Cantidad"
                        className={classes.inputNumber}
                    />
                    <ButtonSmall
                        title="+"
                        onClick={() => handleAmount("+")}
                    />
                </div>
            </div>

            <div className="flex justify-between gap-3">
                {/* <Button
                    title="Cancelar"
                    onClick={onClose}
                /> */}
                <Button
                    title="Agregar"
                    onClick={handleAddConsumo}
                    disabled={
                        Number(form.precio) === 0 ||
                        form.nombre.trim() === ""
                    }
                />
            </div>
        </div>
    );
}

function ButtonSmall({
    title,
    onClick,
    disabled,
}: {
    title: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    const disabledClass = disabled ? "opacity-50" : "";
    return (
        <button
            onClick={onClick}
            className={`bg-remiu-primary text-center border-2 border-remiu-primary py-1 px-1 rounded-md ${disabledClass}`}
            disabled={disabled}
        >
            <p className="text-white text-xl font-bold">
                {title}
            </p>
        </button>
    );
}

function NameAndActions({
    nombre,
    setNombre,
}: {
    nombre: string;
    setNombre: (nombre: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const currentCuenta = useSelector(
        (state: RootState) => state.currentCuenta
    );
    const navigation = useRouter();
    const dispatch = useDispatch();

    const handleAgregarInvitado = () => {
        const newInvitado: Invitado = {
            id: uuidv4(),
            nombre: nombre,
            consumos: [],
            joined: false,
        };
        dispatch(addInvitadoToCurrentCuenta(newInvitado));
        setIsOpen(false);
        navigation.push("/cuenta");
    };

    useEffect(() => {
        dispatch(setCurrentCuenta(currentCuenta));
    }, [currentCuenta]);

    return (
        <div className="flex justify-between items-center gap-3">
            <input
                type="text"
                placeholder="(sin nombre)"
                className="w-full text-xl p-2 pl-0 border-b border-gray-400 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                // autoFocus
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <DropdownMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                // title="Acciones"
                trigger={
                    <FaEllipsisV
                        size={24}
                        style={{ marginRight: "-8px" }}
                    />
                }
            >
                <DropdownMenuItem
                    title="Eliminar"
                    onClick={() => {}}
                />
            </DropdownMenu>
        </div>
    );
}
