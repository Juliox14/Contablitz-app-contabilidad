import Breadcrumb from "../../Breadcrumb";

const BalanzaComprobacionFallback = () => {
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
                    {/* Placeholder para 5 filas de datos */}
                    {[...Array(20)].map((_, index) => (
                        <tr key={index} className="border border-gray-500">
                            <td className="p-2 border border-gray-500 text-center">
                                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                            </td>
                            <td className="p-2 border border-gray-500 text-right">
                                <div className="h-10 bg-gray-200 animate-pulse rounded"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-200">
                        <td className="p-2 border border-gray-500 text-center font-bold">Totales</td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        </td>
                        <td className="p-2 border border-gray-500 text-right font-bold">
                            <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default BalanzaComprobacionFallback;