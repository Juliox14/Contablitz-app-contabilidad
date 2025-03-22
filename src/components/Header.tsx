'use client'
import { useState, useEffect } from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import ajustes from "../../public/ajustes.png";
import info from "../../public/info.png";
import AboutMe from "./AboutMe";
import { obtenerCookieEmpresa } from "@/utils/obtenerCookie";
import { empresa } from "@/interfaces/cuenta";


export const Header = () => {
    const [openAbout, setOpenAbout] = useState(false);
    const [empresa, setEmpresa] = useState<empresa>({
        nombre: "",
        id: 0
    });

    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() || { nombre: "", id: 0 });
    }
    , []);



        return (
            <>
                <header className="bg-[#F5F5F5] p-4 w-full h-16 flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-2">
                        <Image src={logo.src} alt="Logo" className="h-12" width={48} height={48} />
                        <h1 className="text-xl font-bold text-slate-800">{empresa?.nombre}</h1>
                    </div>

                    <div className="flex">

                        <button className="bg-transparent cursor-pointer text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2">
                            <Image src={ajustes.src} alt="ajustes" width={20} height={20} />
                        </button>

                        <button
                            className="bg-transparent cursor-pointer text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2"
                            onClick={() => setOpenAbout(true)}
                        >
                            <Image src={info.src} alt="about" width={20} height={20} />
                        </button>
                    </div>
                </header>

                {openAbout && <AboutMe IsOpen={openAbout} setIsOpen={setOpenAbout} />}
            </>
        );
    };

    export default Header;
