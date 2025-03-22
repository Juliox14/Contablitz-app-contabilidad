"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TipoAsiento = () => {
    const router = useRouter();
    const [tipoAsiento, setTipoAsiento] = useState("");
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setTipoAsiento(selectedValue);
        router.push(`/${selectedValue}`);
    }

    return (
        <div className="flex ml-6 h-auto relative">
            <div className="text-gray-700 hover:text-[#A3C37D] appearance-none text-sm bg-gray-100 hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center w-auto">
                <span className="inline">Tipo de asiento:</span>
            </div>
            <select
                className="text-slate-800 not-disabled:hover:text-[#A3C37D] text-sm bg-white not-disabled:hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer disabled:appearance-none disabled:cursor-not-allowed disabled:text-gray-400"
                value={tipoAsiento}
                onChange={handleChange}
            >
                <option value="" disabled>Selecciona un tipo</option>
                <option value="asiento_apertura">Asiento de apertura</option>
                <option value="asiento_compra">Compra</option>
                <option value="asiento_anticipo_clientes">Anticipo de clientes</option>
                <option value="asiento_pago_renta">Pago de rentas por anticipado</option>
            </select>
        </div>
    );
};

export default TipoAsiento;
