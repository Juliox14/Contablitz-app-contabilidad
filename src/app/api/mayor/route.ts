import { NextResponse } from 'next/server';
import connectionDb from '../../../../database/config';

export async function GET(req: Request) {
    try {

        const sql = await connectionDb();
        const empresas = await sql`
            SELECT 
    ec.id_cuenta,
    cc.nombre,
    json_agg(
        json_build_object(
            'numero_transaccion', t.numero,
            'tipo_transaccion', t.tipo_transaccion,
            'fecha', t.fecha,
            'debe', mc.debe,
            'haber', mc.haber
        ) ORDER BY t.numero
    ) AS movimientos
FROM 
    empresa_cuentas ec
JOIN 
    movimientos_cuentas mc ON ec.id_cuenta = mc.id_cuenta
JOIN 
    transacciones t ON mc.id_transaccion = t.id_transaccion
JOIN 
    catalogo_cuentas cc ON ec.id_cuenta_cat = cc.id_cuenta_cat
WHERE 
    ec.id_empresa = 10 
GROUP BY 
    ec.id_cuenta, cc.nombre
ORDER BY 
    ec.id_cuenta;
        `;


        return NextResponse.json(empresas, { status: 200 });

    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al obtener las cuentas de la empresa" }, { status: 500 });
    }
}
