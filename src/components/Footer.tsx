export const Footer = () => {
    return (
            <footer className="bg-black text-white py-6 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    
                    {/* Sección "Hecho con" */}
                    <div className="flex flex-col md:flex-row items-center gap-2 text-center md:text-left">
                        <h3 className="font-semibold">Hecho con:</h3>
                        <ul className="flex flex-wrap justify-center md:justify-start gap-2 text-sm text-zinc-100">
                            <li>
                                <a href="https://nextjs.org/" target="_blank" className="hover:text-zinc-400 transition">Next.js</a>
                            </li>
                            <li>
                                <a href="https://tailwindcss.com/" target="_blank" className="hover:text-zinc-400 transition">Tailwind CSS</a>
                            </li>
                            <li>
                                <a href="https://www.typescriptlang.org/" target="_blank" className="hover:text-zinc-400 transition">TypeScript</a>
                            </li>
                        </ul>
                    </div>

                    {/* Sección Copyright */}
                    <div className="text-center md:text-right">
                        <p>© 2024 Julián Antonio Castro Alonso</p>
                    </div>
                </div>
            </footer>
    );
};