import { useEffect, useState } from "react";
import { CuentaAfectada, CuentaCatalogo } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { Transaccion } from "@/interfaces/transacciones";

interface Props {
  setDetalles: (compra: Compra) => void;
  setCuentas: (cuentas: CuentaAfectada[]) => void;
  setTransaccion: (transaccion: Transaccion) => void;
  catalogoCuentas: CuentaCatalogo[];
  detalles: Compra;
  transaccion: Transaccion;
}

const FormRentaMensual = ({
  setDetalles,
  setCuentas,
  setTransaccion,
  catalogoCuentas,
  detalles,
  transaccion
}: Props) => {
  const [monto, setMonto] = useState<number>(0);

  const handleChangeMonto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value.replace(/,/g, "")) || 0;
    setMonto(valor);
    setDetalles({ subtotal: valor, iva: 0, total: valor });
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaccion({ ...transaccion, fecha: e.target.value });
  };

  const handleDescripcionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaccion({ ...transaccion, descripcion: e.target.value });
  };

  useEffect(() => {
    const gastos = catalogoCuentas.find(c => c.nombre === "Gastos generales");
    const anticipado = catalogoCuentas.find(c => c.nombre === "Renta pagada por anticipado");

    if (gastos && anticipado && monto > 0) {
      const cuentas: CuentaAfectada[] = [
        {
          id_cuenta_cat: gastos.id_cuenta_cat,
          codigo: gastos.codigo,
          nombre: gastos.nombre,
          debe: monto,
          haber: 0,
          tipo: gastos.tipo,
        },
        {
          id_cuenta_cat: anticipado.id_cuenta_cat,
          codigo: anticipado.codigo,
          nombre: anticipado.nombre,
          debe: 0,
          haber: monto,
          tipo: anticipado.tipo,
        },
      ];
      setCuentas(cuentas);
    }
  }, [monto, catalogoCuentas]);

  return (
    <div className="p-6 bg-white shadow rounded-md mt-4 flex gap-4 items-end">
      <div className="max-w-sm flex items-center gap-2">
        <label htmlFor="descripcion">Descripción: </label>
        <input
          type="text"
          name="descripcion"
          value={transaccion.descripcion}
          onChange={handleDescripcionChange}
          className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      </div>

      {/* Fecha */}
      <div className="max-w-sm flex items-center gap-2">
        <label htmlFor="fecha">Fecha: </label>
        <input
          type="date"
          name="fecha"
          onChange={handleFechaChange}
          className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Monto de renta mensual</label>
        <input
          type="text"
          placeholder="$0.00"
          onChange={handleChangeMonto}
          className="border px-3 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default FormRentaMensual;
