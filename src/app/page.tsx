import Link from "next/link";
import Image from "next/image";
import contablitz from "../../public/contablitz.png"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      {/* Contenedor principal */}


      <Image
        src={contablitz.src}
        alt="Vista previa de Contablitz"
        className=" mx-auto w-full max-w-lg"
        width={400}
        height={200}
      />
      <div className="max-w-3xl text-center">

        {/* Logo y título */}
        <h1 className="text-4xl font-bold text-gray-900">
          Bienvenido a <span className="text-[#4FAB5F]">Contablitz</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          La herramienta contable que simplifica tu gestión financiera.
          Registra transacciones, genera reportes y mantén tus cuentas organizadas de forma rápida y eficiente.
        </p>

        {/* Imagen ilustrativa */}


        {/* Botones de acción */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/nuevaEmpresa">
            <button className="px-6 py-3 bg-[#52935d] hover:bg-[#4FAB5F] text-white font-semibold rounded-lg transition cursor-pointer">
              Abrir cuenta
            </button>
          </Link>
          <Link href="/asiento_apertura">
            <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-lg transition cursor-pointer">
              Asiento de apertura
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
