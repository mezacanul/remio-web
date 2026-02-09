"use client";

import Button from "@/src/components/Button";
import DropdownMenu from "@/src/components/DropdownMenu";
import DropdownMenuItem from "@/src/components/DropdownMenuItem";
import InvitadosList from "@/src/components/InvitadosList";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { FaArrowLeft, FaShare } from "react-icons/fa6";
import { MdOutlineIosShare } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function CuentaPage() {
    const navigation = useRouter();
    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
                <span onClick={() => navigation.push("/")}>
                    <FaArrowLeft size={20} />
                </span>
                <h1 className="text-2xl font-bold">
                    Nueva Cuenta
                </h1>
            </div>
            <NameAndActions />
            <div className="h-[45vh] overflow-y-auto my-4">
                <InvitadosList />
            </div>
            <Summary />
        </div>
    );
}

function NameAndActions() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex justify-between items-center gap-3">
            <input
                type="text"
                placeholder="nombre de la cuenta*"
                className="w-full p-2 pl-0 border-b border-gray-400 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                autoFocus
            />
            <DropdownMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                // title="Acciones"
                icon={<FaEllipsisV />}
            >
                <DropdownMenuItem
                    title="Guardar"
                    onClick={() => {}}
                />
                <DropdownMenuItem
                    title="Agregar Invitado"
                    onClick={() => {}}
                />
                <DropdownMenuItem
                    title="Codigo de invitación"
                    onClick={() => {}}
                />
                <DropdownMenuItem
                    title="Eliminar"
                    onClick={() => {}}
                />
            </DropdownMenu>
        </div>
    );
}

function Summary() {
    return (
        <div className="flex justify-between items-start gap-3 w-full border-t border-gray-400 pt-7">
            <div className="w-[4rem]">
                <Button
                    onClick={() => {}}
                    icon={<MdOutlineIosShare size={20} />}
                    // py="4rem"
                />
            </div>
            <div className="flex flex-col gap-3 -mt-2">
                <div className="flex justify-between items-end gap-5">
                    <span>Total en el ticket:</span>
                    <span className="font-bold text-xl">
                        $100.00
                    </span>
                </div>
                <div className="flex justify-between items-end gap-5">
                    <span>Total calculado:</span>
                    <span className="font-bold text-xl text-remiu-primary">
                        $100.00
                    </span>
                </div>
            </div>
        </div>
    );
}
