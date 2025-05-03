import { useState, useEffect } from "react";
import { CuentaCatalogo, CuentaAfectada } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { Transaccion } from "@/interfaces/transacciones";
import axios from "axios";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";

interface Props {
  setDetalles: (detalles: Compra) => void;
  setCuentas: (cuentas: CuentaAfectada[]) => void;
  setTransaccion: (t: Transaccion) => void;
}

const FormDepreciacionMensual = ({ setDetalles, setCuentas, setTransaccion }: Props) => {
  const [id_empresa, setId_empresa] = useState<number | null>(null);
  const [cuentasEmpresa, setCuentasEmpresa] = useState<any[]>([]);
  const [catalogo, setCatalogo] = useState<CuentaCatalogo[]>([]);

  useEffect(() => {
    const empresa = obtenerCookieEmpresa();
    if (empresa) setId_empresa(empresa.id);
  }, []);

  useEffect(() => {
    if (!id_empresa) return;
 
    const fetchData = async () => {
      const [resEmp, resCat] = await Promise.all([
        axios.get(`/api/empresas/obtenerCuentas?id_empresa=${id_empresa}`),
        axios.get(`/api/cuentas/catalogo`),
      ]);
      setCuentasEmpresa(resEmp.data);
      setCatalogo(resCat.data);
    };

    fetchData();
  }, [id_empresa]);

  useEffect(() => {
    if (!cuentasEmpresa.length || !catalogo.length) return;
  
    const activosEmpresa = cuentasEmpresa.filter(
      (c) => c.tipo === "Activo No Circulante"
    );
  
    const cuentasAfectadas: CuentaAfectada[] = [];
    let totalDepreciacion = 0;
  
    for (const cuenta of activosEmpresa) {
      const cuentaCatalogo = catalogo.find((cat) => cat.id_cuenta_cat === cuenta.id_cuenta_cat);
      const porcentaje = cuentaCatalogo?.porcentaje_depreciacion_anual;
      console.log("Cuenta:", cuenta);
      console.log("Porcentaje:", porcentaje);
  
      if (!porcentaje || porcentaje === 0) continue;
  
      const mensual = (cuenta.saldo * porcentaje) / 100 / 12;
      if (mensual === 0) continue;
  
      totalDepreciacion += mensual;
  
      // Buscar cuenta de depreciación acumulada
      const cuentaAcumulada = catalogo.find(cat => cat.nombre.includes(`Dep. Acum. ${cuenta.nombre}`) || cat.nombre.includes(`Amort. ${cuenta.nombre}`));
      console.log("Cuenta acumulada:", cuentaAcumulada);
      cuentasAfectadas.push({
        id_cuenta_cat: cuentaAcumulada?.id_cuenta_cat || 0,
        codigo: cuentaAcumulada?.codigo || 0,
        nombre: cuentaAcumulada?.nombre || `Dep. Acum. ${cuenta.nombre}`,
        debe: 0,
        haber: mensual,
        tipo: cuentaAcumulada?.tipo || "Activo No Circulante",
      });
  
      // Gasto por depreciación (puedes cambiar el nombre si usas una general)
      cuentasAfectadas.push({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: `Gasto por depreciación - ${cuenta.nombre}`,
        debe: mensual,
        haber: 0,
        tipo: "Gasto",
      });
    }
  
    setDetalles({
      subtotal: totalDepreciacion,
      iva: 0,
      total: totalDepreciacion
    });
  
    setCuentas(cuentasAfectadas);
    setTransaccion({
      tipo: "Depreciación mensual",
      fecha: new Date().toISOString().split("T")[0],
      descripcion: "Depreciación mensual automática"
    });
  
  }, [cuentasEmpresa, catalogo]);

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-2">Depreciación Mensual</h2>
      <p className="text-sm text-gray-600">Las depreciaciones se calcularán automáticamente para todos los activos no circulantes con porcentaje asignado.</p>
    </div>
  );
};

export default FormDepreciacionMensual;
