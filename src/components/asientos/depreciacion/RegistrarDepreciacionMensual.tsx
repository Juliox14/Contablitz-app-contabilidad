'use client';
import { useEffect, useState } from "react";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";
import axios from "axios";
import Exito from "../../Exito";
import Error from "../../Error";
import FormDepreciacionMensual from "./FormDepreciacionMensual";
import TablaAnticipo from "../../asientos/apertura/TablaAnticipo";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import guardar from "../../../../public/guardar.png";
import Image from "next/image";

const RegistrarDepreciacionMensual = () => {
  const [detalles, setDetalles] = useState<Compra>({ subtotal: 0, iva: 0, total: 0 });
  const [cuentas, setCuentas] = useState<CuentaAfectada[]>([]);
  const [transaccion, setTransaccion] = useState<Transaccion>({ tipo: "", fecha: "", descripcion: "" });
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const empresa = obtenerCookieEmpresa();
    if (!empresa) return;

    try {
      const res = await axios.post("/api/transacciones/registrarOperacion", {
        detallesCompra: detalles,
        cuentasAfectadas: cuentas,
        transaccion,
        idEmpresa: empresa.id,
      });
      if (res.status === 200) {
        setExito("Depreciación registrada exitosamente");
        setTimeout(() => window.location.reload(), 3000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError("Error al registrar la depreciación");
    }
  };

  useEffect(() => {
    console.log("Cuentas afectadas:", cuentas);
    console.log("Detalles de compra:", detalles);
  }, [cuentas, detalles]);

  return (
    <div>
      {error && <Error mensaje={error} />}
      {exito && <Exito mensaje={exito} />}

      <FormDepreciacionMensual
        setDetalles={setDetalles}
        setCuentas={setCuentas}
        setTransaccion={setTransaccion}
      />

      <div className="flex justify-end mt-4 pr-8">
        <button
          onClick={handleSubmit}
          className="bg-white border border-gray-200 px-4 py-2 rounded-md flex items-center hover:bg-gray-100"
        >
          <Image src={guardar} alt="Guardar" width={20} height={20} />
          <span className="ml-2">Registrar depreciación</span>
        </button>
      </div>

      <TablaAnticipo detallesCompra={detalles} cuentasAfectadas={cuentas} />
    </div>
  );
};

export default RegistrarDepreciacionMensual;
