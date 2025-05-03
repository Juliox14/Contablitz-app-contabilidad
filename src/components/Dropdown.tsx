'use client'
import { useState } from "react";
import Image from "next/image";
import puntos from "../../public/puntos.png";
import Link from "next/link";

const DropdownAcciones = () => {
  const [abierto, setAbierto] = useState(false);

  const toggleDropdown = () => setAbierto(!abierto);

  const opciones = [
    { texto: "Realizar depreciación mensual", link: "/depreciacion_mensual" },
    { texto: "Pagar renta mensual", link: "/registrar_renta" },
    { texto: "Estado de resultados método analítico", link: "/estado_resultados" },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-slate-800 hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer"
      >
        <span className="flex gap-2">
          <span>
            <Image src={puntos.src} alt="acciones" width={20} height={20} />
          </span>

          <span className="hidden md:inline-block ml-1">Otras acciones</span>
        </span>
        <svg className="w-5 h-5 ml-2 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
          width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
          </path>
        </svg>
      </button>

      {abierto && (
        <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg ">
          {opciones.map((op, i) => (
            <div className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer" key={i}>
              <Link href={op.link}>
                {op.texto}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownAcciones;
