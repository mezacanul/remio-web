import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Invitado } from "@/src/types";
import { v4 as uuidv4 } from "uuid";
import { addInvitadoToCurrentCuenta, setCurrentCuenta } from "@/src/features/currentCuentaSlice";
import DropdownMenu from "../Common/DropdownMenu";
import DropdownMenuItem from "../Common/DropdownMenuItem";
import { FaEllipsisV } from "react-icons/fa";

type NameAndActionsProps = {
    nombre: string;
    setNombre: (nombre: string) => void;
};

export default function NameAndActions({
    nombre,
    setNombre,
}: NameAndActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const currentCuenta = useSelector(
        (state: RootState) => state.currentCuenta
    );
    const navigation = useRouter();
    const dispatch = useDispatch();

    const handleAgregarInvitado = () => {
        const newInvitado: Invitado = {
            id: uuidv4(),
            nombre: nombre,
            consumos: [],
            joined: false,
        };
        dispatch(addInvitadoToCurrentCuenta(newInvitado));
        setIsOpen(false);
        navigation.push("/cuenta");
    };

    useEffect(() => {
        dispatch(setCurrentCuenta(currentCuenta));
    }, [currentCuenta]);

    return (
        <div className="flex justify-between items-center gap-3">
            <input
                type="text"
                placeholder="(sin nombre)"
                className="w-full text-xl p-2 pl-0 border-b border-gray-400 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                // autoFocus
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <DropdownMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                // title="Acciones"
                trigger={
                    <FaEllipsisV
                        size={24}
                        style={{ marginRight: "-8px" }}
                    />
                }
            >
                <DropdownMenuItem
                    title="Eliminar"
                    onClick={() => {}}
                />
            </DropdownMenu>
        </div>
    );
}
