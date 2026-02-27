import InvitadoItem from "./InvitadoItem";
import { useRouter } from "next/navigation";
// import { Invitado } from "@/src/types";
import { useState } from "react";
import Button from "../Common/Button";
import { useDispatch } from "react-redux";
import { setCurrentInvitado } from "@/src/features/currentInvitado";
import { Invitado } from "@/types/base";

interface InvitadoWithTotal extends Invitado {
    // id: string;
    _id: string;
    total: number;
}

interface InvitadosListProps {
    invitados: InvitadoWithTotal[];
    onAddInvitado: () => void;
}

export default function InvitadosList({
    invitados,
    onAddInvitado,
}: InvitadosListProps) {
    const navigation = useRouter();
    const dispatch = useDispatch();

    function handleClick(invitado: InvitadoWithTotal) {
        dispatch(setCurrentInvitado(invitado));
        navigation.push(`/invitado`);
    }

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
                            total={invitado.total}
                            onClick={() => {
                                handleClick(invitado);
                            }}
                        />
                    ))}
            </div>
        </div>
    );
}