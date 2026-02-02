"use client";
import { useState } from "react";
import Logo from "./Logo";
import Button from "./Button";
import { initUser } from "@/src/features/userSlice";
import { useDispatch } from "react-redux";
import { FiSun } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        number: "",
    });

    const handleLogin = () => {
        setIsLoading(true);
        const send = {
            number: form.number,
            token: window.crypto.randomUUID(),
        };
        console.log(send);

        setTimeout(() => {
            dispatch(initUser(send));
            // setIsLoading(false);
        }, 1500);
    };

    const handlePhoneChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const nextChar =
            e.target.value[e.target.value.length - 1];
        const nextIsNumber = !isNaN(Number(nextChar));
        const value = e.target.value;
        if (
            phoneValidation(nextIsNumber, value) ||
            value === ""
        ) {
            setForm({
                ...form,
                number: value,
            });
        }
    };

    const phoneValidation = (
        nextIsNumber: boolean,
        value: string
    ) => {
        return nextIsNumber && value.length <= 10;
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center h-screen relative">
            <ToggleTheme />
            <div className="flex flex-col items-center justify-center gap-4 w-[15rem] -mt-20">
                <Logo size={"lg"} />
                <p className="text-sm italic mb-3 dark:text-gray-300">
                    {"¡Cuentas claras, Amistades largas!"}
                </p>
                <input
                    type="text"
                    placeholder="Número de teléfono"
                    value={form.number}
                    className="w-full p-2 border border-gray-400 rounded-md text-center bg-white text-black placeholder:text-gray-500"
                    onChange={handlePhoneChange}
                />
                {isLoading && (
                    <span className="text-2xl p-2 animate-spin text-purple-700 dark:text-white">
                        <ImSpinner2 />
                    </span>
                )}
                {!isLoading && (
                    <Button
                        disabled={form.number.length !== 10}
                        title="Iniciar"
                        onClick={handleLogin}
                    />
                )}
            </div>
        </div>
    );
}

function ToggleTheme() {
    return (
        <div className="absolute top-6 right-5">
            <button
                className="text-xl"
                onClick={() => {
                    document.documentElement.classList.toggle(
                        "dark"
                    );
                }}
            >
                <FiSun className="dark:text-white" />
            </button>
        </div>
    );
}
