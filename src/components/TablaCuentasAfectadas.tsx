import { CuentaAfectada } from "@/interfaces/cuenta";
import { formatearNumero } from "@/utils/formateador";


interface TablaCuentasAfectadasProps {
    cuentasAfectadas: CuentaAfectada[];
    cuentaSeleccionada?: CuentaAfectada;
}

const TablaCuentasAfectadas = ({ cuentasAfectadas, cuentaSeleccionada }: TablaCuentasAfectadasProps) => {
    return (
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

            {cuentasAfectadas.length > 0 || cuentaSeleccionada?.codigo ? (
                <tbody>
                    {cuentaSeleccionada?.codigo && (
                        <tr>
                            <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.codigo}</td>
                            <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.nombre}</td>
                            <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuentaSeleccionada.debe))}</td>
                            <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuentaSeleccionada.haber))}</td>
                            <td className="border border-gray-300 text-center p-2">{cuentaSeleccionada.tipo}</td>
                        </tr>
                    )}
                    {cuentasAfectadas.map((cuenta, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 text-center p-2">{cuenta.codigo}</td>
                            <td className="border border-gray-300 text-center p-2">{cuenta.nombre}</td>
                            <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuenta.debe))}</td>
                            <td className="border border-gray-300 text-center p-2">{formatearNumero(Number(cuenta.haber))}</td>
                            <td className="border border-gray-300 text-center p-2">{cuenta.tipo}</td>
                        </tr>
                    ))}

                </tbody>
            ) : (
                <tbody className="bg-gray-50">
                    <tr>
                        <td colSpan={5} className="border border-gray-300 text-center p-2">No hay cuentas a afectar</td>
                    </tr>
                </tbody>
            )}
        </table>

    )
}

export default TablaCuentasAfectadas;