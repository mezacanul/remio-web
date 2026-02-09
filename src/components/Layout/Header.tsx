import { IoMenu } from "react-icons/io5";
import Logo from "../Logo";
import { useDispatch } from "react-redux";
import { toggleIsOpen } from "@/src/features/sidemenuSlice";

export default function Header() {
    return (
        <header className="flex justify-between items-center py-6">
            <Logo size="sm" />
            <MenuButton />
        </header>
    );
}

function MenuButton() {
    const dispatch = useDispatch();
    return (
        <button
            onClick={() => dispatch(toggleIsOpen())}
            className="flex items-center text-3xl  dark:text-white"
        >
            <IoMenu />
        </button>
    );
}
