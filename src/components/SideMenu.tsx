"use client";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import {
    setIsOpen,
    toggleIsOpen,
} from "@/src/features/sidemenuSlice";
import { useState, useEffect } from "react";

export default function SideMenu() {
    const [animConfig, setAnimConfig] = useState({
        isOpen: false,
        opacity: 0,
        w: "0vw",
    });
    const isOpen = useSelector(
        (state: RootState) => state.sidemenu.isOpen
    );

    useEffect(() => {
        if (isOpen) {
            setAnimConfig({
                opacity: 0,
                w: "0vw",
                isOpen: true,
            });
            setTimeout(() => {
                setAnimConfig({
                    isOpen: true,
                    opacity: 1,
                    w: "65vw",
                });
            }, 1);
        } else {
            setAnimConfig({
                isOpen: true,
                opacity: 0,
                w: "0vw",
            });
            setTimeout(() => {
                setAnimConfig({
                    opacity: 0,
                    w: "0vw",
                    isOpen: false,
                });
            }, 500);
        }
    }, [isOpen]);

    return (
        <div
            className={`inset-0 z-50 ${
                animConfig.isOpen ? "fixed" : "hidden"
            }`}
        >
            <Backdrop animConfig={animConfig} />
            <div
                className="h-full bg-white absolute right-0 top-0 z-50"
                style={{
                    width: animConfig.w,
                    transition: "all 0.5s ease-in-out",
                    // opacity: animConfig.opacity,
                }}
            >
                <CloseButton animConfig={animConfig} />
                <SidemenuItems />
            </div>
        </div>
    );
}

function Backdrop({ animConfig }: { animConfig: any }) {
    const dispatch = useDispatch();
    return (
        <div
            className="absolute inset-0 bg-black/50 z-40"
            style={{
                opacity: animConfig.opacity,
                transition: "all 0.5s ease-in-out",
            }}
            onClick={() => dispatch(setIsOpen(false))}
        />
    );
}

function SidemenuItems({}) {
    return (
        <div className="p-4 mt-10">
            <h1>SideMenuItems</h1>
        </div>
    );
}

function CloseButton({ animConfig }: { animConfig: any }) {
    const dispatch = useDispatch();
    return (
        <button
            className="absolute top-4 right-4 text-2xl"
            style={{
                opacity: animConfig.opacity,
                transition: "all 0.5s ease-in-out",
            }}
            onClick={() => dispatch(setIsOpen(false))}
        >
            <IoClose />
        </button>
    );
}
