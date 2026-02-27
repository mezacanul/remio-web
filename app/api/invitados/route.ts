import { CuentaModel } from "@/backend/lib/models/Cuenta";
import dbConnect from "@/backend/lib/db";
import { Invitado } from "@/types/base";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body: Invitado & {
        cuentaID: string;
    } = await request.json();
    const { cuentaID, nombre, consumo } = body;
    await dbConnect();

    const cuenta = await CuentaModel.findById(cuentaID);
    cuenta.invitados.push({
        nombre: nombre,
        consumo,
    });

    await cuenta.save();

    // Get the just-created invitado (last in array)
    const nuevoInvitado =
        cuenta.invitados[cuenta.invitados.length - 1];

    return NextResponse.json(nuevoInvitado);
}