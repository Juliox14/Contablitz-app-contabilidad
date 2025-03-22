import { NextResponse } from 'next/server';
import connectionDb from '../../../../../database/config';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id_empresa = searchParams.get("id_empresa");
        console.log("ID empresa:", id_empresa);
        const sql = await connectionDb();
        const empresas = await sql`
            SELECT 
                json_agg(
                    json_build_object(
                        'id_transaccion', t.id_transaccion,
                        'tipo_transaccion', t.tipo_transaccion,
                        'fecha_transaccion', to_char(t.fecha, 'YY-MM-DD'),
                        'movimientos_cuentas', (
                            SELECT json_agg(
                                json_build_object(
                                    'nombre', cc.nombre,  
                                    'debe', mc.debe,
                                    'haber', mc.haber
                                )
                            )
                            FROM movimientos_cuentas mc
                            JOIN empresa_cuentas ec ON mc.id_cuenta = ec.id_cuenta
                            JOIN catalogo_cuentas cc ON ec.id_cuenta_cat = cc.id_cuenta_cat 
                            WHERE mc.id_transaccion = t.id_transaccion
                        )
                    )
                ) AS transacciones
            FROM transacciones t WHERE t.id_empresa = ${id_empresa};
        `;


        return NextResponse.json(empresas[0].transacciones, { status: 200 });

    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error al obtener las cuentas de la empresa" }, { status: 500 });
    }
}
