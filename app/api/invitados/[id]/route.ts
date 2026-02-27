import dbConnect from "@/backend/lib/db";
import { CuentaModel } from "@/backend/lib/models/Cuenta";
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
