import { useState } from "react";
import Button from "./Button";

type DropdownMenuProps = {
    icon?: React.ReactNode;
    title?: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function DropdownMenu({
    title,
    icon,
    children,
    isOpen,
    setIsOpen,
}: DropdownMenuProps) {
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="relative">
            <Button
                title={title || ""}
                onClick={handleClick}
                w="20"
                icon={icon}
            />
            {isOpen && (
                <div className="w-50 gap-4 flex flex-col absolute top-full right-0 bg-gray-100 shadow-md rounded-md p-4">
                    {children}
                </div>
            )}
        </div>
    );
}
