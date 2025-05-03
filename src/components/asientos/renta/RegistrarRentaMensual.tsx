'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import guardar from "../../../../public/guardar.png";
import editar from "../../../../public/editar.png";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada, CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";
import { empresa } from "@/interfaces/cuenta";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import Error from "../../Error";
import Exito from "../../Exito";
import TablaAnticipo from "../../asientos/apertura/TablaAnticipo";
import FormRentaMensual from "./FormRentaMensual";
import TablaCuentasAfectadas from "@/components/TablaCuentasAfectadas";

const RegistrarRentaMensual = () => {
    const [detalles, setDetalles] = useState<Compra>({ subtotal: 0, iva: 0, total: 0 });
    const [cuentas, setCuentas] = useState<CuentaAfectada[]>([]);
    const [transaccion, setTransaccion] = useState<Transaccion>({
        tipo: "Pago mensual de renta",
        fecha: "",
        descripcion: "Registro de gasto por uso de renta anticipada",
    });
    const [catalogo, setCatalogo] = useState<CuentaCatalogo[]>([]);
    const [empresa, setEmpresa] = useState<empresa>({ nombre: "", id: 0 });
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() || { nombre: "", id: 0 });
        axios.get("/api/cuentas/catalogo").then(res => setCatalogo(res.data));
    }, []);

    const handleSubmit = async () => {
        try {
            const res = await axios.post("/api/transacciones/registrarOperacion", {
                detallesCompra: detalles,
                cuentasAfectadas: cuentas,
                transaccion,
                idEmpresa: empresa.id,
            });
            if (res.status === 200) {
                setExito("Movimiento de renta registrado con éxito");
                setTimeout(() => window.location.reload(), 3000);
            } else {
                setError(res.data.message);
            }
        } catch {
            setError("Error al registrar la renta");
        }
    };

    const resetForm = () => {
        setDetalles({ subtotal: 0, iva: 0, total: 0 });
        setCuentas([]);
        setTransaccion({ tipo: "Pago mensual de renta", fecha: "", descripcion: "" });
    };

    return (
        <div>
            {error && <Error mensaje={error} />}
            {exito && <Exito mensaje={exito} />}

            <FormRentaMensual
                setDetalles={setDetalles}
                setCuentas={setCuentas}
                setTransaccion={setTransaccion}
                catalogoCuentas={catalogo}
                detalles={detalles}
                transaccion={transaccion}
            />

            <div className="flex justify-end gap-4 mt-4 pr-8">
                <button onClick={resetForm} className="bg-white border border-gray-200 px-4 py-2 rounded-md flex items-center hover:bg-gray-100">
                    <Image src={editar} alt="Editar" width={20} height={20} />
                    <span className="ml-2">Editar</span>
                </button>
                <button onClick={handleSubmit} className="bg-white border border-gray-200 px-4 py-2 rounded-md flex items-center hover:bg-gray-100">
                    <Image src={guardar} alt="Guardar" width={20} height={20} />
                    <span className="ml-2">Guardar</span>
                </button>
            </div>

            <div className="h-screen p-12 ">
                <div className="flex justify-center items-center p-4 relative">
                    <h2 className="text-2xl font-semibold text-center">Detalle de pago</h2>

                </div>

                {/* Tabla de cuentas a afectar */}
                <h3 className="text-md font-semibold mb-2">Cuentas a Afectar</h3>
                <TablaCuentasAfectadas cuentasAfectadas={cuentas} />
            </div>
        </div>
    );
};

export default RegistrarRentaMensual;
