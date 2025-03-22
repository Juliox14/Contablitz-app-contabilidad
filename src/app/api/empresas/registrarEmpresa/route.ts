import { NextRequest } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function POST(req: NextRequest) {
    try {
        const { empresa } = await req.json();
        if (!empresa) {
            return new Response(JSON.stringify({ message: "El nombre de la empresa es obligatorio" }), { status: 400 });
        }

        const sql = await connectionDb();

        // Verificar si la empresa ya existe
        const [existingEmpresa] = await sql`SELECT * FROM empresas WHERE nombre = ${empresa}`;
        if (existingEmpresa) {
            return new Response(JSON.stringify({ message: "La empresa ya existe" }), { status: 400 });
        }
        // Insertar la empresa en la tabla de empresas y obtener el ID
        const [result] = await sql`INSERT INTO empresas (nombre) VALUES (${empresa}) RETURNING id_empresa`;
        const idEmpresa = result.id_empresa;

        return new Response(JSON.stringify({ message: "Empresa registrada correctamente" , idEmpresa }), { status: 201 });
    } catch (error) {
        console.error("Error en la API:", error);
        return new Response(JSON.stringify({ message: "Error al registrar la empresa" }), { status: 500 });
    }
}
