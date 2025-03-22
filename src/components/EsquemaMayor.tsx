'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { formatearNumero } from '@/utils/formateador';

interface MovimientoCuenta {
    numero_transaccion: number;
    fecha: string;
    debe: number;
    haber: number;
}

interface CuentaMayor {
    nombre: string;
    movimientos: MovimientoCuenta[];
}

const EsquemaMayor = () => {
    const [cuentas, setCuentas] = useState<CuentaMayor[]>([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/api/mayor');
                setCuentas(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, []);

    return (
        <div className="w-full flex flex-col items-center p-6">
            <h2 className="text-lg font-bold mb-4">Esquema de Mayor</h2>
            {cuentas.map((cuenta, index) => {
                const totalDebe = cuenta.movimientos.reduce((acc, mov) => acc + mov.debe, 0);
                const totalHaber = cuenta.movimientos.reduce((acc, mov) => acc + mov.haber, 0);
                const saldo = totalDebe - totalHaber;

                return (
                    <div key={index} className="mb-6 border border-gray-400 p-4 rounded w-[600px]">
                        <h3 className="text-md font-semibold bg-gray-200 p-2">{cuenta.nombre}</h3>
                        <table className="w-full border-collapse border border-gray-500 text-gray-900">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-2 border border-gray-500 w-1/6">#</th>
                                    <th className="p-2 border border-gray-500 w-5/12">Debe</th>
                                    <th className="p-2 border border-gray-500 w-5/12">Haber</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuenta.movimientos.map((mov, i) => (
                                    <tr key={i} className="border border-gray-500">
                                        <td className="p-2 border border-gray-500 text-center">
                                            {mov.numero_transaccion}
                                        </td>
                                        <td className="p-2 border border-gray-500 text-right">
                                            {mov.debe > 0 ? formatearNumero(mov.debe) : ""}
                                        </td>
                                        <td className="p-2 border border-gray-500 text-right">
                                            {mov.haber > 0 ? formatearNumero(mov.haber) : ""}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-300 font-bold">
                                    <td className="p-2 border border-gray-500 text-center">Total</td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        {formatearNumero(totalDebe)}
                                    </td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        {formatearNumero(totalHaber)}
                                    </td>
                                </tr>
                                <tr className="font-bold">
                                    <td colSpan={3} className={`p-2 border border-gray-500 text-center ${saldo > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {saldo > 0 ? `Saldo deudor: ${formatearNumero(saldo)}` : `Saldo acreedor: ${formatearNumero(Math.abs(saldo))}`}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                );
            })}
        </div>
    );
};

export default EsquemaMayor;
