import { NextResponse } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function GET(req: NextResponse) {
    try {
        const sql = await connectionDb();
        const empresas = await sql`SELECT * FROM empresas`;
        return NextResponse.json(empresas, { status: 200 });
    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al obtener las empresas" }, { status: 500 });
    }
}
