import React, { useEffect, useState } from "react";
import Image from "next/image";
import agregar from "../../../../public/agregar.png";
import Error from "../../Error";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";


interface InfoVentaProps {
    agregarDetallesAnticipo: (anticipo: Compra) => void;
    agregarCuentasAfectadas: (cuentas: CuentaAfectada[]) => void;
    agregarTransaccion: (transaccion: Transaccion) => void;
    catalogoCuentas: CuentaCatalogo[];
    agregarPorcentaje: (porcentaje: number) => void;
}

export const InfoAnticipo = ({
    agregarDetallesAnticipo,
    agregarCuentasAfectadas,
    agregarTransaccion,
    catalogoCuentas,
    agregarPorcentaje,
}: InfoVentaProps) => {
    const [detallesVenta, setDetallesVenta] = useState<Compra>({
        subtotal: 0,
        iva: 0,
        total: 0,
    });
    const [detallesAnticipo, setDetallesAnticipo] = useState<Compra>({
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
    const [ivaTrasladado, setIvaTrasladado] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [porcentajeAnticipo, setPorcentajeAnticipo] = useState<number>(50);
    const cuentasEfectivo = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Caja" || cuenta.nombre === "Bancos");
    const [cuentaAnticipo, setCuentaAnticipo] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });

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

        setDetallesVenta({
            ...detallesVenta,
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

        setDetallesVenta({
            ...detallesVenta,
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

        setDetallesVenta({
            ...detallesVenta,
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
            haber: detallesVenta.total,
        });
        agregarCuentadeIva();
    }, [detallesVenta]);



    const agregarCuentadeIva = () => {
        const ivaTrasladado = catalogoCuentas.find((cuenta) => cuenta.nombre === "IVA trasladado");
        setIvaTrasladado({
            id_cuenta_cat: ivaTrasladado?.id_cuenta_cat || 0,
            codigo: ivaTrasladado?.codigo || 0,
            nombre: ivaTrasladado?.nombre || "",
            debe: 0,
            haber: detallesVenta.iva,
            tipo: ivaTrasladado?.tipo || "",
        });
    };


    const handlePorcentajeAnticipoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorPorcentaje = parseFloat(e.target.value) || 0;
        setPorcentajeAnticipo(valorPorcentaje);

        const nuevoTotal = (detallesVenta.total * valorPorcentaje) / 100;
        const nuevoSubtotal = nuevoTotal / 1.16;
        const nuevoIva = calcularIVA(nuevoSubtotal);

        setDetallesVenta({
            ...detallesVenta,
            total: nuevoTotal,
            subtotal: nuevoSubtotal,
            iva: nuevoIva,
        });
    }


    useEffect(() => {
        setDetallesAnticipo({
            ...detallesAnticipo,
            total: detallesVenta.total * (porcentajeAnticipo / 100),
            subtotal: detallesVenta.subtotal * (porcentajeAnticipo / 100),
            iva: detallesVenta.iva * (porcentajeAnticipo / 100),
        });
    }, [detallesVenta]);

    useEffect(() => {
        setDetallesAnticipo({
            ...detallesAnticipo,
            total: detallesVenta.total * (porcentajeAnticipo / 100),
            subtotal: detallesVenta.subtotal * (porcentajeAnticipo / 100),
            iva: detallesVenta.iva * (porcentajeAnticipo / 100),
        });
    }, [porcentajeAnticipo]);

    useEffect(() => {
        setCuentaAfectada({
            ...cuentaAfectada,
            debe: detallesAnticipo.total,
            haber: 0,
        });
        setIvaTrasladado({
            ...ivaTrasladado,
            debe: 0,
            haber: detallesAnticipo.iva,
        });
        const AnticipoClientes = catalogoCuentas.find((cuenta) => cuenta.nombre === "Anticipo de clientes");
        setCuentaAnticipo({
            id_cuenta_cat: AnticipoClientes?.id_cuenta_cat || 0,
            codigo: AnticipoClientes?.codigo || 0,
            nombre: AnticipoClientes?.nombre || "",
            debe: 0,
            haber: detallesAnticipo.subtotal,
            tipo: AnticipoClientes?.tipo || "",
        });
    }, [detallesAnticipo]);

    const handleAgregarVenta = () => {
        agregarDetallesAnticipo(detallesAnticipo);
        agregarCuentasAfectadas([cuentaAfectada, ivaTrasladado, cuentaAnticipo]);
        agregarTransaccion(transaccion);
        agregarPorcentaje(porcentajeAnticipo);
    }





    return (
        <div className="flex justify-between bg-[#F5F5F5] flex-col">
            {error && <Error mensaje={error} />}
            {/* Titulo */}
            {/* Primera fila: Inputs principales */}
            <div className="bg-[#F5F5F5] flex items-center mt-3 jus p-6 pb-4 pt-0">
                <div className="p-4 h-auto bg-white drop-shadow-md rounded-md flex gap-4 items-center flex-wrap">
                    {/* Descripción */}
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
                        <label htmlFor="porcentajeAnticipo">Porcentaje de anticipo (%): </label>
                        <input
                            type="number"
                            min={0}
                            max={100}
                            name="porcentajeAnticipo"
                            value={porcentajeAnticipo}
                            onChange={handlePorcentajeAnticipoChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="total">Total: </label>
                        <input
                            type="text"
                            name="total"
                            value={formatNumberWithCommas(detallesVenta.total)} // Formatear con comas
                            onChange={handleTotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="subtotal">Subtotal: </label>
                        <input
                            type="text"
                            name="subtotal"
                            value={formatNumberWithCommas(detallesVenta.subtotal)} // Formatear con comas
                            onChange={handleSubtotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="iva">IVA (16%): </label>
                        <input
                            type="text"
                            name="iva"
                            value={formatNumberWithCommas(detallesVenta.iva)} // Formatear con comas
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
        </div >
    );
};

export default InfoAnticipo;