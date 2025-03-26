import { formatearNumero } from "@/utils/formateador";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";


export interface TablaComprasProps {
    detallesCompra: Compra;
    cuentasAfectadas: CuentaAfectada[];
    porcentajeAnticipo?: number;
    mesesAnticipo?: number;
}
export const TablaAnticipo = ({ detallesCompra, cuentasAfectadas, porcentajeAnticipo }: TablaComprasProps) => {


    return (
        <div>
            <div className="flex justify-center items-center p-4 relative">
                <h2 className="text-2xl font-semibold text-center">Detalle del anticipo</h2>

            </div>
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center">
                <div className="w-full flex justify-center gap-4">
                    {porcentajeAnticipo !== undefined && (
                        <table className="border-collapse border border-gray-300 mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th colSpan={2} className="border border-gray-300 p-2">DESGLOSE DE LA VENTA</th>
                                </tr>


                                <tr>
                                    <th className="border border-gray-300 p-2">Venta</th>
                                    <th className="w-64 border border-gray-300 p-2"> $ </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Fila de la compra */}
                                <tr>
                                    <th className="border border-gray-300 p-2">Subtotal</th>
                                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.subtotal * (1/ (porcentajeAnticipo/100)))}</th>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 p-2">IVA (16%)</th>
                                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.iva * (1/(porcentajeAnticipo/100)))}</th>
                                </tr>
                                <tr>
                                    <th className="border border-gray-300 p-2">Total</th>
                                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.total * (1/(porcentajeAnticipo/100)))}</th>
                                </tr>
                            </tbody>
                        </table>
                    )}

                    <table className="border-collapse border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th colSpan={2} className="border border-gray-300 p-2">DESGLOSE DEL ANTICIPO</th>
                            </tr>


                            <tr>
                                <th className="border border-gray-300 p-2">Anticipo</th>
                                <th className="w-64 border border-gray-300 p-2"> $ </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Fila de la compra */}
                            <tr>
                                <th className="border border-gray-300 p-2">Subtotal</th>
                                <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.subtotal)}</th>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 p-2">IVA (16%)</th>
                                <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.iva)}</th>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 p-2">Total</th>
                                <th className="border w-64 border-gray-300 p-2">{formatearNumero(detallesCompra.total)}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Tabla de cuentas a afectar */}
                <h3 className="text-md font-semibold mt-4 mb-2">Cuentas a Afectar</h3>

                <table className="border-collapse border w-full border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Código</th>
                            <th className="border border-gray-300 p-2">Cuenta</th>
                            <th className="border border-gray-300 p-2">Debe</th>
                            <th className="border border-gray-300 p-2">Haber</th>
                            <th className="border border-gray-300 p-2">Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Fila de la cuenta */}
                        {cuentasAfectadas.map((cuenta, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 text-center p-2">{cuenta.codigo}</td>
                                <td className="border border-gray-300 text-center p-2">{cuenta.nombre}</td>
                                <td className="border border-gray-300 text-center p-2">{formatearNumero(cuenta.debe as number)}</td>
                                <td className="border border-gray-300 text-center p-2">{formatearNumero(cuenta.haber as number)}</td>
                                <td className="border border-gray-300 text-center p-2">{cuenta.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}


export default TablaAnticipo;