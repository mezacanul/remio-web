import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentCuentaID } from "@/src/features/currentCuentaID";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { MdOutlineDinnerDining } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { CuentaListItem } from "@/types/main";

export default function CuentaItem({
    idx,
    cuenta,
}: {
    idx: number;
    cuenta: CuentaListItem;
}) {
    const dispatch = useDispatch();
    const navigation = useRouter();

    const handleClick = () => {
        console.log(cuenta);
        // dispatch(setCurrentCuenta(cuenta));
        dispatch(setCurrentCuentaID(cuenta._id));
        navigation.push("/cuenta");
    };
    return (
        <div
            onClick={handleClick}
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
