import { useState } from "react";
import { NameAndActionsProps } from "@/types/main";
import DropdownMenu from "../Common/DropdownMenu";
import DropdownMenuItem from "../Common/DropdownMenuItem";
import { FaEllipsisV } from "react-icons/fa";

export default function NameAndActions({
    nameRef,
    nombre,
    setNombre,
    createdAt,
    onDeleteCuenta,
}: NameAndActionsProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-between items-start gap-1">
            <div className="w-full">
                <input
                    type="text"
                    placeholder="(sin nombre)"
                    className="w-full text-xl p-2 pb-1 pl-0 border-b border-gray-400 dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                    // autoFocus
                    // onBlur={onSave}
                    ref={nameRef}
                    value={nombre}
                    onChange={(e) =>
                        setNombre(e.target.value)
                    }
                />
                <p className="text-sm text-gray-500 mt-2">
                    {createdAt || "--"}
                </p>
            </div>

            <DropdownMenu
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                // title="Acciones"
                trigger={
                    <FaEllipsisV
                        size={24}
                        style={{
                            marginRight: "-8px",
                            marginTop: "14px",
                        }}
                    />
                }
            >
                <DropdownMenuItem
                    title="Codigo de invitación"
                    onClick={() => {}}
                />
                <DropdownMenuItem
                    title="Eliminar"
                    onClick={onDeleteCuenta}
                />
            </DropdownMenu>
        </div>
    );
}
