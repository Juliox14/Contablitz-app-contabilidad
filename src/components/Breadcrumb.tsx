import Link from 'next/link';

type ruta = {
    nombre: string;
    link: string;
}

interface BreadcrumbProps {
    rutas: ruta[];
    titulo: string;
}

export default function Breadcrumb({ rutas, titulo }: BreadcrumbProps) {
    return (
        <div className="flex flex-row w-full justify-between p-3 font-rancho mb-4">
            <Link
                href={rutas[rutas.length - 2].link}
                className="flex items-center mb-2 text-[#4A518A] hover:text-[#7984d1]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
                    <path d="M 19.9375 12.96875 C 19.414063 12.988281 18.921875 13.214844 18.5625 13.59375 L 8.6875 23.59375 L 7.3125 25 L 8.6875 26.40625 L 18.5625 36.40625 C 19.339844 37.199219 20.613281 37.214844 21.40625 36.4375 C 22.199219 35.660156 22.214844 34.386719 21.4375 33.59375 L 14.90625 27 L 40 27 C 40.722656 27.011719 41.390625 26.632813 41.753906 26.007813 C 42.121094 25.386719 42.121094 24.613281 41.753906 23.992188 C 41.390625 23.367188 40.722656 22.988281 40 23 L 14.90625 23 L 21.4375 16.40625 C 22.039063 15.824219 22.21875 14.933594 21.882813 14.164063 C 21.546875 13.398438 20.773438 12.921875 19.9375 12.96875 Z"></path>
                </svg>
            </Link>
            <div className="flex flex-col items-end">
                <h1 className="mb-0 text-4xl">{titulo}</h1>
                <p className="text-[#4A518A] mr-1 text-lg">
                    {rutas.map((ruta, index) => (
                        <span key={ruta.nombre}>
                            <Link
                                href={ruta.link}
                                className="text-[#A3C37D] hover:text-[#19180f] no-underline "
                            >
                                {ruta.nombre}
                            </Link>
                            {rutas.length - index > 1 && <span className='font-bold'>{' > '}</span>}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}