import mongoose, { Schema, models, model } from "mongoose";
import { Cuenta } from "@/types/base";
import { generateShareCode } from "@/backend/utils/main";
import { InvitadoSchema } from "./Invitado";
import { ConsumoSchema } from "./Consumo";

const CuentaSchema = new Schema<Cuenta>(
    {
        nombre: { type: String, required: true },
        userId: { type: String, required: true },
        invitados: [InvitadoSchema], // Nested array of invitados
        sharedConsumos: [ConsumoSchema], // Nested array of consumos compartidos
        codigo: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true, strict: "throw" }
); // Automatically adds createdAt and updatedAt

CuentaSchema.pre("save", async function (this: any) {
    if (!this.isNew) return;
    if (!this.codigo) {
        let isUnique = false;
        const CuentaModel = this
            .constructor as mongoose.Model<any>;

        try {
            while (!isUnique) {
                const newCode = generateShareCode(6);
                // Use the internal 'this.constructor' to query the collection
                const existing = await CuentaModel.findOne({
                    codigo: newCode,
                });
                if (!existing) {
                    this.codigo = newCode;
                    isUnique = true;
                }
            }
        } catch (err: any) {
            throw new Error(err);
        }
    }
});

export const CuentaModel =
    models.Cuenta ||
    model<Cuenta>("Cuenta", CuentaSchema, "cuentas");
