import { use } from 'react';
import { formatearNumero } from '@/utils/formateador';
import Breadcrumb from '../Breadcrumb';

interface ResumenCuenta {
    nombre: string;
    totalDebe: number;
    totalHaber: number;
    saldoDeudor: number;
    saldoAcreedor: number;
}


interface BalanzaComprobacionProps {
    transaccionesPromise: Promise<ResumenCuenta[]>;
}

export const BalanzaComprobacion = ({ transaccionesPromise }: BalanzaComprobacionProps) => {
    const transacciones = use(transaccionesPromise);
    return (
        <div className="overflow-x-auto p-12 bg-white rounded-lg shadow-md">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Balanza de comprobación", link: "/generar_balanza" }]} titulo="Balanza de comprobación" />
            <table className="w-full border-collapse border border-gray-500 text-gray-900">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border border-gray-500">Nombre</th>
                        <th className="p-2 border border-gray-500">Total Debe</th>
                        <th className="p-2 border border-gray-500">Total Haber</th>
                        <th className="p-2 border border-gray-500">Saldo Deudor</th>
                        <th className="p-2 border border-gray-500">Saldo Acreedor</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.map((transaccion, index) => (
                        <tr key={index} className="border border-gray-500">
                            <td className="p-2 border border-gray-500 text-center">
                                {transaccion.nombre}
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                {formatearNumero(transaccion.totalDebe)}
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                {formatearNumero(transaccion.totalHaber)}
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                {formatearNumero(transaccion.saldoDeudor)}
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                {formatearNumero(transaccion.saldoAcreedor)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-200">
                        <td className="p-2 border border-gray-500 text-center font-bold">Totales</td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            {formatearNumero(transacciones.reduce((acc, transaccion) => acc + transaccion.totalDebe, 0))}
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            {formatearNumero(transacciones.reduce((acc, transaccion) => acc + transaccion.totalHaber, 0))}
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            {formatearNumero(transacciones.reduce((acc, transaccion) => acc + transaccion.saldoDeudor, 0))}
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            {formatearNumero(transacciones.reduce((acc, transaccion) => acc + transaccion.saldoAcreedor, 0))}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
export default BalanzaComprobacion;