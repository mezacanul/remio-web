"use client";

import Button from "@/src/components/Button";
import Header from "@/src/components/Common/Header";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoPerson } from "react-icons/io5";

export default function ConsumoPage() {
    const { nombre } = useParams();
    const navigation = useRouter();
    const [isAdding, setIsAdding] = useState(false);
    return (
        <div>
            <Header
                title={`Consumo`}
                onBack={() => navigation.push("/cuenta")}
            />
            <div className="flex items-center gap-2 mt-2">
                <span className="">
                    <IoPerson size={20} />
                </span>
                <p className="text-xl font-bold">
                    {nombre}
                </p>
            </div>

            <div className="my-5 py-3 w-[100%]">
                <div
                    className="flex justify-center"
                    hidden={isAdding}
                >
                    <BotonAgregarConsumo
                        title="Agregar Consumo +"
                        onClick={() => setIsAdding(true)}
                    />
                </div>

                {isAdding && (
                    <ConsumoForm
                        onClose={() => setIsAdding(false)}
                    />
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

function ConsumoForm({ onClose }: { onClose: () => void }) {
    const [form, setForm] = useState({
        nombre: "",
        precio: 0,
        cantidad: 1,
    });
    const classes = {
        input: "w-full p-2 border-[1.5] border-remiu-primary rounded-md text-center bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500",
        inputNumber:
            "w-full p-2 border-b-2 border-gray-400 text-center text-black dark:text-white placeholder:text-gray-500 text-2xl",
    };

    const handleAmount = (type: "+" | "-") => {
        if (type === "+") {
            setForm({
                ...form,
                cantidad: form.cantidad + 1,
            });
        } else {
            setForm({
                ...form,
                cantidad: form.cantidad - 1,
            });
        }
    };
    return (
        <div className="w-[100%] bg-white p-4 pb-5 shadow-lg rounded-xl">
            <div className="pb-4 flex justify-between items-center">
                <p className="text-center font-bold">
                    {"Nuevo Consumo:"}
                </p>
                <button className="text-gray-500" onClick={onClose}>
                    <IoClose size={20} />
                </button>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Nombre*"
                    className={`${classes.input} text-left`}
                />
                <input
                    type="number"
                    placeholder="Precio*"
                    className={classes.input}
                />
            </div>

            <div className="flex justify-between gap-3">
                <div className="grid grid-cols-3 gap-2 py-3 w-[50%] items-center">
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

                <div className="flex flex-col items-center py-3 mb-2 w-[50%]">
                    <p>{"Total:"}</p>
                    <p className="text-xl font-bold text-remiu-primary text-center">
                        {"$13,500.00"}
                    </p>
                </div>
            </div>

            <div className="flex justify-between gap-3">
                {/* <Button
                    title="Cancelar"
                    onClick={onClose}
                /> */}
                <Button
                    title="Agregar"
                    onClick={() => {}}
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
