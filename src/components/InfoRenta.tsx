import React, { useEffect, useState } from "react";
import Image from "next/image";
import agregar from "../../public/agregar.png";
import Error from "./Error";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";


interface InfoRentaAnticipadaProps {
    agregarDetallesAnticipo: (anticipo: Compra) => void;
    agregarCuentasAfectadas: (cuentas: CuentaAfectada[]) => void;
    agregarTransaccion: (transaccion: Transaccion) => void;
    catalogoCuentas: CuentaCatalogo[];
    agregarMesesAnticipo: (meses: number) => void;
}

export const InfoRentaAnticipada = ({
    agregarDetallesAnticipo,
    agregarCuentasAfectadas,
    agregarTransaccion,
    catalogoCuentas,
    agregarMesesAnticipo,
}: InfoRentaAnticipadaProps) => {

    const [detallesRenta, setDetallesRenta] = useState<Compra>({
        subtotal: 0,
        iva: 0,
        total: 0,
    });

    const [cuentaAfectada, setCuentaAfectada] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [transaccion, setTransaccion] = useState<Transaccion>({
        tipo: "Venta",
        fecha: "",
        descripcion: "",
    });
    const [error, setError] = useState<string>("");
    const [ivaAcreditado, setIvaAcreditado] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [mesesAnticipo, setMesesAnticipo] = useState<number>(0);
    const cuentasEfectivo = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Caja" || cuenta.nombre === "Bancos");
    const [cuentaAnticipo, setCuentaAnticipo] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [detallesAnticipo, setDetallesAnticipo] = useState<Compra>({
        subtotal: 0,
        iva: 0,
        total: 0,
    });


    const handleMesesAnticipo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const meses = Number(e.target.value);
        setMesesAnticipo(meses);
    }

    const handleCuentaAfectadas = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const codigo = Number(e.target.value);
        const cuentaSeleccionada = catalogoCuentas.find((cuenta) => cuenta.codigo === codigo);
        setCuentaAfectada({
            id_cuenta_cat: cuentaSeleccionada?.id_cuenta_cat || 0,
            codigo: cuentaSeleccionada?.codigo || 0,
            nombre: cuentaSeleccionada?.nombre || "",
            debe: detallesAnticipo.total,
            haber: 0,
            tipo: cuentaSeleccionada?.tipo || "",
        });
    }

    const handleDescripcionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransaccion({
            ...transaccion,
            descripcion: e.target.value,
        });
    };

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransaccion({
            ...transaccion,
            fecha: e.target.value,
        });
    };

    // Función para calcular el IVA (16%)
    const calcularIVA = (subtotal: number) => {
        return subtotal * 0.16;
    };

    // Función para manejar cambios en el Total
    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorTotal = parseFloat(e.target.value.replace(/,/g, "")) || 0; // Eliminar comas y convertir a número
        const subtotal = valorTotal / 1.16; // Calcular subtotal
        const iva = calcularIVA(subtotal); // Calcular IVA

        setDetallesRenta({
            ...detallesRenta,
            total: valorTotal,
            subtotal: subtotal,
            iva: iva,
        });
    };

    // Función para manejar cambios en el Subtotal
    const handleSubtotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorSubtotal = parseFloat(e.target.value.replace(/,/g, "")) || 0;
        const iva = calcularIVA(valorSubtotal);
        const total = valorSubtotal + iva;

        setDetallesRenta({
            ...detallesRenta,
            subtotal: valorSubtotal,
            iva: iva,
            total: total,
        });
    };

    // Función para manejar cambios en el IVA
    const handleIvaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorIva = parseFloat(e.target.value.replace(/,/g, "")) || 0; // Eliminar comas y convertir a número
        const subtotal = valorIva / 0.16; // Calcular Subtotal
        const total = subtotal + valorIva; // Calcular Total

        setDetallesRenta({
            ...detallesRenta,
            iva: valorIva,
            subtotal: subtotal,
            total: total,
        });
    };

    const formatNumberWithCommas = (num: number) => {
        return num.toLocaleString();
    };


    useEffect(() => {
        setCuentaAfectada({
            ...cuentaAfectada,
            debe: 0,
            haber: detallesAnticipo.total,
        });
        agregarCuentadeIva();
    }, [detallesAnticipo]);

    useEffect(() => {
        setDetallesAnticipo({
            ...detallesAnticipo,
            subtotal: detallesRenta.subtotal * (mesesAnticipo || 1), // Multiplicar por el número de meses
            iva: detallesRenta.iva * (mesesAnticipo || 1), // Multiplicar por el número de meses
            total: detallesRenta.total * (mesesAnticipo || 1), // Multiplicar por el número de meses
        });
        agregarCuentadeIva();
    }, [detallesRenta, mesesAnticipo]);

    const agregarCuentadeIva = () => {
        const ivaAcreditado = catalogoCuentas.find((cuenta) => cuenta.nombre === "IVA acreditado");
        setIvaAcreditado({
            id_cuenta_cat: ivaAcreditado?.id_cuenta_cat || 0,
            codigo: ivaAcreditado?.codigo || 0,
            nombre: ivaAcreditado?.nombre || "",
            debe: detallesAnticipo.iva,
            haber: 0,
            tipo: ivaAcreditado?.tipo || "",
        });
    };

    useEffect(() => {
        const cuentaAnticipo = catalogoCuentas.find((cuenta) => cuenta.nombre === "Renta pagada por anticipado");
        setCuentaAnticipo({
            id_cuenta_cat: cuentaAnticipo?.id_cuenta_cat || 0,
            codigo: cuentaAnticipo?.codigo || 0,
            nombre: cuentaAnticipo?.nombre || "",
            debe: detallesAnticipo.subtotal,
            haber: 0,
            tipo: cuentaAnticipo?.tipo || "",
        });
    }, [detallesAnticipo]);


    const handleAgregarVenta = () => {
        agregarDetallesAnticipo(detallesAnticipo);
        agregarMesesAnticipo(mesesAnticipo);
        agregarCuentasAfectadas([cuentaAfectada, ivaAcreditado, cuentaAnticipo]);
        agregarTransaccion(transaccion);
    }



    return (
        <div className="flex justify-between bg-[#F5F5F5] flex-col">
            {error && <Error mensaje={error} />}

            <div className="bg-[#F5F5F5] flex items-center mt-3 jus p-6 pb-4 pt-0">
                <div className="p-4 h-auto bg-white drop-shadow-md rounded-md flex flex-col w-full gap-4 ">
                    <div className="w-full flex gap-6">
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




                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="cuentaAfectada">Abonar a: </label>
                            <select
                                name="cuentaAfectada"
                                onChange={handleCuentaAfectadas}
                                className="px-2 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            >
                                <option value="">Selecciona una cuenta</option>
                                {cuentasEfectivo.map((cuenta, index) => (
                                    <option key={index} value={cuenta.codigo}>
                                        {`${cuenta.codigo} - ${cuenta.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="mesesAnticipo">Meses de anticipo: </label>
                            <input
                                type="number"
                                min={0}
                                max={12}
                                name="mesesAnticipo"
                                value={mesesAnticipo}
                                onChange={handleMesesAnticipo}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>
                    </div>

                    <div className=" flex gap-4 w-full items-center">
                        <h2 className=" font-semibold text-center">Precio mensual:</h2>
                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="total">Total: </label>
                            <input
                                type="text"
                                name="total"
                                value={formatNumberWithCommas(detallesRenta.total)} // Formatear con comas
                                onChange={handleTotalChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>


                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="subtotal">Subtotal: </label>
                            <input
                                type="text"
                                name="subtotal"
                                value={formatNumberWithCommas(detallesRenta.subtotal)} // Formatear con comas
                                onChange={handleSubtotalChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>


                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="iva">IVA (16%): </label>
                            <input
                                type="text"
                                name="iva"
                                value={formatNumberWithCommas(detallesRenta.iva)} // Formatear con comas
                                onChange={handleIvaChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>

                        <button
                            onClick={handleAgregarVenta}
                            className="bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                        >
                            <span>
                                <Image src={agregar.src} alt="agregar" width={20} height={20} />
                            </span>
                            <span className="hidden md:inline-block ml-1">Agregar Anticipo</span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default InfoRentaAnticipada;