import { formatearNumero } from "@/utils/formateador";

interface Activo {
  nombre: string;
  porcentaje: number;
  importe: number;
  depreciacionAnual: number;
  depreciacionMensual: number;
}

interface Props {
  activos: Activo[];
}

const TablaDepreciacionMensual = ({ activos }: Props) => {
  const suma = (campo: keyof Activo) =>
    activos.reduce((total, a) => total + (a[campo] as number), 0);

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-lg font-bold text-red-600 text-center mb-2">
        Ajuste por depreciaciones y/o amortizaciones
      </h2>

      <table className="w-full border-collapse border border-gray-400 text-sm text-gray-800">
        <thead>
          <tr className="bg-red-100 text-black text-center">
            <th className="border border-gray-400 px-2 py-1">No circulante</th>
            <th className="border border-gray-400 px-2 py-1">% Aut. Anual</th>
            <th className="border border-gray-400 px-2 py-1">Importe</th>
            <th className="border border-gray-400 px-2 py-1">Depreciación Anual</th>
            <th className="border border-gray-400 px-2 py-1">Depreciación mensual</th>
          </tr>
        </thead>
        <tbody>
          {activos.map((activo, i) => (
            <tr key={i} className="text-right">
              <td className="border border-gray-300 px-2 py-1 text-left bg-green-50">{activo.nombre}</td>
              <td className="border border-gray-300 px-2 py-1">{activo.porcentaje}%</td>
              <td className="border border-gray-300 px-2 py-1">{formatearNumero(activo.importe)}</td>
              <td className="border border-gray-300 px-2 py-1">{formatearNumero(activo.depreciacionAnual)}</td>
              <td className="border border-gray-300 px-2 py-1">{formatearNumero(activo.depreciacionMensual)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold bg-green-100 text-right">
            <td className="border border-gray-400 px-2 py-1 text-left">TOTAL</td>
            <td className="border border-gray-400 px-2 py-1"> </td>
            <td className="border border-gray-400 px-2 py-1">{formatearNumero(suma("importe"))}</td>
            <td className="border border-gray-400 px-2 py-1">{formatearNumero(suma("depreciacionAnual"))}</td>
            <td className="border border-gray-400 px-2 py-1">{formatearNumero(suma("depreciacionMensual"))}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TablaDepreciacionMensual;
