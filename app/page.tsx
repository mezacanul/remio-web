"use client";
import Button from "@/src/components/Button";
import DropdownMenu from "@/src/components/DropdownMenu";
import DropdownMenuItem from "@/src/components/DropdownMenuItem";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useRouter();

    return (
        <div className="flex bg-white flex-col rounded-md p-3 h-[60%] border border-2 border-remiu-primary">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {"Mis cuentas"}
                </h1>
                <DropdownMenu
                    title="Agregar +"
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                >
                    <DropdownMenuItem
                        title="Nueva Cuenta"
                        onClick={() => {
                            setIsOpen(false);
                            navigation.push("/cuenta");
                        }}
                    />
                    <DropdownMenuItem
                        title="Consumo Personal"
                        onClick={() => {
                            setIsOpen(false);
                            navigation.push("/consumo");
                        }}
                    />
                </DropdownMenu>
            </div>
            <div className="h-full flex justify-center items-center">
                <p className="w-[60%] -mt-10 text-center">
                    {"Aqui apareceran tus cuentas 🥂"}
                </p>
            </div>
        </div>
    );
}
