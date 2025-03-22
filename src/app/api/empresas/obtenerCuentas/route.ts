import { NextResponse } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id_empresa = searchParams.get("id_empresa");

        if (!id_empresa) {
            return NextResponse.json({ message: "Falta id_empresa en la consulta" }, { status: 400 });
        }

        const sql = await connectionDb();
        const empresas = await sql`SELECT * FROM empresa_cuentas_view WHERE id_empresa = ${id_empresa}`;

        return NextResponse.json(empresas, { status: 200 });

    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al obtener las cuentas de la empresa" }, { status: 500 });
    }
}
