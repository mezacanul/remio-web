import { useState } from "react";
import Button from "./Button";

type DropdownMenuProps = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function DropdownMenu({
    trigger,
    children,
    isOpen,
    setIsOpen,
}: DropdownMenuProps) {
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative">
            <div onClick={handleClick}>{trigger}</div>
            {isOpen && (
                <div className="w-50 gap-4 flex flex-col absolute top-full right-0 bg-white border border-gray-300 shadow-md rounded-md p-4">
                    {children}
                </div>
            )}
        </div>
    );
}
