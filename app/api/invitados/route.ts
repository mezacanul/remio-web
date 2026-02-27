import { CuentaModel } from "@/backend/lib/models/Cuenta";
import { Invitado } from "@/types/base";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
    const body: Invitado & {
        cuentaID: string;
    } = await request.json();
    const { cuentaID, nombre, consumo } = body;

    const nombreInvitado =
        nombre == "" ? "Invitado" : nombre;

    const updatedCuenta =
        await CuentaModel.findByIdAndUpdate(
            cuentaID,
            {
                $push: {
                    invitados: {
                        nombre: nombreInvitado,
                        consumo,
                    },
                },
            },
            { returnDocument: "after" }
        );

    return NextResponse.json(updatedCuenta);
}

export async function PUT(request: Request) {
    const body: Invitado & {
        cuentaID: string;
        invitadoID: string;
    } = await request.json();

    const { cuentaID, invitadoID, nombre, consumo } = body;

    const cuenta = await CuentaModel.findById(cuentaID);
    const invitado = cuenta.invitados.id(invitadoID); // Mongoose helper to find subdoc by ID

    if (invitado) {
        invitado.nombre = nombre;
        invitado.consumo = consumo; // Mongoose will handle the ID generation for new items here
        await cuenta.save();
    }

    return NextResponse.json(invitado);
}
