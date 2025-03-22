import { NextResponse } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function GET(req: NextResponse) {
    try {
        const sql = await connectionDb();
        const cuentas = await sql`SELECT * FROM Catalogo_cuentas`;
        return NextResponse.json(cuentas, { status: 200 });
    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al obtener el catalogo de cuentas" }, { status: 500 });
    }
}