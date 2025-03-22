import { formatearNumero } from "@/utils/formateador";
import axios from "axios";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";


export interface TablaComprasProps {
    detallesCompra: Compra;
    cuentasAfectadas: CuentaAfectada[];
    cuentaSeleccionada: CuentaAfectada;
}
export const TablaCompras = ({ detallesCompra, cuentasAfectadas, cuentaSeleccionada }: TablaComprasProps) => {


    return (
        <div>
            <div className="flex justify-center items-center p-4 relative">
                <h2 className="text-2xl font-semibold text-center">Detalle de la Compra</h2>

            </div>
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center">
                <div className="w-full flex justify-center">
                    <table className="border-collapse border border-gray-300 mb-4">
                        <thead>
                            <tr className="bg-gray-100">
                                <th colSpan={2} className="border border-gray-300 p-2">DESGLOSE</th>
                            </tr>


                            <tr>
                                <th className="border border-gray-300 p-2">Compra</th>
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

                        {cuentaSeleccionada.codigo !== 0 && (
                            <tr >
                                <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.codigo}</td>
                                <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.nombre}</td>
                                <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuentaSeleccionada.debe))}</td>
                                <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuentaSeleccionada.haber))}</td>
                                <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.tipo}</td>
                            </tr>
                        )}

                        {cuentasAfectadas.length === 0 && !cuentaSeleccionada.codigo && (
                            <tr>
                                <td colSpan={5} className="border border-gray-300 text-center p-2">No hay cuentas a afectar</td>
                            </tr>
                        )}
                    </tbody>
                </table>


            </div>
        </div>
    )
}


export default TablaCompras;