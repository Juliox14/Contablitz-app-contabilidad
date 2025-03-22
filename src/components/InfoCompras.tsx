import React, { useEffect, useState } from "react";
import Image from "next/image";
import agregar from "../../public/agregar.png";
import axios from "axios";
import Error from "./Error";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";


interface InfoCompraProps {
    agregarDetallesCompra: (compra: Compra) => void;
    agregarCuentasAfectadas: (cuentas: CuentaAfectada[]) => void;
    agregarTransaccion: (transaccion: Transaccion) => void;
    catalogoCuentas: CuentaCatalogo[];
    agregarCuentaSeleccionada: (cuenta: CuentaAfectada) => void;
}

export const InfoCompra = ({
    agregarDetallesCompra,
    agregarCuentasAfectadas,
    agregarTransaccion,
    catalogoCuentas,
    agregarCuentaSeleccionada,
}: InfoCompraProps) => {
    // Maneja los cambios en los campos de entrada
    const [detallesCompra, setDetallesCompra] = useState<Compra>({
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
    const [cuentaAfectadaEfectivo, setCuentaAfectadaEfectivo] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [cuentaAfectadaCredito, setCuentaAfectadaCredito] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [transaccion, setTransaccion] = useState<Transaccion>({
        tipo: "Compra",
        fecha: "",
        descripcion: "",
    });
    const [error, setError] = useState<string>("");
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState<CuentaAfectada>({ id_cuenta_cat: 0, codigo: 0, nombre: "", tipo: "" });
    const [tipoPago, setTipoPago] = useState<string>("efectivo");
    const cuentasEfectivo = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Caja" || cuenta.nombre === "Bancos");
    const cuentasCredito = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Acreedores a corto plazo" || cuenta.nombre === "Acreedores a largo plazo");
    const [ivaAcreditado, setIvaAcreditado] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [ivaPorAcreditar, setIvaPorAcreditar] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [porcentajeEfectivo, setPorcentajeEfectivo] = useState<any>(Number(50));
    const [porcentajeCredito, setPorcentajeCredito] = useState<any>(Number(50));



    const handlePorcentajeEfectivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoPorcentajeEfectivo = parseFloat(e.target.value);
        setPorcentajeEfectivo(nuevoPorcentajeEfectivo);
        setPorcentajeCredito(100 - nuevoPorcentajeEfectivo);
    };

    const handlePorcentajeCreditoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevoPorcentajeCredito = parseFloat(e.target.value);
        setPorcentajeCredito(nuevoPorcentajeCredito);
        setPorcentajeEfectivo(100 - nuevoPorcentajeCredito);
    };


    const handleTipoPagoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoPago(e.target.value);
        setTransaccion({
            ...transaccion,
            tipo: formatearTipo(e.target.value),
        });
    }

    const formatearTipo = (tipo: string) => {
        switch (tipo) {
            case "efectivo":
                return "Compra en efectivo";
            case "credito":
                return "Compra a crédito";
            case "combinada":
                return "Compra combinada";
            default:
                return "Compra";
        }
    };

    const handleCuentaAfectadas = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (tipoPago === "combinada") {
            const codigo = Number(e.target.value);
            const cuentaSelec = cuentasEfectivo.find((cuenta) => cuenta.codigo === codigo);
            if (cuentaSelec) {
                setCuentaAfectadaEfectivo({
                    id_cuenta_cat: cuentaSelec.id_cuenta_cat,
                    codigo: cuentaSelec.codigo,
                    nombre: cuentaSelec.nombre,
                    debe: 0,
                    haber: detallesCompra.total * (porcentajeEfectivo / 100),
                    tipo: cuentaSelec.tipo,
                });
                return
            }
            const cuentaSelecCredito = cuentasCredito.find((cuenta) => cuenta.codigo === codigo);
            if (cuentaSelecCredito) {
                setCuentaAfectadaCredito({
                    id_cuenta_cat: cuentaSelecCredito.id_cuenta_cat,
                    codigo: cuentaSelecCredito.codigo,
                    nombre: cuentaSelecCredito.nombre,
                    debe: 0,
                    haber: detallesCompra.total * (porcentajeCredito / 100),
                    tipo: cuentaSelecCredito.tipo,
                });
            }
            return;
        }

        const codigo = Number(e.target.value);
        const cuentaSeleccionada = catalogoCuentas.find((cuenta) => cuenta.codigo === codigo);
        setCuentaAfectada({
            id_cuenta_cat: cuentaSeleccionada?.id_cuenta_cat || 0,
            codigo: cuentaSeleccionada?.codigo || 0,
            nombre: cuentaSeleccionada?.nombre || "",
            debe: 0,
            haber: detallesCompra.total,
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

    const handleCuentaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const codigo = Number(e.target.value);
        const cuentaSeleccionada = catalogoCuentas.find(
            (cuenta) => cuenta.codigo === codigo
        );
        setCuentaSeleccionada(cuentaSeleccionada || { id: 0, id_cuenta_cat: 0, codigo: 0, nombre: "", tipo: "" });
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

        setDetallesCompra({
            ...detallesCompra,
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

        setDetallesCompra({
            ...detallesCompra,
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

        setDetallesCompra({
            ...detallesCompra,
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
            haber: detallesCompra.total,
        });
        agregarCuentadeIva();
    }, [detallesCompra]);

    useEffect(() => {
        setCuentaAfectadaEfectivo({
            ...cuentaAfectadaEfectivo,
            debe: 0,
            haber: detallesCompra.total * (porcentajeEfectivo / 100),
        });
        setCuentaAfectadaCredito({
            ...cuentaAfectadaCredito,
            debe: 0,
            haber: detallesCompra.total * (porcentajeCredito / 100),
        });
        agregarCuentadeIva();
    
    }, [detallesCompra, porcentajeEfectivo, porcentajeCredito]);  // Usa variables explícitas como dependencias
    





    const agregarCuentadeIva = () => {
        if (tipoPago === "efectivo") {
            const ivaAcreditado = catalogoCuentas.find((cuenta: any) => cuenta.nombre === "IVA acreditado");
            if (ivaAcreditado) {
                setIvaAcreditado({
                    id_cuenta_cat: ivaAcreditado.id_cuenta_cat,
                    codigo: ivaAcreditado.codigo,
                    nombre: ivaAcreditado.nombre,
                    debe: detallesCompra.iva,
                    haber: 0,
                    tipo: ivaAcreditado.tipo,
                });
            }
        } else if (tipoPago === "credito") {
            const ivaPorAcreditar = catalogoCuentas.find((cuenta: any) => cuenta.nombre === "IVA por acreditar");
            if (ivaPorAcreditar) {
                setIvaPorAcreditar({
                    id_cuenta_cat: ivaPorAcreditar.id_cuenta_cat,
                    codigo: ivaPorAcreditar.codigo,
                    nombre: ivaPorAcreditar.nombre,
                    debe: detallesCompra.iva,
                    haber: 0,
                    tipo: ivaPorAcreditar.tipo,
                });
            }
        } else if (tipoPago === "combinada") {
            const ivaAcreditado = catalogoCuentas.find((cuenta: any) => cuenta.nombre === "IVA acreditado");
            const ivaPorAcreditar = catalogoCuentas.find((cuenta: any) => cuenta.nombre === "IVA por acreditar");

            if (ivaAcreditado && ivaPorAcreditar) {
                setIvaAcreditado({
                    id_cuenta_cat: ivaAcreditado.id_cuenta_cat,
                    codigo: ivaAcreditado.codigo,
                    nombre: ivaAcreditado.nombre,
                    debe: detallesCompra.iva * (porcentajeEfectivo / 100),
                    haber: 0,
                    tipo: ivaAcreditado.tipo,
                });

                setIvaPorAcreditar({
                    id_cuenta_cat: ivaPorAcreditar.id_cuenta_cat,
                    codigo: ivaPorAcreditar.codigo,
                    nombre: ivaPorAcreditar.nombre,
                    debe: detallesCompra.iva * (porcentajeCredito / 100),
                    haber: 0,
                    tipo: ivaPorAcreditar.tipo,
                });
            }
        }
    };





    const handleAgregarCompra = () => {
        if (!validarCampos()) {
            return;
        }
        agregarDetallesCompra(detallesCompra);
        if (tipoPago === "efectivo") {
            agregarCuentasAfectadas([cuentaAfectada, ivaAcreditado]);
        }
        if (tipoPago === "credito") {
            agregarCuentasAfectadas([cuentaAfectada, ivaPorAcreditar]);
        }
        if (tipoPago === "combinada") {
            agregarCuentasAfectadas([cuentaAfectadaEfectivo, cuentaAfectadaCredito, ivaAcreditado, ivaPorAcreditar]);
        }
        agregarTransaccion(transaccion);

        agregarCuentaSeleccionada({ ...cuentaSeleccionada, debe: detallesCompra.subtotal, haber: 0 });
    }

    const validarCampos = () => {

        if (!transaccion.descripcion || !transaccion.fecha) {
            setError("Por favor, completa todos los campos.");
            setTimeout(() => {
                setError("");
            }, 3000);
            return false;
        }
        return true;
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

                    {/* Cuenta de lo que se compra */}
                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="cuenta">Cuenta: </label>
                        <select
                            name="cuenta"
                            value={cuentaSeleccionada?.codigo}
                            onChange={handleCuentaChange}
                            className="px-2 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        >
                            <option value="">Selecciona una cuenta</option>
                            {catalogoCuentas.map((cuenta, index) => (
                                <option key={index} value={cuenta.codigo}>
                                    {`${cuenta.codigo} - ${cuenta.nombre}`}
                                </option>
                            ))}
                        </select>
                        {/* No ves la cuenta que buscas, añade una */}
                        <button
                            className="text-blue-600 hover:underline w-40 text-xs cursor-pointer"
                            onClick={() => alert("Añadir cuenta")}
                        >
                            ¿No ves la cuenta que buscas?
                        </button>
                    </div>

                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="tipoPago">Tipo de Pago: </label>
                        <select
                            name="tipoPago"
                            value={tipoPago}
                            onChange={handleTipoPagoChange}
                            className="px-2 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="credito">Crédito</option>
                            <option value="combinada">Combinada</option>
                        </select>
                    </div>

                    {(tipoPago === "efectivo" || tipoPago === "combinada") && (
                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="cuentaAfectada">Afectar a: </label>
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
                    )}

                    {(tipoPago === "credito" || tipoPago === "combinada") && (
                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="cuentaCredito">Tipo de crédito: </label>
                            <select
                                name="cuentaCredito"
                                onChange={handleCuentaAfectadas}
                                className="px-2 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            >
                                <option value="">Selecciona una cuenta</option>
                                {cuentasCredito.map((cuenta, index) => (
                                    <option key={index} value={cuenta.codigo}>
                                        {`${cuenta.codigo} - ${cuenta.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {tipoPago === "combinada" && (
                        <div className="flex gap-4">
                            {/* Porcentaje en efectivo */}
                            <div className="max-w-sm flex items-center gap-2">
                                <label htmlFor="porcentajeEfectivo">Efectivo (%): </label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    name="porcentajeEfectivo"
                                    value={porcentajeEfectivo}
                                    onChange={handlePorcentajeEfectivoChange}
                                    className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>

                            {/* Porcentaje en crédito */}
                            <div className="max-w-sm flex items-center gap-2">
                                <label htmlFor="porcentajeCredito">Crédito (%): </label>
                                <input
                                    type="number"
                                    min={0}
                                    max={100}
                                    name="porcentajeCredito"
                                    value={porcentajeCredito}
                                    onChange={handlePorcentajeCreditoChange}
                                    className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>
                        </div>
                    )}



                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="total">Total: </label>
                        <input
                            type="text"
                            name="total"
                            value={formatNumberWithCommas(detallesCompra.total)} // Formatear con comas
                            onChange={handleTotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="subtotal">Subtotal: </label>
                        <input
                            type="text"
                            name="subtotal"
                            value={formatNumberWithCommas(detallesCompra.subtotal)} // Formatear con comas
                            onChange={handleSubtotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="iva">IVA (16%): </label>
                        <input
                            type="text"
                            name="iva"
                            value={formatNumberWithCommas(detallesCompra.iva)} // Formatear con comas
                            onChange={handleIvaChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <button
                        onClick={handleAgregarCompra}
                        className="bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                    >
                        <span>
                            <Image src={agregar.src} alt="agregar" width={20} height={20} />
                        </span>
                        <span className="hidden md:inline-block ml-1">Agregar Compra</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default InfoCompra;