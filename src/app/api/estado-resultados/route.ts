// /app/api/estado-resultados/route.ts
import { NextResponse } from 'next/server';
import connectionDb from '../../../../database/config';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id_empresa = searchParams.get("id_empresa");

        if (!id_empresa) {
            return NextResponse.json({ message: "Falta el parámetro id_empresa" }, { status: 400 });
        }

        const sql = await connectionDb();

        const resultados = await sql`
      WITH cuentas_requeridas AS (
        SELECT unnest(ARRAY[
          'Ventas',
          'Devoluciones sobre ventas',
          'Rebajas sobre ventas',
          'Descuentos sobre ventas',
          'Compras',
          'Gastos de compras',
          'Descuentos sobre compras',
          'Devoluciones sobre compras',
          'Rebajas sobre compras',
          'Inventario inicial',
          'Gastos de operación'
        ]) AS nombre
      )
      SELECT 
        cr.nombre,
        COALESCE(ec.saldo, 0) AS saldo
      FROM cuentas_requeridas cr
      LEFT JOIN catalogo_cuentas cc ON cr.nombre = cc.nombre
      LEFT JOIN empresa_cuentas ec ON cc.id_cuenta_cat = ec.id_cuenta_cat AND ec.id_empresa = ${id_empresa}
      ORDER BY cr.nombre;
    `;

        // Mapear los resultados para acceder fácil por nombre
        const saldos: Record<string, number> = {};
        resultados.forEach(({ nombre, saldo }) => {
            saldos[nombre] = parseFloat(saldo);
        });

        // Cálculos
        const ventasTotales = saldos["Ventas"];
        const sumaVentas = saldos["Devoluciones sobre ventas"] + saldos["Rebajas sobre ventas"] + saldos["Descuentos sobre ventas"];
        const ventasNetas = ventasTotales - sumaVentas;

        const comprasTotales = saldos["Compras"] + saldos["Gastos de compras"];
        const sumaCompras = saldos["Devoluciones sobre compras"] + saldos["Rebajas sobre compras"] + saldos["Descuentos sobre compras"];
        const comprasNetas = comprasTotales - sumaCompras;

        const totalMercancias = comprasNetas + saldos["Inventario inicial"];
        const inventarioFinal = totalMercancias * 0.03;
        const costoVentas = totalMercancias - inventarioFinal;

        const diferencia = ventasNetas - costoVentas;

        const utilidadBruta = diferencia > 0 ? diferencia : 0;
        const perdidaBruta = diferencia < 0 ? Math.abs(diferencia) : 0;

        const gastosOperacion = saldos["Gastos de operación"];

        const utilidadOperacion = utilidadBruta > 0 ? utilidadBruta - gastosOperacion : 0;
        const perdidaOperacion = perdidaBruta > 0 ? perdidaBruta - gastosOperacion : 0;

        return NextResponse.json({
            resultadosOriginales: resultados,
            ventasTotales,
            sumaVentas,
            ventasNetas,
            comprasTotales,
            sumaCompras,
            comprasNetas,
            totalMercancias,
            inventarioFinal,
            costoVentas,
            utilidadBruta,
            perdidaBruta,
            utilidadOperacion,
            perdidaOperacion
        }, { status: 200 });


    } catch (error) {
        console.error("Error en la API:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
