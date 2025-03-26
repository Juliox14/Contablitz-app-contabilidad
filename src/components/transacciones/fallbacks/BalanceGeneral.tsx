import Breadcrumb from "../../Breadcrumb";

const BalanceGeneralFallback = () => {
    return (
        <div className="overflow-x-auto p-4 h-full">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Balance General", link: "/balance-general" }]} titulo="Balance General" />

            <div className="flex space-x-4 h-auto">
                {/* Tabla Activos Skeleton */}
                <div className="flex flex-col items-center w-1/3">
                    <div className="animate-pulse bg-gray-200 h-6 w-24 mb-2 rounded"></div>
                    <table className="w-full border-collapse border border-gray-500 text-gray-900">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Placeholder para Activos Circulantes */}
                            <tr className="align-top">
                                <td className="p-2 font-bold">
                                    <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                                </td>
                                <td className="p-2 font-bold text-right">
                                    <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                            {[...Array(3)].map((_, index) => (
                                <tr key={index}>
                                    <td className="border p-2 border-gray-200 border-l-black">
                                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                    </td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                </tr>
                            ))}

                            {/* Placeholder para Activos No Circulantes */}
                            <tr className="align-top">
                                <td className="p-2 font-bold">
                                    <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                </td>
                                <td className="p-2 font-bold text-right">
                                    <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                            {[...Array(2)].map((_, index) => (
                                <tr key={index}>
                                    <td className="border p-2 border-gray-200 border-l-black">
                                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                    </td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="p-2"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">
                                    <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                                </td>
                                <td className="border border-gray-500 p-2 text-right">
                                    <div className="animate-pulse bg-gray-300 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Tabla Pasivos Skeleton */}
                <div className="flex flex-col items-center w-1/3 min-h-full">
                    <div className="animate-pulse bg-gray-200 h-6 w-24 mb-2 rounded"></div>
                    <table className="w-full h-full border-collapse border border-gray-500 text-gray-900">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(3)].map((_, index) => (
                                <tr className="h-[50px]" key={index}>
                                    <td className="border px-2 py-1 border-gray-200 border-l-black">
                                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                    </td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={2} className="p-2"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">
                                    <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                                </td>
                                <td className="border border-gray-500 p-2 text-right">
                                    <div className="animate-pulse bg-gray-300 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Tabla Capital Skeleton */}
                <div className="flex flex-col items-center w-1/3 min-h-full">
                    <div className="animate-pulse bg-gray-200 h-6 w-24 mb-2 rounded"></div>
                    <table className="w-full border-collapse border border-gray-500 text-gray-900 h-full">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                                <th className="p-2 border border-gray-500 w-1/2">
                                    <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2)].map((_, index) => (
                                <tr className="h-[30px]" key={index}>
                                    <td className="border px-2 border-gray-200 border-l-black font-bold">
                                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                    </td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                </tr>
                            ))}
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">
                                    <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                </td>
                                <td className="border border-gray-200 border-r-black text-right pr-2">
                                    <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">
                                    <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                </td>
                                <td className="border border-gray-200 border-r-black text-right pr-2">
                                    <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">
                                    <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                </td>
                                <td className="border border-gray-200 border-r-black text-right pr-2">
                                    <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                            <tr className="h-[30px]">
                                <td colSpan={2} className="p-2"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">
                                    <div className="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
                                </td>
                                <td className="border border-gray-500 p-2 text-right">
                                    <div className="animate-pulse bg-gray-300 h-4 w-16 ml-auto rounded"></div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Total Pasivo + Capital Skeleton */}
            <div className="mt-4 flex justify-between">
                <div className="font-bold bg-gray-200 p-2">
                    <div className="animate-pulse bg-gray-300 h-6 w-48 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default BalanceGeneralFallback;