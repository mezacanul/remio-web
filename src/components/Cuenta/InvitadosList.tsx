import InvitadoItem from "./InvitadoItem";
import { useRouter } from "next/navigation";
import { Invitado } from "@/src/types";
import { useState } from "react";
import Button from "../Common/Button";

type MappedInvitado = {
    // id: string;
    _id: string;
    nombre: string;
    joined?: boolean;
    total: number;
};

interface InvitadosListProps {
    invitados: MappedInvitado[];
    onAddInvitado: () => void;
}

export default function InvitadosList({
    invitados,
    onAddInvitado,
}: InvitadosListProps) {
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
            <div className="flex flex-col gap-3">
                {invitados &&
                    invitados.map((invitado) => (
                        <InvitadoItem
                            // key={invitado.id}
                            key={invitado._id}
                            nombre={invitado.nombre}
                            // monto={invitado.monto}
                            joined={
                                invitado.joined ?? false
                            }
                            total={invitado.total}
                            onClick={() => {
                                navigation.push(
                                    `/invitado?id=${invitado._id}`
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
