import { Consumo } from "@/src/types";
import Button from "../Common/Button";
import ConsumoItem from "./ConsumoItem";

type ConsumoListProps = {
    consumos: Consumo[];
    setIsFormOpen: (isFormOpen: boolean) => void;
    setCurrentConsumo: (consumo: Consumo) => void;
    disableAddConsumo: boolean;
};

export default function ConsumoList({
    consumos,
    setIsFormOpen,
    setCurrentConsumo,
    disableAddConsumo,
}: ConsumoListProps) {
    function handleItemClick(consumo: Consumo) {
        setIsFormOpen(true);
        setCurrentConsumo(consumo);
    }
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
                    onClick={() => setIsFormOpen(true)}
                    disabled={disableAddConsumo}
                />
            </div>
            <div className="flex flex-col gap-2 py-4">
                {consumos.map((consumo) => (
                    <ConsumoItem
                        key={consumo.id}
                        consumo={consumo}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    );
}
