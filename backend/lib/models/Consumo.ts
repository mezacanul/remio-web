import mongoose, { Schema } from "mongoose";
import { Consumo } from "@/types/base";

const ConsumoSchema = new Schema<Consumo>(
    {
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
    }
);

export { ConsumoSchema };
