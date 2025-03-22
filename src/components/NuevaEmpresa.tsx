'use client';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from 'next/image';

const RegistrarNuevaEmpresa = () => {
    const [nombreEmpresa, setNombreEmpresa] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/empresas/registrarEmpresa',
                { empresa: nombreEmpresa },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.status !== 201) {
                alert('Error al registrar la empresa');
                return;
            }

            const { idEmpresa } = response.data;
            const cookieEmpresa = {
                nombre: nombreEmpresa,
                id: idEmpresa,
            }

            Cookies.set('empresaSeleccionada', JSON.stringify(cookieEmpresa), { expires: 7 });

            window.location.href = '/';
        } catch (error) {
            console.error("Error al registrar la empresa:", error);
            alert("Error al registrar la empresa");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    src="/empresa.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="mx-auto mb-4"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrar Nueva Empresa</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            {/* Logo */}

                            <label htmlFor="empresa" className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="empresa"
                                    name="empresa"
                                    type="text"
                                    value={nombreEmpresa}
                                    onChange={(e) => setNombreEmpresa(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full cursor-pointer py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2CA152] focus:outline-none focus:border- focus:shadow-outline-indigo active:bg-[#008E2D] transition duration-150 ease-in-out"
                            >
                                Registrar Empresa
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrarNuevaEmpresa;
