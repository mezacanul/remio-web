import dbConnect from "@/backend/lib/db";
import { CuentaModel } from "@/backend/lib/models/Cuenta";
import { Invitado } from "@/types/base";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const cuentaID = searchParams.get("cuenta");

    const cuenta = await CuentaModel.findById(cuentaID);
    const invitado = cuenta.invitados.id(id);

    return NextResponse.json(invitado);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const cuentaID = searchParams.get("cuenta");

    const body: Invitado = await request.json();

    const { nombre, consumo } = body;

    const cuenta = await CuentaModel.findById(cuentaID);
    const invitado = cuenta.invitados.id(id); // Mongoose helper to find subdoc by ID

    if (invitado) {
        invitado.nombre = nombre;
        invitado.consumo = consumo; // Mongoose will handle the ID generation for new items here
        await cuenta.save();
    }

    return NextResponse.json(invitado);
}
