'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatearNumero } from '@/utils/formateador';

interface ResumenCuenta {
    nombre: string;
    totalDebe: number;
    totalHaber: number;
    saldoDeudor: number;
    saldoAcreedor: number;
}

export const BalanzaComprobacion = () => {
    const [transacciones, setTransacciones] = useState<ResumenCuenta[]>([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/api/balanza');
                setTransacciones(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, []);
    return (
        <div className="overflow-x-auto p-12 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Balanza de Comprobación</h1>
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