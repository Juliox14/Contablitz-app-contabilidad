import React from "react";
import Breadcrumb from "../../Breadcrumb";

const LibroDiarioFallback = () => {
    return (
        <div className="overflow-x-auto p-12 bg-white rounded-lg shadow-md">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Libro Diario", link: "/libro_diario" }]} titulo="Libro Diario" />
            <table className="w-full border-collapse border border-gray-500 text-gray-900 h-full">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border border-gray-500">
                            <div className="animate-pulse bg-gray-600 h-4 w-6 mx-auto rounded"></div>
                        </th>
                        <th className="p-2 border border-gray-500">
                            <div className="animate-pulse bg-gray-600 h-4 w-20 mx-auto rounded"></div>
                        </th>
                        <th className="p-2 border border-gray-500">
                            <div className="animate-pulse bg-gray-600 h-4 w-24 mx-auto rounded"></div>
                        </th>
                        <th className="p-2 border border-gray-500">
                            <div className="animate-pulse bg-gray-600 h-4 w-16 mx-auto rounded"></div>
                        </th>
                        <th className="p-2 border border-gray-500">
                            <div className="animate-pulse bg-gray-600 h-4 w-16 mx-auto rounded"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Placeholder para 3 transacciones */}
                    {[...Array(5)].map((_, index) => (
                        <React.Fragment key={index}>
                            {/* Placeholder para 2 movimientos por transacción */}
                            {[...Array(4)].map((_, i) => (
                                <tr key={`${index}-${i}`} className="border border-gray-500">
                                    {i === 0 && (
                                        <td rowSpan={2} className="p-2 border border-gray-500 text-center">
                                            <div className="animate-pulse bg-gray-200 h-4 w-6 mx-auto rounded"></div>
                                        </td>
                                    )}
                                    {i === 0 && (
                                        <td rowSpan={2} className="p-2 border border-gray-500 text-center">
                                            <div className="animate-pulse bg-gray-200 h-4 w-20 mx-auto rounded"></div>
                                        </td>
                                    )}
                                    <td className="p-2 border border-gray-500">
                                        <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                                    </td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                    <td className="p-2 border border-gray-500 text-right">
                                        <div className="animate-pulse bg-gray-200 h-4 w-16 ml-auto rounded"></div>
                                    </td>
                                </tr>
                            ))}
                            {/* Placeholder para el tipo de transacción */}
                            <tr className="bg-[#E0E0E0]">
                                <td colSpan={5} className="p-2 text-center font-bold">
                                    <div className="animate-pulse bg-gray-300 h-4 w-48 mx-auto rounded"></div>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-300 font-bold">
                        <td colSpan={3} className="p-2 border border-gray-500 text-center">
                            <div className="animate-pulse bg-gray-400 h-4 w-24 mx-auto rounded"></div>
                        </td>
                        <td className="p-2 border border-gray-500 text-right">
                            <div className="animate-pulse bg-gray-400 h-4 w-16 ml-auto rounded"></div>
                        </td>
                        <td className="p-2 border border-gray-500 text-right">
                            <div className="animate-pulse bg-gray-400 h-4 w-16 ml-auto rounded"></div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default LibroDiarioFallback;