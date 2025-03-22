'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import guardar from "../../public/guardar.png";
import editar from "../../public/editar.png";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";
import { empresa } from "@/interfaces/cuenta";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import Error from "./Error";
import TablaAnticipo from "./TablaAnticipo";
import InfoRentaAnticipada from "./InfoRenta";
import Exito from "./Exito";


export const RentaAnticipada = () => {
    const [detallesCompra, setDetallesCompra] = useState<Compra>({
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
    const [catalogoCuentas, setCatalogoCuentas] = useState<any[]>([]);
    const [error, setError] = useState<string>("");
    const [exito, setExito] = useState<string>("");
    const [empresa, setEmpresa] = useState<empresa>({
        nombre: "",
        id: 0
    });
    const [mesesAnticipo, setMesesAnticipo] = useState<number>(0);

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



    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() || { nombre: "", id: 0 });
    }
        , []);

    const agregarDetallesCompra = (nuevaCompra: Compra) => {
        setDetallesCompra({ ...detallesCompra, ...nuevaCompra });
    };

    const agregarCuentasAfectadas = (cuentas: CuentaAfectada[]) => {
        setCuentasAfectadas(cuentas);
    }
    const agregarTransaccion = (transaccion: Transaccion) => {
        setTransaccion(transaccion);
    }

    // Funcion para editar la compra
    const editarCompra = () => {
        setCuentasAfectadas([]);
        setDetallesCompra({
            subtotal: 0,
            iva: 0,
            total: 0,
        });
        setTransaccion({
            tipo: "Anticipo de clientes",
            fecha: "",
            descripcion: "",
        });
        setMesesAnticipo(0);
    };

    const agregarMesesAnticipo = (meses: number) => {
        setMesesAnticipo(meses);
    }
    

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const response = await axios.post("/api/transacciones/registrarCompra", {
                detallesCompra,
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

            return;
        } catch (error) {
            setError("Error al registrar la compra");
            setTimeout(() => {
                setError("");
            }, 3000);
            console.error("Error al registrar la compra:", error);
        }
    }



    return (
        <div>
            {error && (
                <Error mensaje={error} />
            )}
            {exito && (
                <Exito mensaje={exito} />
            )}
            <InfoRentaAnticipada
                agregarDetallesAnticipo={agregarDetallesCompra}
                agregarCuentasAfectadas={agregarCuentasAfectadas}
                agregarTransaccion={agregarTransaccion}
                catalogoCuentas={catalogoCuentas}
                agregarMesesAnticipo={agregarMesesAnticipo}
            />

            <div className="relative">

                <div className="absolute right-8 top-4 flex items-center space-x-2 z-50">
                    <button
                        onClick={editarCompra}
                        className=" bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                    >
                        <Image src={editar.src} alt="editar" width={20} height={20} />
                        <span className="hidden md:inline-block">Editar Anticipo</span>
                    </button>
                    <button
                        className=" bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleSubmit}
                    >
                        <Image src={guardar.src} alt="guardar" width={20} height={20} />
                        <span className="hidden md:inline-block">Guardar Anticipo</span>
                    </button>
                </div>

                <TablaAnticipo
                    detallesCompra={detallesCompra}
                    cuentasAfectadas={cuentasAfectadas}
                />
            </div>

        </div>
    );
};

export default RentaAnticipada;