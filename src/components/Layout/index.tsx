import { setCuentas } from "@/src/features/cuentasSlice";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCuentasFromLocalStorage } from "@/src/utils";
import { ImSpinner2 } from "react-icons/im";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsLoading(true);
        const cuentas = getCuentasFromLocalStorage();
        if (cuentas) {
            dispatch(setCuentas(cuentas));
        }
        setIsLoading(false);
    }, []);
    return (
        <div className="flex flex-col px-6 h-screen">
            <Header />
            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <ImSpinner2 size={24} />
                </div>
            )}
            {!isLoading && (
                <main className="h-full">{children}</main>
            )}
        </div>
    );
}
