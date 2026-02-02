"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import Login from "./Login";

export default function AuthMiddleware({
    children,
}: {
    children: React.ReactNode;
}) {
    const { number, name, token } = useSelector(
        (state: RootState) => state.user
    );
    if (!token) {
        return <Login />;
    }
    return <>{children}</>;
}
