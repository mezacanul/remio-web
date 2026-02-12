import { Consumo } from "@/src/types";
import Button from "../Common/Button";
import ConsumoItem from "./ConsumoItem";

export default function ConsumoList({
    consumos,
    setIsAdding,
}: {
    consumos: Consumo[];
    setIsAdding: (isAdding: boolean) => void;
}) {
    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold">
                    {"Consumo"}
                </p>
                <Button
                    title="+"
                    w="10"
                    py="1"
                    onClick={() => setIsAdding(true)}
                />
            </div>
            <div className="flex flex-col gap-2 py-4">
                {consumos.map((consumo) => (
                    <ConsumoItem
                        key={consumo.id}
                        consumo={consumo}
                    />
                ))}
            </div>
        </div>
    );
}
