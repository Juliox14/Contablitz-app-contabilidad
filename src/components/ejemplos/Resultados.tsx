import { formatearNumero } from "@/utils/formateador";

interface Props {
  estadoResultados: {
    ventas: number;
    ingresosServicios: number;
    costo: number;
    gastos: number;
    utilidad: number;
    isr: number;
    ptu: number;
    utilidadNeta: number;
  };
  resumenCapital: {
    acreedores: number;
    anticipos: number;
    ivaTrasladado: number;
    ivaPorTrasladar: number;
    capitalContable: number;
    capitalContribuido: number;
    capitalSocial: number;
    utilidadDelPeriodo: number;
  };
}

const EstadoResultadosYCapital = ({ estadoResultados, resumenCapital }: Props) => {
  return (
    <div className="flex space-x-4 p-4 text-gray-900">
      {/* Estado de resultados */}
      <div className="w-1/2 border border-gray-500">
        <h2 className="bg-gray-800 text-white text-center py-2 font-bold">
          Neuronix SA de CV
        </h2>
        <h3 className="text-center font-semibold bg-gray-200 py-1">
          Estado de resultados del 1 al 13 de marzo
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Ventas</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.ventas)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Ingresos por servicios</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.ingresosServicios)}</td>
            </tr>
            <tr className="font-bold bg-gray-100">
              <td className="border border-gray-200 px-3 py-2">Ingresos totales</td>
              <td className="border border-gray-200 px-3 py-2 text-right">
                {formatearNumero(estadoResultados.ventas + estadoResultados.ingresosServicios)}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Costo de lo vendido</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.costo)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Gastos generales</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.gastos)}</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-200 px-3 py-2">Utilidad del periodo</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.utilidad)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Provisiones del ISR</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.isr)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Provisiones del PTU</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(estadoResultados.ptu)}</td>
            </tr>
            <tr className="bg-gray-100 font-bold">
              <td className="border border-gray-500 px-3 py-2">Utilidad después de impuestos</td>
              <td className="border border-gray-500 px-3 py-2 text-right">{formatearNumero(estadoResultados.utilidadNeta)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Capital y pasivo */}
      <div className="w-1/2 border border-gray-500">
        <h2 className="bg-gray-800 text-white text-center py-2 font-bold">
          Neuronix SA de CV
        </h2>
        <h3 className="text-center font-semibold bg-gray-200 py-1">
          Resumen de capital y pasivo
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="font-bold">
              <td className="border border-gray-200 px-3 py-2">Pasivo corto plazo</td>
              <td className="border border-gray-200 px-3 py-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Acreedores</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.acreedores)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Anticipo de clientes</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.anticipos)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">IVA trasladado</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.ivaTrasladado)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">IVA por trasladar</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.ivaPorTrasladar)}</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-200 px-3 py-2">Capital Contable</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.capitalContable)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Capital contribuido</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.capitalContribuido)}</td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Capital Social</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.capitalSocial)}</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-200 px-3 py-2">Capital ganado</td>
              <td className="border border-gray-200 px-3 py-2"></td>
            </tr>
            <tr>
              <td className="border border-gray-200 px-3 py-2">Utilidad del periodo</td>
              <td className="border border-gray-200 px-3 py-2 text-right">{formatearNumero(resumenCapital.utilidadDelPeriodo)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstadoResultadosYCapital;
