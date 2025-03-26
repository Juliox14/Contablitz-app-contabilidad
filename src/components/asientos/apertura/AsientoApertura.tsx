'use client'
import { useState, useEffect } from "react";
import InfoAsiento from "./InformacionAsiento";
import Image from "next/image";
import guardar from "../../../../public/guardar.png";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import { formatearNumero } from "@/utils/formateador";
import Error from "../../Error";
import Exito from "../../Exito";
import axios from "axios";

interface Cuenta {
    id: number;
    codigo: number;
    nombre: string;
    debe: number;
    haber: number;
    tipo: string;
}

interface empresa {
    nombre: string;
    id: number;
}


const AsientoApertura = () => {
    const tipoAsiento = "Asiento de apertura";
    const [error, setError] = useState<string>("");
    const [exito, setExito] = useState<string>("");
    const [fecha, setFecha] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
    const [cuentaEditando, setCuentaEditando] = useState<Cuenta | null>(null);
    const [empresa, setEmpresa] = useState<empresa>({
        nombre: "",
        id: 0
    });

    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() as empresa);
    }
        , []);


    const agregarCuenta = (nuevaCuenta: Cuenta) => {
        setCuentas((prevCuentas) => [...prevCuentas, nuevaCuenta]);
    };

    const actualizarCuenta = (cuentaActualizada: Cuenta) => {
        setCuentas((prevCuentas) =>
            prevCuentas.map((cuenta) =>
                cuenta.id === cuentaActualizada.id ? cuentaActualizada : cuenta
            )
        );
        setCuentaEditando(null);
    };

    const eliminarCuenta = (id: number) => {
        setCuentas((prevCuentas) => prevCuentas.filter((cuenta) => cuenta.id !== id));
    };

    const activosCirculantes = cuentas.filter(cuenta => cuenta.tipo === "Activo Circulante");
    const activosNoCirculantes = cuentas.filter(cuenta => cuenta.tipo === "Activo No Circulante");
    const capital = cuentas.filter(cuenta => cuenta.tipo === "Capital Contable");

    const totalActivosCirculantes = activosCirculantes.reduce((total, cuenta) => Number(total) + Number(cuenta.debe), 0);
    const totalActivosNoCirculantes = activosNoCirculantes.reduce((total, cuenta) => Number(total) + Number(cuenta.debe), 0);
    const totalActivos = totalActivosCirculantes + totalActivosNoCirculantes;
    const totalCapital = capital.reduce((total, cuenta) => Number(total) + Number(cuenta.haber), 0);
    


    const handleSubmit = async () => {
        try {
            const cuentasNoExisten = await axios.post('/api/cuentas/validarCuentas', { cuentas, idEmpresa: empresa.id });
            if (cuentasNoExisten.status !== 200) {
                setError("Ups, parece que algunas cuentas ya existen en la base de datos");
                setTimeout(() => {
                    setError("");
                }, 3000);
                return;
            }   
            
            if (totalActivos !== totalCapital) {
                setError("El total de activos debe ser igual al total de capital");
                setTimeout(() => {
                    setError("");
                }, 3000);
                return;
            }
            const response = await axios.post('/api/empresas/registrarCuentas',
                { cuentas, idEmpresa: empresa.id, fecha, descripcion, tipoAsiento },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status !== 201) {
                alert('Error al registrar el asiento');
                return;
            }
            setExito("Asiento registrado exitosamente");
            setTimeout(() => {
                setExito("");
                window.location.reload();
            }, 3000);
            
        } catch (error) {
            console.error("Error al registrar el asiento:", error);
            alert("Error al registrar el asiento");
        }
    };


    return (
        <div>
            {error && <Error mensaje={error} />}

            {exito && <Exito mensaje={exito} />}

            <InfoAsiento
                fecha={fecha}
                setFecha={setFecha}
                tipoAsiento={tipoAsiento}
                agregarCuenta={agregarCuenta}
                cuentaEditando={cuentaEditando}
                actualizarCuenta={actualizarCuenta}
                setDescripcion={setDescripcion}
                descripcion={descripcion}
        
            />

            <div className="bg-white p-6 rounded-md shadow-md">

                <div className="w-full flex items-center text-center justify-between mb-4">
                    <h2 className="text-lg font-semibold mb-4 text-center">Asiento de Apertura</h2>
                    <button
                        className="bg-white border border-gray-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-2 cursor-pointer hover:bg-gray-100"
                        onClick={handleSubmit}
                    >
                        <Image src={guardar.src} alt="guardar" width={20} height={20} />
                        <span className="hidden md:inline-block">Guardar asiento</span>
                    </button>
                </div>


                <h3 className="text-md font-semibold mt-4 mb-2">Activos Circulantes</h3>
                <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300  w-[250px] p-2">Código</th>
                            <th className="border border-gray-300 w-[250px] p-2">Cuenta</th>
                            <th className="border border-gray-300 w-[150px] p-2">Debe</th>
                            <th className="border border-gray-300 w-[150px] p-2">Haber</th>
                            <th className="border border-gray-300 w-[150px] p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activosCirculantes.length === 0 ? (
                            <tr className="h-16">
                                <td colSpan={5} className="text-center text-gray-500">No hay cuentas registradas</td>
                            </tr>
                        ) :
                            activosCirculantes.map((cuenta, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 text-center p-2">{cuenta.codigo}</td>
                                    <td className="border border-gray-300 p-2 text-center">{cuenta.nombre}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.debe)}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.haber)}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="inline-flex items-center">
                                            <button className="text-slate-800 hover:text-blue-600 p-2 cursor-pointer" onClick={() => setCuentaEditando(cuenta)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#0000FF"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </button>

                                            <button className="text-slate-800 hover:text-red-600 p-2 cursor-pointer" onClick={() => eliminarCuenta(cuenta.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#FF0000"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Activos No Circulantes */}
                <h3 className="text-md font-semibold mt-4 mb-2">Activos No Circulantes</h3>
                <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300  w-[250px] p-2">Código</th>
                            <th className="border border-gray-300 w-[250px] p-2">Cuenta</th>
                            <th className="border border-gray-300 w-[150px] p-2">Debe</th>
                            <th className="border border-gray-300 w-[150px] p-2">Haber</th>
                            <th className="border border-gray-300 w-[150px] p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activosNoCirculantes.length === 0 ? (
                            <tr className="h-16">
                                <td colSpan={5} className="text-center text-gray-500 w-full">No hay cuentas registradas</td>
                            </tr>
                        ) :
                            activosNoCirculantes.map((cuenta, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 text-center p-2">{cuenta.codigo}</td>
                                    <td className="border border-gray-300 p-2 text-center">{cuenta.nombre}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.debe)}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.haber)}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="inline-flex items-center">
                                            <button className="text-slate-800 hover:text-blue-600 p-2 cursor-pointer" onClick={() => setCuentaEditando(cuenta)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#0000FF"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </button>

                                            <button className="text-slate-800 hover:text-red-600 p-2 cursor-pointer" onClick={() => eliminarCuenta(cuenta.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#FF0000"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>



                <div className="text-right mt-4 p-4 border-t border-gray-300">
                    <span className="text-lg font-bold">Total Activos: </span>
                    <span className="text-lg font-semibold text-blue-600">{formatearNumero(totalActivos)}</span>
                </div>

                {/* Cuenta de Capital */}
                <h3 className="text-md font-semibold mt-4 mb-2">Capital</h3>
                <table className="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300  w-[250px] p-2">Código</th>
                            <th className="border border-gray-300 w-[250px] p-2">Cuenta</th>
                            <th className="border border-gray-300 w-[150px] p-2">Debe</th>
                            <th className="border border-gray-300 w-[150px] p-2">Haber</th>
                            <th className="border border-gray-300 w-[150px] p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {capital.length === 0 ? (
                            <tr className="h-16">
                                <td colSpan={5} className="text-center text-gray-500">No hay cuentas registradas</td>
                            </tr>
                        ) :
                            capital.map((cuenta, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 text-center p-2">{cuenta.codigo}</td>
                                    <td className="border border-gray-300 p-2 text-center">{cuenta.nombre}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.debe)}</td>
                                    <td className="border border-gray-300 p-2 text-center">{formatearNumero(cuenta.haber)}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <div className="inline-flex items-center">
                                            <button className="text-slate-800 hover:text-blue-600 p-2 cursor-pointer" onClick={() => setCuentaEditando(cuenta)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#0000FF"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                    />
                                                </svg>
                                            </button>

                                            <button className="text-slate-800 hover:text-red-600 p-2 cursor-pointer" onClick={() => eliminarCuenta(cuenta.id)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    color="#FF0000"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                    />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>

                            ))}
                    </tbody>
                </table>
                <div className="text-right mt-4 p-4 border-t border-gray-300">
                    <span className="text-lg font-bold">Total Capital: </span>
                    <span className="text-lg font-semibold text-blue-600">{formatearNumero(totalCapital)}</span>
                </div>
            </div>
        </div>
    );
};

export default AsientoApertura;
