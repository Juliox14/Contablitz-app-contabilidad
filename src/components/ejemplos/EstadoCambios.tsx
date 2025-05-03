const EstadoCambiosCapital = () => {
    return (
      <div className="p-4 overflow-x-auto">
        <h2 className="text-center text-xl font-bold bg-gray-800 text-white py-2">
          Neuronix SA de CV
        </h2>
        <h3 className="text-center font-semibold bg-gray-100 py-1">
          Estado de cambios en el capital contable al 18 de marzo del 2025
        </h3>
  
        <table className="w-full border-collapse border border-gray-500 text-gray-900">
          <thead>
            <tr className="bg-gray-200 text-sm text-center">
              <th className="border border-gray-400 p-2">Concepto</th>
              <th className="border border-gray-400 p-2">Capital Contribuido</th>
              <th className="border border-gray-400 p-2">Capital ganado</th>
              <th className="border border-gray-400 p-2">Capital contable</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="border border-gray-300 p-2">Saldo Inicial</td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
            </tr>
  
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={4} className="border border-gray-300 p-2">Aumentos</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Capital social</td>
              <td className="border border-gray-300 p-2 text-right">$ 4,680,000.00</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right">$ 4,680,000.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Reserva legal</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Emisión de acciones</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Prima de acciones</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Resultado del ejercicio (utilidad)</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right">$ 446,829.95</td>
              <td className="border border-gray-300 p-2 text-right">$ 446,829.95</td>
            </tr>
            <tr className="font-semibold">
              <td className="border border-gray-300 p-2">Total Aumentos</td>
              <td className="border border-gray-300 p-2 text-right">$ 4,680,000.00</td>
              <td className="border border-gray-300 p-2 text-right">$ 448,691.74</td>
              <td className="border border-gray-300 p-2 text-right">$ 5,128,691.74</td>
            </tr>
  
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={4} className="border border-gray-300 p-2">Disminuciones</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Decreto de dividendos</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Reserva legal</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Reembolso a socio</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right"></td>
            </tr>
            <tr className="font-semibold">
              <td className="border border-gray-300 p-2">Total Disminuciones</td>
              <td className="border border-gray-300 p-2 text-right"></td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
              <td className="border border-gray-300 p-2 text-right">$ 1,861.79</td>
            </tr>
  
            <tr className="font-bold bg-gray-100">
              <td className="border border-gray-400 p-2">Incremento Neto</td>
              <td className="border border-gray-400 p-2 text-right">$ 4,680,000.00</td>
              <td className="border border-gray-400 p-2 text-right">$ 450,553.54</td>
              <td className="border border-gray-400 p-2 text-right">$ 5,130,553.54</td>
            </tr>
            <tr className="font-bold bg-gray-200">
              <td className="border border-gray-400 p-2">Saldo final</td>
              <td className="border border-gray-400 p-2 text-right">$ 4,680,000.00</td>
              <td className="border border-gray-400 p-2 text-right">$ 450,553.54</td>
              <td className="border border-gray-400 p-2 text-right">$ 5,130,553.54</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EstadoCambiosCapital;
  