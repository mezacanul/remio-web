"use client";
import { useState } from "react";
import Logo from "./Logo";
import Button from "./Common/Button";
import { initUser } from "@/src/features/userSlice";
import { useDispatch } from "react-redux";
import { FiSun } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import LoadingSpinner from "./Common/LoadingSpinner";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // const [form, setForm] = useState({
    //     number: "",
    // });

    const handleLogin = () => {
        setIsLoading(true);
        const send = {
            _id: "user123",
            nombres: "Eduardo",
            apellidos: "Meza",
            email: "eduardo@gmail.com",
            profilePicture:
                "https://picsum.photos/600/600.jpg",
            token: window.crypto.randomUUID(),
        };
        console.log(send);

        setTimeout(() => {
            dispatch(initUser(send));
            // setIsLoading(false);
        }, 1500);
    };

    // const handlePhoneChange = (
    //     e: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const nextChar =
    //         e.target.value[e.target.value.length - 1];
    //     const nextIsNumber = !isNaN(Number(nextChar));
    //     const value = e.target.value;
    //     if (
    //         phoneValidation(nextIsNumber, value) ||
    //         value === ""
    //     ) {
    //         setForm({
    //             ...form,
    //             number: value,
    //         });
    //     }
    // };

    const phoneValidation = (
        nextIsNumber: boolean,
        value: string
    ) => {
        return nextIsNumber && value.length <= 10;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            <ToggleTheme />
            <div className="flex flex-col items-center justify-center gap-4 w-[15rem] -mt-20">
                <Logo size={"lg"} />
                <p className="text-sm italic mb-1 dark:text-gray-300">
                    {/* {"¡Cuentas claras, Amistades largas!"} */}
                    {"¡Divide tus cuentas facilmente!"}
                </p>
                {/* <input
                    type="text"
                    placeholder="Número de teléfono"
                    value={form.number}
                    className="w-full p-2 border border-gray-400 rounded-md text-center bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-gray-500"
                    onChange={handlePhoneChange}
                /> */}
                {!isLoading && (
                    <OAuthOptions
                        handleLogin={handleLogin}
                    />
                )}
                {isLoading && <LoadingSpinner />}
                {/* {!isLoading && (
                    <Button
                        disabled={form.number.length !== 10}
                        title="Iniciar"
                        onClick={handleLogin}
                    />
                )} */}
            </div>
        </div>
    );
}

function OAuthOptions({
    handleLogin,
}: {
    handleLogin: () => void;
}) {
    const options = [
        {
            name: "Google",
            icon: "/google.icon.png",
        },
        {
            name: "Facebook",
            icon: "/facebook.icon.png",
        },
    ];
    return (
        <div className="flex flex-col gap-3 w-full">
            {options.map((option, idx) => (
                <button
                    key={idx}
                    className="flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-md shadow-sm w-full"
                    onClick={handleLogin}
                >
                    <Image
                        src={option.icon}
                        alt={option.name}
                        width={25}
                        height={25}
                    />
                    <span className="text-sm font-semibold">
                        {"Iniciar con " + option.name}
                    </span>
                </button>
            ))}
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
