const EstadoFlujosEfectivo = () => {
    return (
      <div className="p-4 text-sm text-gray-900 overflow-x-auto">
        <h2 className="text-center text-xl font-bold bg-gray-800 text-white py-2">
          Estado de Flujos de Efectivo
        </h2>
  
        {/* ACTIVIDADES EN OPERACIÓN */}
        <table className="w-full border-collapse border border-gray-500 mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500">Actividades en operación</th>
              <th className="p-2 border border-gray-500">Monto</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Clientes", "$250,000.00"],
              ["Mercancías", "$100,000.00"],
              ["IVA acreditable", "$24,534.89"],
              ["IVA por acreditar", "$98,400.00"],
              ["Papelería", "$500.00"],
              ["Renta pagada por anticipado", "$20,000.00"],
              ["IVA trasladado", "-$70,482.76"],
              ["IVA por trasladar", "-$34,482.76"],
              ["Proveedores", ""],
              ["Provisión de ISR", "-$134,048.99"],
              ["Provisión de PTU", "-$44,683.00"],
              ["Utilidad del período", "-$268,097.97"],
            ].map(([concepto, monto], i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{concepto}</td>
                <td className="border border-gray-300 p-2 text-right">{monto}</td>
              </tr>
            ))}
            <tr className="bg-blue-100 font-semibold">
              <td className="border border-gray-300 p-2">Flujos netos del efectivo de actividades en operación</td>
              <td className="border border-gray-300 p-2 text-right">-$58,360.58</td>
            </tr>
          </tbody>
        </table>
  
        {/* ACTIVIDADES DE INVERSIÓN */}
        <table className="w-full border-collapse border border-gray-500 mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500">Actividades de inversión</th>
              <th className="p-2 border border-gray-500">Monto</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Terrenos", "$1,100,000.00"],
              ["Edificio", "$597,500.00"],
              ["Mobiliario y equipo", "$49,583.33"],
              ["Equipos de cómputo", "$333,450.00"],
              ["Licencias y software", "$487,500.00"],
              ["Instalación", "$166,146.92"],
              ["Muebles y enseres", "$148,750.00"],
              ["Equipos de transporte", "$577,708.33"],
            ].map(([concepto, monto], i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{concepto}</td>
                <td className="border border-gray-300 p-2 text-right">{monto}</td>
              </tr>
            ))}
            <tr className="bg-blue-100 font-semibold">
              <td className="border border-gray-300 p-2">Flujos netos del efectivo de actividades de inversión</td>
              <td className="border border-gray-300 p-2 text-right">$3,460,638.58</td>
            </tr>
          </tbody>
        </table>
  
        {/* ACTIVIDADES DE FINANCIAMIENTO */}
        <table className="w-full border-collapse border border-gray-500 mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500">Actividades de financiamiento</th>
              <th className="p-2 border border-gray-500">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Capital Social</td>
              <td className="border border-gray-300 p-2 text-right">-$4,680,000.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Acreedores</td>
              <td className="border border-gray-300 p-2 text-right">-$709,400.00</td>
            </tr>
            <tr className="bg-blue-100 font-semibold">
              <td className="border border-gray-300 p-2">Flujos netos del efectivo de actividades en financiamiento</td>
              <td className="border border-gray-300 p-2 text-right">-$5,389,400.00</td>
            </tr>
          </tbody>
        </table>
  
        {/* INCREMENTO NETO DE EFECTIVO */}
        <table className="w-full border-collapse border border-gray-500 mt-8">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border border-gray-500" colSpan={2}>
                Incremento Neto de efectivo y equivalentes de efectivo
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Efectivo al final del período - Bancos", "$1,261,000.00"],
              ["Efectivo al principio del período - Bancos", "$1,000,000.00"],
              ["Efectivo al final del período - Caja", "$726,122.00"],
              ["Efectivo al principio del período - Caja", "$650,000.00"],
            ].map(([desc, monto], i) => (
              <tr key={i}>
                <td className="border border-gray-300 p-2">{desc}</td>
                <td className="border border-gray-300 p-2 text-right">{monto}</td>
              </tr>
            ))}
            <tr className="bg-blue-100 font-bold">
              <td className="border border-gray-300 p-2">Efectivo al final del período</td>
              <td className="border border-gray-300 p-2 text-right">-$1,987,122.00</td>
            </tr>
            <tr className="bg-blue-100 font-bold">
                <td className="border border-gray-300 p-2">SUMA FINAL</td>
                <td className="border border-gray-300 p-2 text-right">$0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EstadoFlujosEfectivo;
  