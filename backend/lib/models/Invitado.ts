import mongoose, { Schema } from "mongoose";
import { Invitado } from "@/types/base";
import { ConsumoSchema } from "./Consumo";

// Sub-schema for Invitado
const InvitadoSchema = new Schema<Invitado>({
    nombre: { type: String, required: true },
    consumo: [ConsumoSchema], // Nested array of consumos
});

InvitadoSchema.virtual("total").get(function (this: any) {
    if (this.consumo.length === 0) return 0;

    return this.consumo.reduce(
        (acc: number, curr: any) =>
            acc + curr.precio * curr.cantidad,
        0
    );
});

InvitadoSchema.set("toJSON", {
    virtuals: true,
});
InvitadoSchema.set("toObject", {
    virtuals: true,
});

export { InvitadoSchema };
