"use client";
import Button from "@/src/components/Common/Button";
import DropdownMenu from "@/src/components/Common/DropdownMenu";
import DropdownMenuItem from "@/src/components/Common/DropdownMenuItem";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { Cuenta } from "@/src/types";
import { FaChevronRight } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { ImSpoonKnife } from "react-icons/im";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {
    resetCurrentCuenta,
    setCurrentCuenta,
} from "@/src/features/currentCuentaSlice";

export default function Home() {
    const dispatch = useDispatch();
    const cuentas = useSelector(
        (state: RootState) => state.cuentas
    );

    useEffect(() => {
        dispatch(resetCurrentCuenta());
    }, []);

    useEffect(() => {
        console.log(cuentas);
    }, [cuentas]);
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useRouter();

    return (
        <div className="flex flex-col rounded-md h-[60%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {"Mis cuentas"}
                </h1>
                <DropdownMenu
                    // title="Agregar +"
                    trigger={
                        <Button
                            title="Agregar +"
                            onClick={() => {}}
                            w="20"
                            // icon={<FaPlus size={16} />}
                        />
                    }
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
            {cuentas.length === 0 && (
                <div className="h-full flex justify-center items-center">
                    <p className="w-[60%] -mt-10 text-center">
                        {"Aqui apareceran tus cuentas 🥂"}
                    </p>
                </div>
            )}
            {cuentas.length > 0 && (
                <CuentasList cuentas={cuentas} />
            )}
        </div>
    );
}

function CuentasList({ cuentas }: { cuentas: Cuenta[] }) {
    return (
        <div className="flex flex-col gap-2 py-4">
            {cuentas.map((cuenta, index) => (
                <CuentaItem key={index} cuenta={cuenta} />
            ))}
        </div>
    );
}

function CuentaItem({ cuenta }: { cuenta: Cuenta }) {
    const dispatch = useDispatch();
    const navigation = useRouter();

    const handleClick = () => {
        console.log(cuenta);
        dispatch(setCurrentCuenta(cuenta));
        navigation.push("/cuenta");
    };
    return (
        <div
            onClick={handleClick}
            className="bg-white border-2 border-remiu-primary shadow-sm flex items-center justify-between p-2 rounded-md cursor-pointer"
        >
            <div className="flex items-center gap-2">
                <TbFileInvoice size={30} />
                {/* <ImSpoonKnife size={28} /> */}
                {/* <GiForkKnifeSpoon size={30} /> */}
                <div className="flex flex-col gap-1">
                    <h1>
                        {cuenta.nombre}
                        {}
                    </h1>
                    <p className="text-xs text-gray-500">
                        {cuenta.createdAt}
                    </p>
                </div>
            </div>
            <div>
                <FaChevronRight size={16} />
            </div>
        </div>
    );
}
