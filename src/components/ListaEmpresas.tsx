'use client'
import Image from "next/image";
import empresa from "../../public/empresa.png";
import Link from "next/link";
import { useState, useEffect } from "react";

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const obtenerEmpresas = async () => {
      try {
        const response = await fetch('/api/empresas/obtenerEmpresas');
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error al obtener las empresas:", error);
        alert("Error al obtener las empresas");
      }
    };

    obtenerEmpresas();
  }
    , []);



  return (
    <div className="relative z-20">

      <details className="group ">

        <summary
          className="text-slate-800 hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer">

          <span className="flex gap-2">
            <span>
              <Image src={empresa.src} alt="empresa" width={20} height={20} />
            </span>

            <span className="hidden md:inline-block ml-1">Cambiar empresa</span>
          </span>
          <svg className="w-5 h-5 ml-2 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
            width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
            </path>
          </svg>
        </summary>

        <article className="py-4 absolute bg-white shadow-md rounded-md w-full">
          <ul className="flex flex-col gap-1 pl-2 text-xs">
            {empresas.map((empresa: any, index: number) => (
              <li key={index} className="flex items-center gap-2">
                •
                <Link className="text-[#A3C37D]" href={"/"}>{empresa.nombre}</Link>
              </li>
            ))}
          </ul>

          <div className="flex justify-center pr-2 pt-2">
            <Link href="/nuevaEmpresa" className="text-[#A3C37D] hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer">
              Nueva empresa
            </Link>
          </div>
        </article>
      </details>
    </div>

  );
};


export default ListaEmpresas;