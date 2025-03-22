import Image from "next/image";
import cuentas from "../../public/cuentas.png";
import documento from "../../public/documento.png";
import libro from "../../public/libro.png";
import balanza from "../../public/balanza.png";
import TipoAsiento from "./TipoAsiento";
import ListaEmpresas from "./ListaEmpresas";
import Link from "next/link";
import T from "../../public/T.png";


const Menu = () => {
  return (
    <div className="bg-[#F5F5F5] flex h-14 p-6 items-center w-full justify-between">
      <div className="flex items-center">

        <Link href={"/generar_libro_diario"} className="text-slate-800 hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer">
          <span>
            <Image src={libro.src} alt="libro" width={20} height={20} />
          </span>
          <span className="hidden md:inline-block ml-1">Libro diario</span>

        </Link>

        <Link
          href={"/mayor"}
          className="text-slate-800 hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer"
        >
          <span>
            <Image src={T.src} alt="T" width={20} height={20} />
          </span>
          <span className="hidden md:inline-block ml-1">Esquemas de mayor</span>
        </Link>

        <Link
          href={"/generar_balance"}
          className="text-slate-800 hover:text-[#A3C37D] border-l text-sm bg-white hover:bg-slate-100 border-y border-slate-200 font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer"
        >
          <span>
            <Image src={documento.src} alt="documento" width={20} height={20} />
          </span>
          <span className="hidden md:inline-block ml-1">Balance general</span>
        </Link>

        <Link href={"/generar_balanza"} className="text-slate-800 hover:text-[#A3C37D] text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium px-4 py-2 inline-flex space-x-1 items-center cursor-pointer">
          <span>
            <Image src={balanza.src} alt="balanza" width={20} height={20} />
          </span>
          <span className="hidden md:inline-block ml-1">Balanza de comprobación</span>
        </Link>




        <TipoAsiento />
      </div>

      <ListaEmpresas />


    </div>
  );
};

export default Menu;
