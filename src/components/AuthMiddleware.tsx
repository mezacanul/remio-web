"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Login from "./Login";
import Layout from "./Layout";
import { getUserFromLocalStorage } from "../utils";
import { useEffect, useState } from "react";
import { setUser } from "../features/userSlice";
import { ImSpinner2 } from "react-icons/im";

export default function AuthMiddleware({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState<boolean>(true);
    const user = useSelector(
        (state: RootState) => state.user
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = getUserFromLocalStorage();
        if (storedUser) {
            dispatch(setUser(storedUser));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen animate-spin -mt-10">
                <span className="text-remiu-primary">
                    <ImSpinner2 size={40} />
                </span>
            </div>
        );
    }

    if (!user.token) {
        return <Login />;
    }
    return <Layout>{children}</Layout>;
}
