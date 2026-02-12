import { Consumo } from "@/src/types";
import { useMemo } from "react";

export default function ConsumoItem({
    consumo,
}: {
    consumo: Consumo;
}) {
    const total = useMemo(() => {
        return (
            parseFloat(consumo.precio) * consumo.cantidad
        );
    }, [consumo]);
    return (
        <div className="bg-white border border-remiu-primary shadow-sm flex justify-between items-center p-3 rounded-md cursor-pointer">
            <p>{consumo.nombre}</p>
            <p className="font-bold">{`$${total.toFixed(2)}`}</p>
        </div>
    );
}
