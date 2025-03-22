import { NextRequest } from "next/server";
import connectionDb from "../../../../../database/config";

export const POST = async (req: NextRequest) => {
    const { transaccion, detallesCompra, cuentasAfectadas, idEmpresa } = await req.json();
    const sql = await connectionDb();

    console.log("cuentasAfectadas", cuentasAfectadas);

    if (!cuentasAfectadas || !detallesCompra || !transaccion || !idEmpresa) {
        return new Response(JSON.stringify({ message: "El tipo de asiento y las cuentas son obligatorios" }), { status: 400 });
    }

    try {

        const [transaccionRegistrada] = await sql`
            INSERT INTO transacciones (id_empresa, tipo_transaccion, fecha, descripcion) 
            VALUES (${idEmpresa}, ${transaccion.tipo}, ${transaccion.fecha}, ${transaccion.descripcion}) 
            RETURNING id_transaccion
        `;

        if (!transaccionRegistrada) {
            return new Response(JSON.stringify({ message: "Error al registrar la transacción" }), { status: 500 });
        }
        const idTransaccion = transaccionRegistrada.id_transaccion;

        for (const cuenta of cuentasAfectadas) {
            let idCuenta = 0;
            const [cuentaExistente] = await sql`
                SELECT id_cuenta FROM empresa_cuentas
                WHERE id_empresa = ${idEmpresa} AND id_cuenta_cat = ${cuenta.id_cuenta_cat}
            `;

            if (cuentaExistente) {
                idCuenta = cuentaExistente.id_cuenta;
            }
            else {
                const [nuevaCuenta] = await sql`
                    INSERT INTO empresa_cuentas (id_empresa, id_cuenta_cat, saldo, fecha_creacion) 
                    VALUES (${idEmpresa}, ${cuenta.id_cuenta_cat}, 0, NOW())
                    RETURNING id_cuenta
                `;

                if (!nuevaCuenta) {
                    return new Response(JSON.stringify({ message: "Error al registrar la cuenta" }), { status: 500 });
                }

                idCuenta = nuevaCuenta.id_cuenta;
            }

            console.log("Todos los valores que se insertan en la tabla movimientos_cuentas", {
                idTransaccion,
                idCuenta,
                debe: cuenta.debe,
                haber: cuenta.haber,
            }
            )
            await sql`
                INSERT INTO movimientos_cuentas (id_transaccion, id_cuenta, debe, haber)
                VALUES (${idTransaccion}, ${idCuenta}, ${cuenta.debe}, ${cuenta.haber})
            `;
        }
        return new Response(JSON.stringify({ message: "Transacción registrada correctamente" }), { status: 200 });

    } catch (error) {
        console.error("Error al registrar cuentas:", error);
        return new Response(JSON.stringify({ message: "Error en el servidor" }), { status: 500 });
    }
};
