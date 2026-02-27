import { useState } from "react";
import { useRouter } from "next/navigation";
import DropdownMenu from "../Common/DropdownMenu";
import DropdownMenuItem from "../Common/DropdownMenuItem";
import Button from "../Common/Button";

export default function AddNewDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigation = useRouter();

    return (
        <DropdownMenu
            trigger={
                <Button
                    title="Agregar +"
                    onClick={() => {}}
                    w="20"
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
    );
}
