'use client';

import React, { useEffect, useState } from 'react';

interface EstadoResultadosProps {
    id_empresa: number;
}

interface ResultadoOriginal {
    nombre: string;
    saldo: number;
}

interface DatosEstadoResultados {
    ventasTotales: number;
    resultadosOriginales: ResultadoOriginal[];
    ventasNetas: number;
    comprasTotales: number;
    comprasNetas: number;
    sumaCompras: number;
    sumaVentas: number;
    totalMercancias: number;
    inventarioInicial: number;
    inventarioFinal: number;
    costoVentas: number;
    utilidadBruta: number;
    perdidaBruta: number;
    utilidadOperacion: number;
    perdidaOperacion: number;
}

const EstadoResultados = ({ id_empresa }: EstadoResultadosProps) => {
    const [datos, setDatos] = useState<DatosEstadoResultados | null>(null);

    useEffect(() => {
        fetch(`/api/estado-resultados?id_empresa=${id_empresa}`)
            .then(res => res.json())
            .then(data => setDatos(data))
            .catch(console.error);
    }, [id_empresa]);

    if (!datos) {
        return <p className="text-gray-500">Cargando estado de resultados...</p>;
    }

    const F = (n: number) =>
        n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    const S = (name: string) => {
        const datosFind = datos.resultadosOriginales.find(r => r.nombre === name)?.saldo || 0
        return F(Number(datosFind))
    }

    return (
        <div className="overflow-x-auto p-4 bg-gray-100 rounded-lg shadow h-full">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">
                Estado de Resultados al 22 de abril de 2025
            </h2>
            <table className="table-fixed w-full border-collapse border border-gray-500 text-gray-900">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th colSpan={8} className="p-2 border border-gray-500">
                            Neuronix, SA de CV (Sucursal)
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {/* Ventas totales */}
                    <tr>
                        <td className="p-2 border border-gray-200">Ventas totales</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right" > {F(datos.ventasTotales)}</td>
                        <td className="p-2 border border-gray-200 text-right" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Devoluciones sobre ventas */}
                    <tr>
                        <td className="p-2 border border-gray-200">Devoluciones sobre ventas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right" > {S('Devoluciones sobre ventas')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Rebajas sobre ventas */}
                    <tr>
                        <td className="p-2 border border-gray-200">Rebajas sobre ventas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{S('Rebajas sobre ventas')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Descuentos sobre ventas */}
                    <tr>
                        <td className="p-2 border border-gray-200">Descuentos sobre ventas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{S('Descuentos sobre ventas')}</td>
                        <td className="p-2 border border-gray-200 text-right">{F(datos.sumaVentas)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    <tr>
                        <td className="p-2 border border-gray-200 font-bold">Ventas Netas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right"></td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{F(datos.ventasNetas)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Compras */}
                    <tr>
                        <td className="p-2 border border-gray-200">Compras</td>
                        <td className="p-2 border border-gray-200 text-right">{S('Compras')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Gastos de compras</td>
                        <td className="p-2 border border-gray-200 text-right">{S('Gastos de compras')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Compras totales</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{F(datos.comprasTotales)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Descuentos sobre compras</td>
                        <td className="p-2 border border-gray-200 text-right">{S('Descuentos sobre compras')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Devoluciones sobre compras</td>
                        <td className="p-2 border border-gray-200 text-right">{S('Devoluciones sobre compras')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Rebajas sobre compras</td>
                        <td className="p-2 border border-gray-200 text-right">{S('Rebajas sobre compras')}</td>
                        <td className="p-2 border border-gray-200 text-right">{F(datos.sumaCompras)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    <tr>
                        <td className="p-2 border border-gray-200 font-bold">Compras Netas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right"></td>
                        <td className="p-2 border border-gray-200 text-right">{F(datos.comprasNetas)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Inventarios y costo */}
                    <tr>
                        <td className="p-2 border border-gray-200">Inventario inicial</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{S('Inventario inicial')}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200 font-bold">Total de mercancías</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{F(datos.totalMercancias)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Inventario final</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{F(datos.inventarioFinal)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200 font-bold">Costo de ventas</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{F(datos.costoVentas)}</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                    </tr>

                    {/* Resultado */}
                    <tr>
                        <td className="p-2 border border-gray-200">
                            {datos.utilidadBruta > 0 ? 'Utilidad bruta' : 'Pérdida bruta'}
                        </td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">
                            {F(datos.utilidadBruta || datos.perdidaBruta)}
                        </td>
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">Gastos de operación</td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">{S('Gastos de operación')}</td>
                        <td className="p-2 border border-gray-200" />
                    </tr>
                    <tr>
                        <td className="p-2 border border-gray-200">
                            {datos.utilidadOperacion > 0 ? 'Utilidad de operación' : 'Pérdida de operación'}
                        </td>
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200" />
                        <td className="p-2 border border-gray-200 text-right">
                            {F(datos.utilidadOperacion || datos.perdidaOperacion)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default EstadoResultados;
