'use client';

import { useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import { formatearNumero } from '@/utils/formateador';
import Breadcrumb from './Breadcrumb';
import { obtenerCookieEmpresa } from '@/utils/obtenerCookie';

interface MovimientoCuenta {
    nombre: string;
    debe: number;
    haber: number;
}



interface Transaccion_diario {
    id_transaccion: number;
    tipo_transaccion: string;
    fecha_transaccion: string;
    movimientos_cuentas: MovimientoCuenta[];
}

interface LibroDiarioProps {
    id_empresa: number;
}

const LibroDiario = ({id_empresa}: LibroDiarioProps) => {
    const [transacciones, setTransacciones] = useState<Transaccion_diario[]>([]);

    

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await axios.get('/api/empresas/diario', {
                    params: { id_empresa}
                });
                setTransacciones(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        obtenerDatos();
    }, []);

    const totalDebe = transacciones.reduce((acc, transaccion) => {
        return acc + transaccion.movimientos_cuentas.reduce((sum, movimiento) => sum + movimiento.debe, 0);
    }, 0);

    const totalHaber = transacciones.reduce((acc, transaccion) => {
        return acc + transaccion.movimientos_cuentas.reduce((sum, movimiento) => sum + movimiento.haber, 0);
    }, 0);


    return (
        <div className="overflow-x-auto p-12 bg-white rounded-lg shadow-md">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Libro Diario", link: "/libro_diario" }]} titulo="Libro Diario" />

            <table className="w-full border-collapse border border-gray-500 text-gray-900 h-full">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border border-gray-500">#</th>
                        <th className="p-2 border border-gray-500">Fecha</th>
                        <th className="p-2 border border-gray-500">Cuentas</th>
                        <th className="p-2 border border-gray-500">Debe</th>
                        <th className="p-2 border border-gray-500">Haber</th>
                    </tr>
                </thead>
                <tbody>
                    {transacciones.map((transaccion, index) => (
                        <React.Fragment key={transaccion.id_transaccion}>
                            {transaccion.movimientos_cuentas.map((movimiento, i) => (
                                <tr key={`${transaccion.id_transaccion}-${i}`} className="border border-gray-500">
                                    {i === 0 && (
                                        <td rowSpan={transaccion.movimientos_cuentas.length} className="p-2 border border-gray-500 text-center">
                                            {index + 1}
                                        </td>
                                    )}
                                    {i === 0 && (
                                        <td rowSpan={transaccion.movimientos_cuentas.length} className="p-2 border border-gray-500 text-center">
                                            {transaccion.fecha_transaccion}
                                        </td>
                                    )}
                                    <td className="p-2 border border-gray-500">{movimiento.nombre}</td>
                                    <td className="p-2 border border-gray-500 text-right">{formatearNumero(movimiento.debe)}</td>
                                    <td className="p-2 border border-gray-500 text-right">{formatearNumero(movimiento.haber)}</td>
                                </tr>
                            ))}
                            <tr className="bg-[#E0E0E0]" key={`${transaccion.id_transaccion}-footer`}>
                                <td colSpan={5} className="p-2 text-center font-bold">{transaccion.tipo_transaccion}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-300 font-bold">
                        <td colSpan={3} className="p-2 border border-gray-500 text-center">Totales:</td>
                        <td className="p-2 border border-gray-500 text-right">{formatearNumero(totalDebe)}</td>
                        <td className="p-2 border border-gray-500 text-right">{formatearNumero(totalHaber)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default LibroDiario;

