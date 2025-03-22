import { NextResponse } from 'next/server';
interface Movimiento {
    numero_transaccion: number;
    tipo_transaccion: string;
    fecha: string;
    debe: number;
    haber: number;
}

interface Cuenta {
    id_cuenta: number;
    nombre: string;
    movimientos: Movimiento[];
}

interface ResumenCuenta {
    nombre: string;
    totalDebe: number;
    totalHaber: number;
    saldoDeudor: number;
    saldoAcreedor: number;
}

export async function GET(req: Request, res: Response) {
    try {
        const response = await fetch('http://localhost:3000/api/mayor');
        if (!response.ok) {
            throw new Error('Error al obtener las cuentas de la empresa');
        }
        const cuentas: Cuenta[] = await response.json();

        const resumen: ResumenCuenta[] = cuentas.map((cuenta) => {
            const totalDebe = cuenta.movimientos.reduce((sum, movimiento) => sum + movimiento.debe, 0);
            const totalHaber = cuenta.movimientos.reduce((sum, movimiento) => sum + movimiento.haber, 0);
            let saldoAcreedor = 0;
            let saldoDeudor = 0;
            if(totalDebe > totalHaber){
                saldoDeudor = totalDebe - totalHaber;
            }if(totalHaber > totalDebe){
                saldoAcreedor = totalHaber - totalDebe;
            }

            return {
                nombre: cuenta.nombre,
                totalDebe,
                totalHaber,
                saldoDeudor,
                saldoAcreedor,
            };
        });

        return NextResponse.json(resumen, { status: 200});

    } catch (error) {
        console.error('Error al procesar los datos:', error);
        return NextResponse.json({ message: 'Error al obtener los datos' }, { status: 500 });
    }
}