import { NextResponse } from "next/server";
import dbConnect from "@/backend/lib/db";
import { CuentaModel } from "@/backend/lib/models/Cuenta";
import { CuentaJSON } from "@/types/frontend/json";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();
        // 2. Get all cuentas
        const cuenta = await CuentaModel.findOne({
            _id: id,
        });
        // 3. Return the response
        return NextResponse.json(cuenta, {
            status: 200,
        });
    } catch (error: any) {
        console.error(
            "GET /api/cuentas/[id] error:",
            error
        );

        return NextResponse.json(
            {
                message: "Error retrieving cuenta",
                error: error.message,
            },
            { status: 400 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const body: CuentaJSON = await request.json();
    const { id } = await params;

    // Use the ID from the URL to ensure security/consistency
    const updated = await CuentaModel.findByIdAndUpdate(
        id,
        body,
        { returnDocument: "after" }
    );

    return NextResponse.json(updated);
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;
    await CuentaModel.findByIdAndDelete(id);
    return NextResponse.json(
        { message: "Cuenta deleted successfully" },
        { status: 200 }
    );
}
