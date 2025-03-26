import { useEffect, useState } from "react";
import Image from "next/image";
import agregar from "../../../../public/agregar.png";
import axios from "axios";

interface Cuenta {
    id: number;
    codigo: number;
    nombre: string;
    debe: number;
    haber: number;
    tipo: string;
    fecha?: string;
    naturaleza?: string;
}

interface CuentaCatalogo {
    id: number;
    id_cuenta_cat: number;
    codigo: number;
    nombre: string;
    tipo: string;
    naturaleza: string;
}

interface InfoAsientoProps {
    tipoAsiento: string;
    fecha: string;
    setFecha: (fecha: string) => void;
    agregarCuenta: (cuenta: Cuenta) => void;
    cuentaEditando: Cuenta | null;
    actualizarCuenta: (cuenta: Cuenta) => void;
    setDescripcion: (descripcion: string) => void;
    descripcion: string;
}

const InfoAsiento = ({
    tipoAsiento,
    fecha,
    setFecha,
    agregarCuenta,
    cuentaEditando,
    actualizarCuenta,
    setDescripcion,
    descripcion,
}: InfoAsientoProps) => {
    const [cuenta, setCuenta] = useState<Cuenta>(
        cuentaEditando || { id: 0, codigo: 0, nombre: "", debe: 0, haber: 0, tipo: "" }
    );
    const [cuentaSeleccionada, setCuentaSeleccionada] = useState<boolean>(false);

    useEffect(() => {
        if (cuentaEditando) {
            setCuenta(cuentaEditando);
        }
    }, [cuentaEditando]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Eliminar comas antes de actualizar el estado
        const numericValue = value.replace(/,/g, "");

        setCuenta({ ...cuenta, [name]: numericValue });
    };

    const handleSubmit = () => {
        if (cuentaEditando) {
            actualizarCuenta(cuenta);
        } else {
            agregarCuenta(cuenta);
        }
        setCuenta({ id: 0, nombre: "", codigo: 0, debe: 0, haber: 0, tipo: "" }); // Limpiar el formulario
    };

    const [catalogoCuentas, setCatalogoCuentas] = useState<CuentaCatalogo[]>([]);

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

    const handleCuentaCodigoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const codigo = Number(e.target.value); // Ahora solo es el código, sin el nombre
        setCuentaSeleccionada(true); // Cambia el estado a true al seleccionar una cuenta
        if (codigo === 0) {
            setCuentaSeleccionada(false);
            return;
        }
        const cuentaSeleccionada = catalogoCuentas.find((cuenta) => Number(cuenta.codigo) === codigo);
        if (cuentaSeleccionada) {
            setCuenta({
                ...cuenta,
                id: cuentaSeleccionada.id_cuenta_cat,
                codigo: cuentaSeleccionada.codigo,
                nombre: cuentaSeleccionada.nombre,
                tipo: cuentaSeleccionada.tipo,
                naturaleza: cuentaSeleccionada.naturaleza,
            });
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(e.target.value);
    };

    const handleDescripcionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescripcion(e.target.value);
    };

    // Función para formatear el número con comas
    const formatNumberWithCommas = (num: string) => {
        if (!num) return '';
        return Number(num).toLocaleString();
    };

    return (
        <div className="flex justify-between bg-[#F5F5F5] flex-col">
            <div className="bg-[#F5F5F5] flex items-center mt-3 jus p-6 pb-4 pt-0">
                <div className="p-4 bg-white drop-shadow-md rounded-md h-auto w-full flex flex-col gap-6 justify-center">
                    <div className="flex gap-4 items-center">
                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="descripcion">Descripción: </label>
                            <input
                                type="text"
                                name="descripcion"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>

                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="fecha">Fecha: </label>
                            <input
                                type="date"
                                value={fecha}
                                onChange={handleDateChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="max-w-sm flex items-center gap-2 ">
                            <label htmlFor="cuenta">Cuenta: </label>
                            <select
                                name="cuenta"
                                value={cuenta.codigo}
                                onChange={handleCuentaCodigoChange}
                                className="px-2 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            >
                                <option value="">Selecciona una cuenta</option>
                                {catalogoCuentas.map((cuenta, index) => (
                                    <option key={index} value={cuenta.codigo}>
                                        {`${cuenta.codigo} - ${cuenta.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="debe">Debe: </label>
                            <input
                                type="text"
                                name="debe"
                                value={formatNumberWithCommas(cuenta.debe.toString())} // Mostrar el número con comas
                                onChange={handleChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow disabled:cursor-not-allowed disabled:text-gray-400"
                                disabled={cuenta.naturaleza === "Acreedora"}
                            />
                        </div>

                        <div className="max-w-sm flex items-center gap-2">
                            <label htmlFor="haber">Haber: </label>
                            <input
                                type="text"
                                name="haber"
                                value={formatNumberWithCommas(cuenta.haber.toString())} // Mostrar el número con comas
                                onChange={handleChange}
                                className="px-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow disabled:cursor-not-allowed disabled:text-gray-400"
                                disabled={cuenta.naturaleza === "Deudora"}
                            />
                        </div>


                        <button
                            onClick={handleSubmit}
                            disabled={!cuentaSeleccionada}
                            className="bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <span>
                                <Image src={agregar.src} alt="agregar" width={20} height={20} />
                            </span>
                            <span className="hidden md:inline-block ml-1">
                                {cuentaEditando ? "Actualizar" : "Agregar"} cuenta
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoAsiento;
