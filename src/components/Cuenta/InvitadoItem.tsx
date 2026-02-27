import {
    BsFillPersonFill,
    BsPersonCircle,
} from "react-icons/bs";

interface InvitadoItemProps {
    nombre: string;
    onClick?: () => void;
    total: number;
}

export default function InvitadoItem({
    nombre,
    // monto,
    onClick,
    total,
}: InvitadoItemProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white border border-remiu-primary shadow-sm flex justify-between items-center p-3 rounded-md cursor-pointer"
        >
            <div className="flex items-center gap-2.5">
                {/* <MdArrowForwardIos /> */}
                <span className="">
                    <BsPersonCircle size={22} />
                </span>
                <div className="flex items-end gap-2 h-full">
                    <span className="text-lg">
                        {nombre}
                    </span>
                    {/* <span className="text-gray-600 text-remiu-primary text-sm">
                        {joined ? " (se unió)" : ""}
                    </span> */}
                </div>
            </div>
            <span className="text-remiu-primary font-bold">
                {/* {monto} */}
                {/* {"$3,500.00"} */}
                {`$${total.toFixed(2)}`}
            </span>
        </div>
    );
}
