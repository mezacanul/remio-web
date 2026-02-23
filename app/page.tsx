"use client";
import Button from "@/src/components/Common/Button";
import DropdownMenu from "@/src/components/Common/DropdownMenu";
import DropdownMenuItem from "@/src/components/Common/DropdownMenuItem";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { Cuenta } from "@/src/types";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineDinnerDining } from "react-icons/md";
import LoadingSpinner from "@/src/components/Common/LoadingSpinner";
import { useGetCuentasQuery } from "@/src/store/api/cuentasApi";
import { TbFileInvoice, TbInvoice } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { formatDate } from "@/src/utils";
import { ImSpoonKnife } from "react-icons/im";

type CuentaListItem = Pick<
    Cuenta,
    "nombre" | "createdAt"
> & {
    _id: string;
};

export default function Home() {
    const userId = useSelector(
        (state: RootState) => state.user._id
    );
    const {
        data: cuentasData,
        isLoading,
        isError,
    } = useGetCuentasQuery(userId);
    const cuentas = useMemo(() => {
        if (cuentasData) {
            return cuentasData?.map((cuenta) => {
                return {
                    ...cuenta,
                    createdAt: formatDate(cuenta.createdAt),
                };
            });
        }
        return null;
    }, [cuentasData]);

    const [isOpen, setIsOpen] = useState(false);
    const navigation = useRouter();

    return (
        <div className="flex flex-col rounded-md h-[60%]">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    {"Mis cuentas"}
                </h1>
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
            </div>

            {isLoading && (
                <div className="h-[40%] flex justify-center items-center">
                    <LoadingSpinner size="lg" />
                </div>
            )}

            {!isLoading &&
                cuentas &&
                cuentas.length === 0 && (
                    <div className="h-full flex justify-center items-center">
                        <p className="w-[60%] -mt-10 text-center">
                            {
                                "Aqui apareceran tus cuentas 🥂"
                            }
                        </p>
                    </div>
                )}
            {!isLoading &&
                cuentas &&
                cuentas.length > 0 && (
                    <CuentasList
                        cuentas={
                            cuentas as CuentaListItem[]
                        }
                    />
                )}
        </div>
    );
}

function CuentasList({
    cuentas,
}: {
    cuentas: CuentaListItem[];
}) {
    return (
        <div className="flex flex-col gap-2 py-4">
            {cuentas.map((cuenta, index) => (
                <CuentaItem
                    key={index}
                    idx={index}
                    cuenta={cuenta}
                />
            ))}
        </div>
    );
}

function CuentaItem({
    idx,
    cuenta,
}: {
    idx: number;
    cuenta: CuentaListItem;
}) {
    const dispatch = useDispatch();
    const navigation = useRouter();

    // const handleClick = () => {
    //     console.log(cuenta);
    //     dispatch(setCurrentCuenta(cuenta));
    //     navigation.push("/cuenta");
    // };
    return (
        <div
            // onClick={handleClick}
            className="bg-white border-2 border-remiu-primary shadow-sm flex items-center justify-between p-2 rounded-md cursor-pointer"
        >
            <div className="flex items-center gap-4">
                {idx % 2 === 0 ? (
                    <LiaFileInvoiceDollarSolid size={36} />
                ) : (
                    <MdOutlineDinnerDining size={38} />
                )}
                <div className="flex flex-col gap-1">
                    <h1>{cuenta.nombre}</h1>
                    <p className="text-xs text-gray-500">
                        {cuenta.createdAt}
                    </p>
                </div>
            </div>
            <div>
                <FaChevronRight size={16} />
            </div>
        </div>
    );
}
