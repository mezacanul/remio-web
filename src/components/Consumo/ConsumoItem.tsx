import { Consumo } from "@/src/types";
import { useMemo } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function ConsumoItem({
    consumo,
    onClick,
}: {
    consumo: Consumo;
    onClick: (consumo: Consumo) => void;
}) {
    const total = useMemo(() => {
        return (
            parseFloat(consumo.precio) * consumo.cantidad
        );
    }, [consumo]);

    return (
        <div
            className="bg-white border border-remiu-primary shadow-sm flex justify-between items-center p-3 rounded-md cursor-pointer"
            onClick={() => {
                console.log(consumo);
                onClick(consumo);
            }}
        >   
            <div className="flex items-center gap-1">
                <FaChevronRight />
                <p className="text-lg">{consumo.nombre}</p>
            </div>
            <p className="font-bold">{`$${total.toFixed(
                2
            )}`}</p>
        </div>
    );
}
