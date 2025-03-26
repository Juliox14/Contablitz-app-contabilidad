import { use } from "react";
import { formatearNumero } from "@/utils/formateador";
import { sumaTotal } from "@/utils/sumaTotal";
import Breadcrumb from "../Breadcrumb";

interface empresa {
    nombre: string;
    id: number;
}

interface Cuenta {
    id: number;
    nombre: string;
    tipo: string;
    saldo: number;
}

interface BalanceGeneralProps {
    cuentasPromise: Promise<Cuenta[]>;
}


const BalanceGeneral = ({ cuentasPromise }: BalanceGeneralProps) => {

    const cuentas = use(cuentasPromise);

    const activosCirculantes = cuentas.filter((c) => c.tipo === "Activo Circulante");
    const activosNoCirculantes = cuentas.filter((c) => c.tipo === "Activo No Circulante");
    const pasivos = cuentas.filter((c) => c.tipo === "Pasivo" || c.tipo === "Pasivo Largo Plazo" || c.tipo === "Pasivo Corto Plazo");
    const capital = cuentas.filter((c) => c.tipo === "Capital Contable");

    console.log("Activos Circulantes", activosCirculantes);
    console.log("Activos No Circulantes", activosNoCirculantes);
    console.log("Pasivos", pasivos);
    console.log("Capital", capital);


    const totalActivosCirculantes = sumaTotal(activosCirculantes);
    const totalActivosNoCirculantes = sumaTotal(activosNoCirculantes);
    const totalPasivo = sumaTotal(pasivos);
    const totalCapital = sumaTotal(capital);
    const totalActivo = totalActivosCirculantes + totalActivosNoCirculantes;
    const totalPasivoCapital = totalPasivo + totalCapital;


    return (
        <div className="overflow-x-auto p-4 h-full">
            <Breadcrumb rutas={[{ nombre: "Inicio", link: "/" }, { nombre: "Balance General", link: "/balance-general" }]} titulo="Balance General" />
            <div className="flex space-x-4 h-auto">
                <div className="flex flex-col items-center w-1/3">
                    <h2 className="text-xl font-bold mb-2">Activos</h2>
                    <table className="w-full border-collapse border border-gray-500 text-gray-900">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">Nombre de Cuenta</th>
                                <th className="p-2 border border-gray-500 w-1/2">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="align-top">
                                {/* Activos Circulantes */}
                                <td className="p-2 font-bold">Activos Circulantes</td>
                                <td className="p-2 font-bold text-right">{formatearNumero(totalActivosCirculantes)}</td>
                            </tr>
                            {activosCirculantes.map((cuenta, index) => (
                                <tr key={index}>
                                    <td className="border p-2 border-gray-200 border-l-black">{cuenta.nombre}</td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">{formatearNumero(cuenta.saldo)}</td>
                                </tr>
                            ))}

                            <tr className="align-top">
                                {/* Activos Circulantes */}
                                <td className=" p-2 font-bold">Activos No Circulantes</td>
                                <td className="p-2 font-bold text-right">{formatearNumero(totalActivosNoCirculantes)}</td>
                            </tr>
                            {activosNoCirculantes.map((cuenta, index) => (
                                <tr key={index}>
                                    <td className="border p-2 border-gray-200 border-l-black">{cuenta.nombre}</td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">{formatearNumero(cuenta.saldo)}</td>
                                </tr>
                            ))}
                            {/* Dejar un espacio */}
                            <tr>
                                <td colSpan={2} className="p-2"></td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">Total Activo:</td>
                                <td className="border border-gray-500 p-2 text-right">{formatearNumero(totalActivo)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Tabla Pasivos */}
                <div className="flex flex-col items-center w-1/3 min-h-full">
                    <h2 className="text-xl font-bold mb-2">Pasivos</h2>
                    <table className="w-full h-full border-collapse border border-gray-500 text-gray-900">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">Nombre de Cuenta</th>
                                <th className="p-2 border border-gray-500 w-1/2">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pasivos.length > 0 ? (
                                pasivos.map((cuenta, index) => (
                                    <tr className="h-[50px]" key={index}>
                                        <td className="border px-2 py-1 border-gray-200 border-l-black">{cuenta.nombre}</td>
                                        <td className="border border-gray-200 border-r-black text-right pr-2">{formatearNumero(cuenta.saldo)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="h-[50px]">
                                    <td colSpan={1} className="text-center border border-gray-200 text-gray-500">No hay registros</td>
                                    <td colSpan={1} className="text-center border border-gray-200 text-gray-500"></td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan={2} className="p-2"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">Total Pasivo:</td>
                                <td className="border border-gray-500 p-2 text-right">{formatearNumero(totalPasivo)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Tabla Capital */}
                <div className="flex flex-col items-center w-1/3 min-h-full">
                    <h2 className="text-xl font-bold mb-2">Capital</h2>
                    <table className="w-full border-collapse border border-gray-500 text-gray-900 h-full">
                        <thead>
                            <tr className="bg-gray-800 text-white">
                                <th className="p-2 border border-gray-500 w-1/2">Nombre de Cuenta</th>
                                <th className="p-2 border border-gray-500 w-1/2">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {capital.map((cuenta, index) => (
                                <tr className="h-[30px]" key={index}>
                                    <td className="border px-2 border-gray-200 border-l-black font-bold">{cuenta.nombre}</td>
                                    <td className="border border-gray-200 border-r-black text-right pr-2">{formatearNumero(cuenta.saldo)}</td>
                                </tr>
                            ))}
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">Capital Contable</td>
                                <td className="border border-gray-200 border-r-black text-right pr-2"></td>
                            </tr>
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">Capital Contribuido</td>
                                <td className="border border-gray-200 border-r-black text-right pr-2"></td>
                            </tr>
                            <tr className="h-[30px]">
                                <td className="border px-2 border-gray-200 border-l-black">Capital Social</td>
                                <td className="border border-gray-200 border-r-black text-right pr-2"></td>
                            </tr>

                            <tr className="h-[30px]">
                                <td colSpan={2} className="p-2"></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr className="font-bold bg-gray-200">
                                <td className="border border-gray-500 p-2">Total Capital:</td>
                                <td className="border border-gray-500 p-2 text-right">{formatearNumero(totalCapital)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-4 flex justify-between">
                <div className="font-bold bg-gray-200 p-2">
                    Total Pasivo + Capital: {formatearNumero(totalPasivoCapital)}
                </div>
            </div>
        </div>
    );
};

export default BalanceGeneral;
