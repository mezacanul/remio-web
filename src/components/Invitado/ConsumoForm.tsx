import { Consumo } from "@/src/types";
import { useEffect, useMemo, useState } from "react";
import { createNewConsumo } from "@/src/utils";
import { IoClose } from "react-icons/io5";
import Button from "../Common/Button";
import ButtonSmall from "./ButtonSmall";

type ConsumoFormProps = {
    onClose: () => void;
    onAddConsumo: (consumo: Consumo) => void;
    onUpdateConsumo: (consumo: Consumo) => void;
    currentConsumo: Consumo | null;
    setCurrentConsumo: (consumo: Consumo | null) => void;
};

export default function ConsumoForm({
    onClose,
    onAddConsumo,
    onUpdateConsumo,
    currentConsumo,
    setCurrentConsumo,
}: ConsumoFormProps) {
    const defaultForm = {
        nombre: "",
        precio: "",
        cantidad: 1,
    };
    const [form, setForm] = useState(
        currentConsumo ? currentConsumo : defaultForm
    );
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

    function handleSaveConsumo() {
        if (!currentConsumo) {
            const newConsumo = createNewConsumo(
                form.nombre,
                form.precio,
                form.cantidad
            );
            onAddConsumo(newConsumo);
        } else {
            onUpdateConsumo(form);
        }
        handleClose();
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

    const handleClose = () => {
        onClose();
        setForm(defaultForm);
        setCurrentConsumo(null);
    };
    return (
        <div className="w-[100%] border-1 border-gray-300/80 bg-white p-4 pb-5 shadow-lg rounded-xl my-3">
            <div className="pb-4 flex justify-between items-center">
                <p className="text-center font-bold">
                    {currentConsumo
                        ? "Editar Consumo:"
                        : "Nuevo Consumo:"}
                </p>
                <button
                    className="text-gray-500"
                    onClick={handleClose}
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
                    title="Guardar"
                    onClick={handleSaveConsumo}
                    disabled={
                        Number(form.precio) === 0 ||
                        form.nombre.trim() === ""
                    }
                />
            </div>
        </div>
    );
}
