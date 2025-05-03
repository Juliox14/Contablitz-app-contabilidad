import Image from 'next/image';
import Link from 'next/link';

const ErrorCuentas = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[61.5vh] text-center p-12">
            <div className="mb-6">
                <Image
                    src="/contablito_buscando.png"
                    alt="Contablito triste"
                    width={256}
                    height={256}
                    className="object-contain"
                />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                ¡Ohh no! 
            </h1>

            <p className="text-gray-600 max-w-md mb-6">
                Parece que Contablito está triste porque no pudo encontrar ninguna cuenta en tu empresa.
            </p>

            <Link
                href="/asiento_apertura"
                className="text-green-950"
            >
                Agregar cuentas
            </Link>
        </div>
    );
};

export default ErrorCuentas;
