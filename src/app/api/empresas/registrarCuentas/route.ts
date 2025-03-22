import { NextRequest } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function POST(req: NextRequest) {
    try {
        const { idEmpresa, cuentas, tipoAsiento, fecha, descripcion } = await req.json();
        
        if (!idEmpresa || !cuentas) {
            return new Response(JSON.stringify({ message: "El ID de la empresa y las cuentas son obligatorios" }), { status: 400 });
        }
        const sql = await connectionDb();

        const [result] = await sql`INSERT INTO transacciones (id_empresa, tipo_transaccion, fecha, descripcion) VALUES (${idEmpresa}, ${tipoAsiento}, ${fecha}, ${descripcion}) RETURNING id_transaccion`;
        const idTransaccion = result.id_transaccion;
        console.log("ID Transaccion:", idTransaccion);

        for (const cuenta of cuentas) {
            const [nuevaCuenta] = await sql`
                INSERT INTO empresa_cuentas (id_empresa, id_cuenta_cat, saldo, fecha_creacion) 
                VALUES (${idEmpresa}, ${cuenta.id}, ${Number(cuenta.debe) + Number(cuenta.haber)}, ${fecha})
                RETURNING id_cuenta
            `;
        
            const idEmpresaCuenta = nuevaCuenta.id_cuenta; // ID generado
        
            await sql`
                INSERT INTO movimientos_cuentas (id_transaccion, id_cuenta, debe, haber) 
                VALUES (${idTransaccion}, ${idEmpresaCuenta}, ${Number(cuenta.debe)}, ${cuenta.haber})
            `;
        }


        return new Response(JSON.stringify({ message: "Cuentas registradas correctamente" }), { status: 201 });
    }
    catch (error) {
        console.error("Error en la API:", error);
        return new Response(JSON.stringify({ message: "Error al registrar las cuentas" }), { status: 500 });
    }
}