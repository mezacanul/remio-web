import {
    BsFillPersonFill,
    BsPersonCircle,
} from "react-icons/bs";

export default function InvitadoItem({
    nombre,
    monto,
    joined,
    onClick,
}: {
    nombre: string;
    monto: string;
    joined: boolean;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="bg-white border border-remiu-primary shadow-sm flex justify-between items-center p-3 rounded-md cursor-pointer"
        >
            <div className="flex items-center gap-2">
                {/* <MdArrowForwardIos /> */}
                <span className="text-remiu-primary">
                    {joined ? (
                        <BsPersonCircle size={22} />
                    ) : (
                        <BsFillPersonFill size={22} />
                    )}
                </span>
                <div className="flex items-end gap-2 h-full">
                    <span>{nombre}</span>
                    <span className="text-gray-600 text-remiu-primary text-sm">
                        {joined ? " (se unió)" : ""}
                    </span>
                </div>
            </div>
            <span className="text-remiu-primary font-bold">
                {monto}
            </span>
        </div>
    );
}
