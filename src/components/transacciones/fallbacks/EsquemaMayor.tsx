import Breadcrumb from "../../Breadcrumb";

const EsquemaMayorFallback = () => {
    return (
        <div className="w-full flex flex-col items-center p-6">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Esquemas de mayor", link: "/mayor" }]} titulo="Esquemas de mayor" />
            {[...Array(3)].map((_, index) => (
                <div key={index} className="mb-6 border border-gray-400 p-4 rounded w-[600px]">
                    {/* Placeholder para el nombre de la cuenta */}
                    <div className="text-md font-semibold bg-gray-200 p-2 animate-pulse rounded">
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                    <table className="w-full border-collapse border border-gray-500 text-gray-900 mt-4">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/6">#</th>
                                <th className="p-2 border border-gray-500 w-5/12">Debe</th>
                                <th className="p-2 border border-gray-500 w-5/12">Haber</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Placeholder para 3 movimientos */}
                            {[...Array(3)].map((_, i) => (
                                <tr key={i} className="border border-gray-500">
                                    <td className="p-2 border border-gray-500 text-center">
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                    </td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                    </td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-300 font-bold">
                                <td className="p-2 border border-gray-500 text-center">Total</td>
                                <td className="p-2 border border-gray-500 text-right">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                </td>
                                <td className="p-2 border border-gray-500 text-right">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                </td>
                            </tr>
                            <tr className="font-bold">
                                <td colSpan={3} className="p-2 border border-gray-500 text-center">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default EsquemaMayorFallback;