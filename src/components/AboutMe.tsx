'use client'
import Link from "next/link";
import Image from "next/image";
import perfil from "../../public/perfil.jpg";
import github from "../../public/github.gif";
import linkedin from "../../public/linkedin.gif";

const AboutMe = ({ IsOpen, setIsOpen }: any) => {
    if (!IsOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-brightness-50 p-4">
            
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[400px] flex flex-col items-center space-y-4">
                <button
                    className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => setIsOpen(false)}
                >
                    ✕
                </button>
                <h1 className="text-2xl text-center">Desarrollado por:</h1>
                <img src={perfil.src} alt="Foto de perfil" className="w-24 h-24 rounded-full" />
                <h2 className="text-xl text-center">Julian Antonio Castro Alonso</h2>
                <div className="flex space-x-4">
                    <Link href="https://github.com/Juliox14">
                        <Image src={github.src} alt="Github" className="w-8 h-8" width={32} height={32}/>
                    </Link>
                    <Link href="https://www.linkedin.com/in/julian-antonio-castro-alonso-a06438304/">
                        <Image src={linkedin.src} alt="Linkedin" className="w-8 h-8" width={32} height={32}/>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
