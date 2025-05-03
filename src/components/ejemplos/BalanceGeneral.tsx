import React from "react";
import { formatearNumero } from "@/utils/formateador";

const hojaTrabajo = {
  activos: [
    { cuenta: "Caja", monto: 726122 },
    { cuenta: "Bancos", monto: 1261000 },
    { cuenta: "Papelería", monto: 500 },
    { cuenta: "Mercancías", monto: 100000 },
    { cuenta: "IVA acreditado", monto: 24534.89 },
    { cuenta: "IVA por acreditar", monto: 98400 },
    { cuenta: "Renta pagada por anticipado", monto: 20000 },
    { cuenta: "Clientes", monto: 250000 },
  ],
  activosNoCirculantes: [
    { cuenta: "Edificio", monto: 600000 },
    { cuenta: "Dep. Acum. Edificio", monto: -2500 },
    { cuenta: "Mobiliario y equipo", monto: 50000 },
    { cuenta: "Dep. Acum. Mobiliario y equipo", monto: -416.67 },
    { cuenta: "Equipos de cómputo", monto: 342000 },
    { cuenta: "Dep. Acum. Equipos de cómputo", monto: -8550 },
    { cuenta: "Licencias y software", monto: 500000 },
    { cuenta: "Dep. Acum. Licencias y software", monto: -12500 },
    { cuenta: "Instalación", monto: 167543.11 },
    { cuenta: "Amort. Instalación", monto: -1396.19 },
    { cuenta: "Muebles y enseres", monto: 150000 },
    { cuenta: "Dep. Acum. Muebles y enseres", monto: -1250 },
    { cuenta: "Equipos de transporte", monto: 590000 },
    { cuenta: "Dep. Acum. Equipos de transporte", monto: -12291.67 },
  ],
  totalActivo: 5941195.47,
  pasivo: [
    { cuenta: "Acreedores", monto: 709400 },
    { cuenta: "Anticipo de clientes", monto: 0 },
    { cuenta: "Iva trasladado", monto: 70482.76 },
    { cuenta: "Iva por trasladar", monto: 34482.76 },
  ],
  capital: [
    { cuenta: "Capital Contribuido", monto: 4680000 },
    { cuenta: "Utilidad del periodo", monto: 446829.95 },
  ],
  totalPasivoCapital: 5494365.52,

  totalPasivoCapitalBien: 5941195.47137931
};

const HojaTrabajo = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-4 text-sm border border-gray-400">
        {/* Encabezados */}
        <div className="col-span-2 bg-lime-600 text-white font-bold p-2 text-center">
          ACTIVOS
        </div>
        <div className="bg-yellow-400 text-black font-bold p-2 text-center">
          Total pasivo + capital
        </div>
        <div className="bg-blue-800 text-white font-bold p-2 text-center">Capital</div>

        {/* Activos circulantes */}
        <div className="col-span-2 border border-gray-300">
          <table className="w-full">
            <tbody>
              {hojaTrabajo.activos.map((item, i) => (
                <tr key={i} className="border border-gray-200">
                  <td className="p-2 text-left">{item.cuenta}</td>
                  <td className="p-2 text-right">${formatearNumero(item.monto)}</td>
                </tr>
              ))}
              <tr>
                <td className="p-2 font-bold">Circulante</td>
                <td></td>
              </tr>
              {hojaTrabajo.activosNoCirculantes.map((item, i) => (
                <tr
                  key={i}
                  className={`border border-gray-200 ${item.cuenta.includes("Dep") || item.cuenta.includes("Amort") ? "text-red-600" : ""}`}
                >
                  <td className="p-2 text-left">{item.cuenta}</td>
                  <td className="p-2 text-right">${formatearNumero(Math.abs(item.monto))}</td>
                </tr>
              ))}
              <tr>
                <td className="p-2 font-bold">No circulante</td>
                <td className="p-2 text-right font-bold bg-lime-200">
                  ${formatearNumero(3460638.58)}
                </td>
              </tr>
              <tr className="bg-lime-500 font-bold">
                <td className="p-2">Total Activo</td>
                <td className="p-2 text-right">
                  ${formatearNumero(hojaTrabajo.totalActivo)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pasivo */}
        <div className="border border-gray-300">
          <table className="w-full">
            <tbody>
              {hojaTrabajo.pasivo.map((item, i) => (
                <tr key={i}>
                  <td className="p-2">{item.cuenta}</td>
                  <td className="p-2 text-right">${formatearNumero(item.monto)}</td>
                </tr>
              ))}
              <tr className="bg-yellow-200 font-bold">
                <td className="p-2">Total pasivo + capital</td>
                <td className="p-2 text-right">
                  ${formatearNumero(hojaTrabajo.totalPasivoCapital)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Capital */}
        <div className="border border-gray-300">
          <table className="w-full">
            <tbody>
              {hojaTrabajo.capital.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 font-bold">{item.cuenta}</td>
                  <td className="p-2 text-right">${formatearNumero(item.monto)}</td>
                </tr>
              ))}
              <tr>
                <td className="p-2"></td>
                <td className="p-2"></td>
              </tr>
              <tr>
                <td className="p-2 font-bold text-right">Total capital</td>
                <td className="p-2">${formatearNumero(5126829.95)}</td>
              </tr>
            </tbody>

            <tfoot>
                <tr className="bg-blue-800 text-white font-bold">
                    <td className="p-2">Total Pasivo + Capital</td>
                    <td className="p-2 text-right">${formatearNumero(hojaTrabajo.totalPasivoCapitalBien)}</td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HojaTrabajo;
