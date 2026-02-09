"use client";

import { useParams } from "next/navigation";

export default function ConsumoPage() {
    const { nombre } = useParams();
    return (
        <div>
            <h1>Consumo de {nombre}</h1>
        </div>
    );
}
