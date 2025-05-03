import React, { useEffect, useState } from "react";
import Image from "next/image";
import agregar from "../../../../public/agregar.png";
import Error from "../../Error";
import { CuentaAfectada } from "@/interfaces/cuenta";
import { Compra } from "@/interfaces/transacciones";
import { CuentaCatalogo } from "@/interfaces/cuenta";
import { Transaccion } from "@/interfaces/transacciones";


interface InfoVentaProps {
    agregarDetallesVenta: (nuevaVenta: Compra) => void;
    agregarCuentasAfectadas: (cuentas: CuentaAfectada[]) => void;
    agregarTransaccion: (transaccion: Transaccion) => void;
    catalogoCuentas: CuentaCatalogo[];
}

export const InfoVenta = ({
    agregarDetallesVenta,
    agregarCuentasAfectadas,
    agregarTransaccion,
    catalogoCuentas,
}: InfoVentaProps) => {
    const [detallesVenta, setDetallesVenta] = useState<Compra>({
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
    const [cuentaCosto, setCuentaCosto] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });

    const [cuentaMercancia, setCuentaMercancia] = useState<CuentaAfectada>({
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
    const [cuentaVentas, setCuentaVentas] = useState<CuentaAfectada>({
        id_cuenta_cat: 0,
        codigo: 0,
        nombre: "",
        debe: 0,
        haber: 0,
        tipo: "",
    });
    const [tipoVenta, setTipoVenta] = useState<"contado" | "credito">("contado");
    const cuentaCaja = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Caja")
    const cuentaBancos = catalogoCuentas.filter((cuenta) => cuenta.nombre === "Bancos");
    const cuentasEfectivo = [...cuentaCaja, ...cuentaBancos];
    const [tipoProducto, setTipoProducto] = useState<"mercancia" | "servicio">("mercancia");
    const [usarAnticipo, setUsarAnticipo] = useState<boolean>(false);
    const cuentaDescuentoSobreVentas = catalogoCuentas.find((cuenta) => cuenta.nombre === "Descuentos sobre ventas");
    const cuentaRebajaSobreVentas = catalogoCuentas.find((cuenta) => cuenta.nombre === "Rebajas sobre ventas");
    const cuentaDevolucionSobreVentas = catalogoCuentas.find((cuenta) => cuenta.nombre === "Devoluciones sobre compras");
    const [descuento, setDescuento] = useState<number>(0);
    const [rebaja, setRebaja] = useState<number>(0);
    const [devolucion, setDevolucion] = useState<number>(0);
    const [cuentaElegidaManual, setCuentaElegidaManual] = useState(false);





    const handleCuentaAfectadas = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const codigo = Number(e.target.value);
        const cuentaSeleccionada = catalogoCuentas.find((cuenta) => cuenta.codigo === codigo);

        setCuentaAfectada({
            id_cuenta_cat: cuentaSeleccionada?.id_cuenta_cat || 0,
            codigo: cuentaSeleccionada?.codigo || 0,
            nombre: cuentaSeleccionada?.nombre || "",
            debe: detallesVenta.total,
            haber: 0,
            tipo: cuentaSeleccionada?.tipo || "",
        });

        setCuentaElegidaManual(true);
    };


    const handleCostoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorCosto = parseFloat(e.target.value.replace(/,/g, "")) || 0;
        const cuentaCostoSeleccionada = catalogoCuentas.find((cuenta) => cuenta.nombre === "Costo de lo vendido");
        const cuentaMercanciaSeleccionada = catalogoCuentas.find((cuenta) => cuenta.nombre === "Mercancías");
        setCuentaCosto({
            id_cuenta_cat: cuentaCostoSeleccionada?.id_cuenta_cat || 0,
            codigo: cuentaCostoSeleccionada?.codigo || 0,
            nombre: cuentaCostoSeleccionada?.nombre || "",
            debe: valorCosto,
            haber: 0,
            tipo: cuentaCostoSeleccionada?.tipo || "",
        });
        setCuentaMercancia({
            id_cuenta_cat: cuentaMercanciaSeleccionada?.id_cuenta_cat || 0,
            codigo: cuentaMercanciaSeleccionada?.codigo || 0,
            nombre: cuentaMercanciaSeleccionada?.nombre || "",
            debe: 0,
            haber: valorCosto,
            tipo: cuentaMercanciaSeleccionada?.tipo || "",
        });
    };

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

    const calcularIVA = (subtotal: number) => {
        return subtotal * 0.16;
    };

    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorTotal = parseFloat(e.target.value.replace(/,/g, "")) || 0;
        const subtotal = valorTotal / 1.16;
        const iva = calcularIVA(subtotal);

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

    const handleIvaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorIva = parseFloat(e.target.value.replace(/,/g, "")) || 0;
        const subtotal = valorIva / 0.16;
        const total = subtotal + valorIva;

        setDetallesVenta({
            ...detallesVenta,
            iva: valorIva,
            subtotal: subtotal,
            total: total,
        });
    };


    useEffect(() => {
        if (!cuentaElegidaManual) {
            let cuentaDestino: CuentaCatalogo | undefined;

            if (tipoVenta === "contado") {
                cuentaDestino = catalogoCuentas.find((cuenta) => cuenta.nombre === "Caja" || cuenta.nombre === "Bancos");
            } else {
                cuentaDestino = catalogoCuentas.find((cuenta) => cuenta.nombre === "Clientes" || cuenta.nombre === "Cuentas por cobrar");
            }

            if (cuentaDestino) {
                setCuentaAfectada({
                    id_cuenta_cat: cuentaDestino.id_cuenta_cat,
                    codigo: cuentaDestino.codigo,
                    nombre: cuentaDestino.nombre,
                    debe: detallesVenta.total,
                    haber: 0,
                    tipo: cuentaDestino.tipo,
                });
            }
        }

        const cuentaIngresos = catalogoCuentas.find((cuenta) =>
            tipoProducto === "servicio"
                ? cuenta.nombre === "Ingreso por servicios"
                : cuenta.nombre === "Ventas"
        );

        setCuentaVentas({
            id_cuenta_cat: cuentaIngresos?.id_cuenta_cat || 0,
            codigo: cuentaIngresos?.codigo || 0,
            nombre: cuentaIngresos?.nombre || "",
            debe: 0,
            haber: detallesVenta.subtotal,
            tipo: cuentaIngresos?.tipo || "",
        });

        agregarCuentadeIva();
    }, [detallesVenta, tipoVenta, tipoProducto]);

    useEffect(() => {
        // Si el usuario ya eligió la cuenta manualmente, solo actualizamos el monto
        if (cuentaElegidaManual) {
            setCuentaAfectada((prev) => ({
                ...prev,
                debe: detallesVenta.total,
            }));
        }
    }, [detallesVenta.total]);


    useEffect(() => {
        const tipoVentaTexto = tipoVenta === "contado" ? "Venta en efectivo" : "Venta a crédito";
        const descripcionFinal = tipoProducto === "servicio" ? "Servicio" : "Mercancía";

        setTransaccion((prev) => ({
            ...prev,
            tipo: `${tipoVentaTexto} de ${descripcionFinal}`,
        }));
    }, [tipoVenta, tipoProducto]);


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

    const handleAgregarVenta = () => {
        agregarDetallesVenta(detallesVenta);

        const cuentas: CuentaAfectada[] = [];

        cuentas.push(cuentaAfectada);
        cuentas.push(cuentaVentas);
        cuentas.push(ivaTrasladado);

        if (descuento > 0) {

            const nuevoDetallesCuentaDescuentoSobreVentas: CuentaAfectada = {
                id_cuenta_cat: cuentaDescuentoSobreVentas?.id_cuenta_cat || 0,
                codigo: cuentaDescuentoSobreVentas?.codigo || 0,
                nombre: cuentaDescuentoSobreVentas?.nombre || "",
                debe: ((detallesVenta.total * (descuento / 100)) / 1.16),
                haber: 0,
                tipo: cuentaDescuentoSobreVentas?.tipo || "",
            };

            const nuevoIvaTrasladado: CuentaAfectada = {
                id_cuenta_cat: ivaTrasladado.id_cuenta_cat,
                codigo: ivaTrasladado.codigo,
                nombre: ivaTrasladado.nombre,
                debe: (detallesVenta.total * (descuento / 100) / 1.16) * 0.16,
                haber: 0,
                tipo: ivaTrasladado.tipo,
            };

            const nuevaCuentaAfectada: CuentaAfectada = {
                id_cuenta_cat: cuentaAfectada.id_cuenta_cat,
                codigo: cuentaAfectada.codigo,
                nombre: cuentaAfectada.nombre,
                debe: 0,
                haber: detallesVenta.total * (descuento / 100),
                tipo: cuentaAfectada.tipo,
            };

            cuentas.push(nuevoDetallesCuentaDescuentoSobreVentas);
            cuentas.push(nuevoIvaTrasladado);
            cuentas.push(nuevaCuentaAfectada);
        }
        if (rebaja > 0) {

            const nuevoDetallesCuentaRebajaSobreVentas: CuentaAfectada = {
                id_cuenta_cat: cuentaRebajaSobreVentas?.id_cuenta_cat || 0,
                codigo: cuentaRebajaSobreVentas?.codigo || 0,
                nombre: cuentaRebajaSobreVentas?.nombre || "",
                debe: rebaja / 1.16,
                haber: 0,
                tipo: cuentaRebajaSobreVentas?.tipo || "",
            };

            const nuevoIvaTrasladado: CuentaAfectada = {
                id_cuenta_cat: ivaTrasladado.id_cuenta_cat,
                codigo: ivaTrasladado.codigo,
                nombre: ivaTrasladado.nombre,
                debe: (rebaja / 1.16) * 0.16,
                haber: 0,
                tipo: ivaTrasladado.tipo,
            };

            const nuevaCuentaAfectada: CuentaAfectada = {
                id_cuenta_cat: cuentaAfectada.id_cuenta_cat,
                codigo: cuentaAfectada.codigo,
                nombre: cuentaAfectada.nombre,
                debe: 0,
                haber: rebaja,
                tipo: cuentaAfectada.tipo,
            };


            cuentas.push(nuevoDetallesCuentaRebajaSobreVentas);
            cuentas.push(nuevoIvaTrasladado);
            cuentas.push(nuevaCuentaAfectada);

        } if (devolucion > 0) {
            const cuentaDevolucionSobreVentas = catalogoCuentas.find(c => c.nombre === "Devoluciones sobre ventas");

            const nuevaCuentaDevolucionSobreVentas: CuentaAfectada = {
                id_cuenta_cat: cuentaDevolucionSobreVentas?.id_cuenta_cat || 0,
                codigo: cuentaDevolucionSobreVentas?.codigo || 0,
                nombre: cuentaDevolucionSobreVentas?.nombre || "",
                debe: devolucion / 1.16,
                haber: 0,
                tipo: cuentaDevolucionSobreVentas?.tipo || "",
            };


            const nuevoIvaTrasladado: CuentaAfectada = {
                id_cuenta_cat: ivaTrasladado.id_cuenta_cat,
                codigo: ivaTrasladado.codigo,
                nombre: ivaTrasladado.nombre,
                debe: (devolucion / 1.16) * 0.16,
                haber: 0,
                tipo: ivaTrasladado.tipo,
            };

            const nuevaCuentaAfectada: CuentaAfectada = {
                id_cuenta_cat: cuentaAfectada.id_cuenta_cat,
                codigo: cuentaAfectada.codigo,
                nombre: cuentaAfectada.nombre,
                debe: 0,
                haber: devolucion,
                tipo: cuentaAfectada.tipo,
            };

            cuentas.push(nuevaCuentaDevolucionSobreVentas);
            cuentas.push(nuevoIvaTrasladado);
            cuentas.push(nuevaCuentaAfectada);
        }

        else {

            // Clientes
            const cliente = catalogoCuentas.find(c => c.nombre === "Clientes");
            if (cliente) {
                cuentas.push({
                    id_cuenta_cat: cliente.id_cuenta_cat,
                    codigo: cliente.codigo,
                    nombre: cliente.nombre,
                    debe: detallesVenta.total,
                    haber: 0,
                    tipo: cliente.tipo,
                });
            }

            // Ingreso
            cuentas.push(cuentaVentas);

            // IVA
            cuentas.push({
                ...ivaTrasladado,
                haber: detallesVenta.iva,
            });

            if (tipoProducto === "mercancia") {
                cuentas.push(cuentaCosto);
                cuentas.push(cuentaMercancia);
            }

            if (usarAnticipo) {
                const anticipo = catalogoCuentas.find(c => c.nombre === "Anticipo de clientes");
                if (anticipo) {
                    cuentas.push({
                        id_cuenta_cat: anticipo.id_cuenta_cat,
                        codigo: anticipo.codigo,
                        nombre: anticipo.nombre,
                        debe: detallesVenta.subtotal,
                        haber: 0,
                        tipo: anticipo.tipo,
                    });
                }

                const ivaPorTrasladar = catalogoCuentas.find(c => c.nombre === "IVA por trasladar");
                if (ivaPorTrasladar) {
                    cuentas.push({
                        id_cuenta_cat: ivaPorTrasladar.id_cuenta_cat,
                        codigo: ivaPorTrasladar.codigo,
                        nombre: ivaPorTrasladar.nombre,
                        debe: detallesVenta.iva,
                        haber: 0,
                        tipo: ivaPorTrasladar.tipo,
                    });
                }
            }


        }
        
        agregarTransaccion({
            ...transaccion,
            tipo: `Venta ${transaccion.descripcion}`,
        });
        agregarCuentasAfectadas(cuentas);
    };

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
                            placeholder="Breve descripción de la venta"
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
                        <label htmlFor="tipoVenta">Tipo de venta:</label>
                        <select
                            name="tipoVenta"
                            value={tipoVenta}
                            onChange={(e) => setTipoVenta(e.target.value as "contado" | "credito")}
                            className="px-2 py-2 bg-transparent text-slate-600 text-sm border border-slate-200 rounded-md"
                        >
                            <option value="contado">Contado</option>
                            <option value="credito">Crédito</option>
                        </select>
                    </div>

                    {tipoVenta === "contado" && (
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
                    )}

                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="tipoProducto">Tipo de producto:</label>
                        <select
                            name="tipoProducto"
                            value={tipoProducto}
                            onChange={(e) => setTipoProducto(e.target.value as "mercancia" | "servicio")}
                            className="px-2 py-2 bg-transparent text-slate-600 text-sm border border-slate-200 rounded-md"
                        >
                            <option value="mercancia">Mercancía</option>
                            <option value="servicio">Servicio</option>
                        </select>
                    </div>

                    {(tipoProducto === "mercancia" && (!descuento && !rebaja && !devolucion)) && (
                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="costo">Costo de lo vendido: </label>
                            <input
                                type="text"
                                name="costo"
                                value={cuentaCosto.debe}
                                onChange={handleCostoChange}
                                className="px-3 py-2 bg-transparent text-slate-600 text-sm border border-slate-200 rounded-md"
                            />
                        </div>
                    )}

                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="total">Total: </label>
                        <input
                            type="text"
                            name="total"
                            value={detallesVenta.total}
                            onChange={handleTotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="subtotal">Subtotal: </label>
                        <input
                            type="text"
                            name="subtotal"
                            value={detallesVenta.subtotal}
                            onChange={handleSubtotalChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="iva">IVA (16%): </label>
                        <input
                            type="text"
                            name="iva"
                            value={detallesVenta.iva}
                            onChange={handleIvaChange}
                            className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        />
                    </div>


                    {tipoVenta === "contado" && (
                        <div className="flex gap-4 items-center">
                            <div className="max-w-sm flex items-center gap-2">
                                <label htmlFor="descuento">Descuento (%): </label>
                                <input
                                    type="text"
                                    name="descuento"
                                    value={descuento} // Formatear con comas
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescuento(parseFloat(e.target.value))}
                                    className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>
                            <div className="max-w-sm flex items-center gap-2">
                                <label htmlFor="descuento">Rebaja (IVA incluido): </label>
                                <input
                                    type="number"
                                    name="rebaja"
                                    value={rebaja} // Formatear con comas
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRebaja(parseFloat(e.target.value))}
                                    className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>
                            <div className="max-w-sm flex items-center gap-2">
                                <label htmlFor="descuento">Devolución (IVA incluido): </label>
                                <input
                                    type="number"
                                    name="devolucion"
                                    value={devolucion} // Formatear con comas
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevolucion(parseFloat(e.target.value))}
                                    className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                />
                            </div>
                        </div>
                    )}

                    <div className="max-w-sm flex items-center gap-2">
                        <label htmlFor="usarAnticipo">¿Cancelar anticipo de cliente?</label>
                        <input
                            type="checkbox"
                            name="usarAnticipo"
                            checked={usarAnticipo}
                            onChange={(e) => setUsarAnticipo(e.target.checked)}
                        />
                    </div>


                    <button
                        onClick={handleAgregarVenta}
                        className="bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                    >
                        <span>
                            <Image src={agregar.src} alt="agregar" width={20} height={20} />
                        </span>
                        <span className="hidden md:inline-block ml-1">Agregar venta</span>
                    </button>

                </div>
            </div>
        </div >
    );
};

export default InfoVenta;