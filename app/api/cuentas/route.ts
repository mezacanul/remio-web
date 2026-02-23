import { NextResponse } from "next/server";
import dbConnect from "@/backend/lib/db";
import { CuentaModel } from "@/backend/lib/models/Cuenta";
import { Cuenta } from "@/types/base";

// Get all cuentas
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        if (!userId) {
            return NextResponse.json(
                {
                    message: "User ID is required",
                },
                { status: 400 }
            );
        }

        await dbConnect();
        // 2. Get all cuentas
        const cuentas = await CuentaModel.find({
            userId,
        }).sort({
            createdAt: -1,
        });
        // 3. Return the response
        return NextResponse.json(cuentas, {
            status: 200,
        });
    } catch (error: any) {
        console.error("GET /api/cuentas error:", error);

        return NextResponse.json(
            {
                message: "Error retrieving cuentas",
                error: error.message,
            },
            { status: 400 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body: Cuenta = await request.json(); // Base type from frontend

        // Mongoose handles the conversion from Base -> Document
        const newCuenta = new CuentaModel(body);
        const saved = await newCuenta.save();

        return NextResponse.json(saved, { status: 201 });
    } catch (error: any) {
        console.error("POST /api/cuentas error:", error);

        return NextResponse.json(
            {
                message: "Error creating cuenta",
                error: error.message,
            },
            { status: 400 }
        );
    }
}
