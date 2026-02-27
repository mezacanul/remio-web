// import { Consumo } from "@/src/types";
import { Consumo } from "@/types/base";
import Button from "../Common/Button";
import ConsumoItem from "./ConsumoItem";
import { useEffect } from "react";

interface ConsumoWithID extends Consumo {
    _id?: string;
}

type ConsumoListProps = {
    consumo: ConsumoWithID[];
    setIsFormOpen: (isFormOpen: boolean) => void;
    setCurrentConsumo: (consumo: ConsumoWithID) => void;
    disableAddConsumo: boolean;
};

export default function ConsumoList({
    consumo,
    setIsFormOpen,
    setCurrentConsumo,
    disableAddConsumo,
}: ConsumoListProps) {
    function handleItemClick(consumo: Consumo) {
        setIsFormOpen(true);
        setCurrentConsumo(consumo);
    }

    useEffect(() => {
        // console.log(consumo);
        
    }, [consumo]);
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
                {consumo.map((consumo, index) => (
                    <ConsumoItem
                        key={index}
                        consumo={consumo}
                        onClick={
                            () => {}
                            // handleItemClick
                        }
                    />
                ))}
            </div>
        </div>
    );
}
