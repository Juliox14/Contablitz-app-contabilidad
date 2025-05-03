'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import InfoVenta from "./InfoVentas";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";
import { Empresa } from "@/interfaces/cuenta";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import TablaVentas from "./TablaVentas";
import Image from "next/image";
import guardar from "../../../../public/guardar.png";
import editar from "../../../../public/editar.png";

export const Ventas = () => {
    const [detallesVenta, setDetallesVenta] = useState<Compra>({
        subtotal: 0,
        iva: 0,
        total: 0,
    });

    const [cuentasAfectadas, setCuentasAfectadas] = useState<CuentaAfectada[]>([]);
    const [transaccion, setTransaccion] = useState<Transaccion>({
        tipo: "Compra",
        fecha: "",
        descripcion: "",
    });
   
    const [error, setError] = useState<string>("");
    const [exito, setExito] = useState<string>("");
    const [empresa, setEmpresa] = useState<Empresa>({
        nombre: "",
        id: 0
    });
    const [catalogoCuentas, setCatalogoCuentas] = useState<any[]>([]);


    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() || { nombre: "", id: 0 });
    }, []);

    useEffect(() => {
        const obtenerCuentas = async () => {
            try {
                const response = await axios.get("/api/cuentas/catalogo");
                setCatalogoCuentas(response.data);
            } catch (error) {
                console.error("Error al obtener las cuentas:", error);
                alert("Error al obtener las cuentas");
            }
        };

        obtenerCuentas();
    }, []);

    const agregarDetallesVenta = (nuevaVenta: Compra) => {
        setDetallesVenta({ ...detallesVenta, ...nuevaVenta });
    }

    const agregarCuentasAfectadas = (cuentas: CuentaAfectada[]) => {
        setCuentasAfectadas(cuentas);
    };

    const agregarTransaccion = (nuevaTransaccion: Transaccion) => {
        setTransaccion({ ...transaccion, ...nuevaTransaccion });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const response = await axios.post("/api/transacciones/registrarOperacion", {
                cuentasAfectadas: [...cuentasAfectadas],
                transaccion,
                idEmpresa: empresa.id
            });
            if (response.status !== 200) {
                setError(response.data.message);
                return;
            }
            setExito("Compra registrada exitosamente");
            setTimeout(() => {
                setExito("");
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error("Error al registrar la compra:", error);
        }
    }

    const editarCompra = () => {
        setCuentasAfectadas([]);
        setDetallesVenta({
            subtotal: 0,
            iva: 0,
            total: 0,
        });
        setTransaccion({
            tipo: "Compra",
            fecha: "",
            descripcion: "",
        });
    }

    useEffect(() => {
        console.log(transaccion);
    }, [transaccion]);

    return (
        <div>
            <InfoVenta catalogoCuentas={catalogoCuentas} agregarDetallesVenta={agregarDetallesVenta} agregarCuentasAfectadas={agregarCuentasAfectadas} agregarTransaccion={agregarTransaccion} />
            <div className="relative">

                <div className="absolute right-8 top-4 flex items-center space-x-2 z-50">
                    <button
                        onClick={editarCompra}
                        className=" bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                    >
                        <Image src={editar.src} alt="editar" width={20} height={20} />
                        <span className="hidden md:inline-block">Editar Venta</span>
                    </button>
                    <button
                        className=" bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleSubmit}
                    >
                        <Image src={guardar.src} alt="guardar" width={20} height={20} />
                        <span className="hidden md:inline-block">Guardar Venta</span>
                    </button>
                </div>
                <TablaVentas detallesVenta={detallesVenta} cuentasAfectadas={cuentasAfectadas} />

            </div>
        </div>
    );
}

export default Ventas;