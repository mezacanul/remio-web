import Button from "../Common/Button";
import { MdOutlineIosShare } from "react-icons/md";

export default function Summary({
    totalCalculado,
}: {
    totalCalculado: number;
}) {
    return (
        <div className="flex justify-between items-end gap-3 w-full border-t border-gray-400 pt-2">
            <div className="w-[4rem]">
                <Button
                    onClick={() => {}}
                    icon={<MdOutlineIosShare size={20} />}
                    py="3"
                />
            </div>
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex flex-col items-end justify-between items-center gap-1">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-2xl text-remiu-primary">
                        {`$${totalCalculado.toFixed(2)}`}
                    </span>
                </div>
            </div>
        </div>
    );
}
