const EstadoOrigenAplicacionRecursos = () => {
    return (
      <div className="p-4 text-sm text-gray-900 ">
        <h2 className="text-center text-xl font-bold bg-gray-800 text-white py-2">
          Estado de Origen y Aplicación de Recursos
        </h2>
  
        {/* FUENTE DE EFECTIVO */}
        <table className="w-full border-collapse border border-gray-500 mt-4 mb-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500 text-left" colSpan={2}>
                Fuente de Efectivo
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold">
              <td className="border border-gray-300 p-2">Utilidad del Ejercicio</td>
              <td className="border border-gray-300 p-2 text-right">$268,097.97</td>
            </tr>
            <tr className="font-bold">
              <td className="p-2 bg-gray-100" colSpan={2}>
                Cargos a Resultados que no implican utilización de efectivo
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">ISR</td>
              <td className="border border-gray-300 p-2 text-right">$134,048.99</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">PTU</td>
              <td className="border border-gray-300 p-2 text-right">$44,683.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Acreedores</td>
              <td className="border border-gray-300 p-2 text-right">$709,400.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Depreciaciones y amortización</td>
              <td className="border border-gray-300 p-2 text-right">$38,904.53</td>
            </tr>
            <tr className="font-semibold">
              <td className="border border-gray-300 p-2">Efectivo generado en la operación</td>
              <td className="border border-gray-300 p-2 text-right">$1,195,134.48</td>
            </tr>
            <tr className="font-bold">
              <td className="p-2 bg-gray-100" colSpan={2}>
                Financiamiento y otras fuentes:
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Proveedores</td>
              <td className="border border-gray-300 p-2 text-right">$0.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Capital social</td>
              <td className="border border-gray-300 p-2 text-right">$4,680,000.00</td>
            </tr>
            <tr className="font-bold bg-blue-100">
              <td className="border border-gray-300 p-2">Suma las fuentes de efectivo:</td>
              <td className="border border-gray-300 p-2 text-right">$5,875,134.48</td>
            </tr>
          </tbody>
        </table>
  
        {/* APLICACIÓN DE EFECTIVO */}
        <table className="w-full border-collapse border border-gray-500">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500 text-left" colSpan={2}>
                Aplicación de Efectivo
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Mercancías", "$100,000.00"],
              ["Clientes", "$250,000.00"],
              ["IVA Acreditable", "$24,534.89"],
              ["Iva Pendiente De Acreditar", "$98,400.00"],
              ["Iva Trasladado", "-$70,482.76"],
              ["Iva Pendiente de Trasladar", "-$34,482.76"],
              ["Terrenos", "$1,100,000.00"],
              ["Edificio", "$600,000.00"],
              ["Mobiliario y equipo", "$50,000.00"],
              ["Equipos de cómputo", "$342,000.00"],
              ["Licencias y software", "$500,000.00"],
              ["Instalación", "$167,543.11"],
              ["Muebles y enseres", "$150,000.00"],
              ["Equipos de transporte", "$590,000.00"],
              ["Renta", "$20,000.00"],
              ["Papelería", "$500.00"],
            ].map(([concepto, monto], i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{concepto}</td>
                <td className="border border-gray-300 p-2 text-right">{monto}</td>
              </tr>
            ))}
            <tr className="font-semibold bg-blue-100">
              <td className="border border-gray-300 p-2">Disminución neta del Efectivo</td>
              <td className="border border-gray-300 p-2 text-right">$1,987,122.00</td>
            </tr>
          </tbody>
        </table>
  
        {/* SALDOS BANCOS Y CAJA */}
        <table className="w-full border-collapse border border-gray-500 mt-8">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Saldo inicial de bancos</td>
              <td className="border border-gray-300 p-2 text-right">$1,000,000.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Saldo final de bancos</td>
              <td className="border border-gray-300 p-2 text-right">$1,261,000.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Saldo inicial de Caja</td>
              <td className="border border-gray-300 p-2 text-right">$650,000.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Saldo final de Caja</td>
              <td className="border border-gray-300 p-2 text-right">$726,122.00</td>
            </tr>
            <tr className="font-bold bg-blue-100">
              <td className="border border-gray-300 p-2">Suma final Caja + Efectivo</td>
              <td className="border border-gray-300 p-2 text-right">$1,987,122.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EstadoOrigenAplicacionRecursos;
  