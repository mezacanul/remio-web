import InvitadoItem from "./InvitadoItem";
import { useRouter } from "next/navigation";
import { Invitado } from "@/src/types";
import { useState } from "react";
import Button from "./Button";

type MappedInvitado = {
    id: string;
    nombre: string;
    joined?: boolean;
    total: number;
};

export default function InvitadosList({
    invitados,
    onAddInvitado,
}: {
    invitados: MappedInvitado[];
    onAddInvitado: () => void;
}) {
    const navigation = useRouter();
    return (
        <div>
            <div className="flex justify-between items-end mb-4">
                <p className="text-xl font-bold">
                    {"Invitados"}
                </p>
                <Button
                    title="+"
                    w="10"
                    py="1"
                    onClick={onAddInvitado}
                />
            </div>
            <div className="flex flex-col gap-2">
                {invitados &&
                    invitados.map((invitado) => (
                        <InvitadoItem
                            key={invitado.id}
                            nombre={invitado.nombre}
                            // monto={invitado.monto}
                            joined={
                                invitado.joined ?? false
                            }
                            total={invitado.total}
                            onClick={() => {
                                navigation.push(
                                    `/invitado?id=${invitado.id}`
                                );
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}

const invitadosData = [
    {
        id: "1",
        nombre: "Jose Meza",
        consumos: [],
        joined: false,
    },
    {
        id: "2",
        nombre: "Juan Perez",
        consumos: [],
        joined: true,
    },
    {
        id: "3",
        nombre: "Maria Lopez",
        joined: false,
        consumos: [],
    },
];
