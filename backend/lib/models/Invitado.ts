import mongoose, { Schema } from "mongoose";
import { Invitado } from "@/types/base";
import { ConsumoSchema } from "./Consumo";

// Sub-schema for Invitado
const InvitadoSchema = new Schema<Invitado>({
    nombre: { type: String, required: true },
    consumo: [ConsumoSchema], // Nested array of consumos
});

export { InvitadoSchema };
