import { NextResponse } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function POST(req: NextResponse) {
    try {
        {/* Revisar si las cuentas ya existen en la base de datos */}
        const { idEmpresa, cuentas } = await req.json();
        const sql = await connectionDb();
        if (!idEmpresa || !cuentas) {
            return NextResponse.json({ message: "El ID de la empresa y las cuentas son obligatorios" }, { status: 400 });
        }

        for (const cuenta of cuentas) {
            const [cuentaExistente] = await sql`
                SELECT * FROM empresa_cuentas_view WHERE id_empresa = ${idEmpresa} AND codigo = ${cuenta.codigo}
            `;
            if (cuentaExistente) {
                return NextResponse.json({ message: "La cuenta ya existe" }, { status: 409 });
            }
        }
        return NextResponse.json({ message: "Las cuentas no existen" }, { status: 200 });
    }
    catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al verificar las cuentas" }, { status: 500 });
    }
}

    
        