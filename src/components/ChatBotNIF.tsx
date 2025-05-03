'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import logoChat from '../../public/logoChat.png';
import contablitoPensando from '../../public/contablito_pensando.png';
import enviar from '../../public/enviar.png';
import ReactMarkdown from 'react-markdown';

interface Mensaje {
    emisor: 'usuario' | 'bot';
    texto: string;
    sugerencias?: string[];
}

const ChatNIFBot = () => {
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [input, setInput] = useState('');
    const [escribiendo, setEscribiendo] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    const obtenerSaludoInicial = async () => {
        try {
            setEscribiendo(true);
            const respuesta = await fetch('http://localhost:3000/api/chat-nif', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: "saludo_inicial", // palabra clave para que la API entienda que es un saludo automático
                    chatHistory: []
                }),
            });

            const data = await respuesta.json();
            setEscribiendo(false);
            setMensajes([{ emisor: 'bot', texto: data.respuesta, sugerencias: data.sugerencias }]);
        } catch (error) {
            setMensajes([
                { emisor: 'bot', texto: '¡Hola! Soy Contablito. Parece que no pude cargar mi saludo 😢, pero puedes preguntarme sobre las NIF.' }
            ]);
        }
    }

    useEffect(() => {
        obtenerSaludoInicial

        if (mensajes.length === 0) {
            obtenerSaludoInicial();
        }
    }, []);



    const enviarMensaje = async () => {
        if (!input.trim()) return;

        const nuevoMensaje: Mensaje = { emisor: 'usuario', texto: input };
        setMensajes((prev) => [...prev, nuevoMensaje]);
        setInput('');

        try {
            setEscribiendo(true);
            const respuesta = await fetch('http://localhost:3000/api/chat-nif', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userInput: input,
                    chatHistory: mensajes.map(m => ({
                        emisor: m.emisor,
                        texto: m.texto
                    }))
                })

            });

            const data = await respuesta.json();

            setEscribiendo(false);
            setMensajes((prev) => [
                ...prev,
                { emisor: 'bot', texto: data.respuesta, sugerencias: data.sugerencias },
            ]);
        } catch (error) {
            setEscribiendo(false);
            setMensajes((prev) => [
                ...prev,
                { emisor: 'bot', texto: 'Hubo un error al obtener la respuesta. Intenta de nuevo.' }
            ]);
        }
    };

    const recargarChat = () => {
        setMensajes([]);
        setInput('');
        setEscribiendo(false);
        obtenerSaludoInicial();
    }

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });

        }
    }, [mensajes, escribiendo]);


    return (
        <div className="w-full h-[600px] rounded-xl shadow-xl flex flex-col  bg-white overflow-hidden">
            <div className="bg-[#FBFBFB] p-4 font-semibold text-gray-800 shadow-md items-center  flex gap-6">
                {escribiendo ? (
                    <Image className='rounded-full' src={contablitoPensando.src} alt="Logo" width={50} height={50} />

                ) : (
                    <Image className='rounded-full' src={logoChat.src} alt="Logo" width={50} height={50} />
                )}
                <div className="flex flex-col">
                    <h1 className="text-lg font-sans">Contablito</h1>
                    <p className="text-sm text-gray-500">Disponible las 24 horas del día</p>
                </div>

                <button className="appearance-none py-2 px-4 flex items-center justify-center cursor-pointer ml-auto" onClick={recargarChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
                </button>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                {mensajes.map((msg, index) =>
                    msg.emisor === 'usuario' ? (
                        <div key={index} className="flex justify-end mt-5">
                            <div className="bg-[#026829] text-white px-4 py-2 rounded-2xl max-w-[80%] break-words">
                                <span>{msg.texto}</span>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="flex flex-col items-start">
                            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl max-w-[80%]">
                                <ReactMarkdown>{msg.texto}</ReactMarkdown>

                            </div>

                            {msg.sugerencias && msg.sugerencias.length > 0 && (
                                <div className="mt-2 ml-2 flex gap-2 flex-wrap">
                                    <span className="text-gray-300 text-xs italic w-full">Preguntas sugeridas:</span>
                                    {msg.sugerencias.map((sugerencia, index) => (
                                        <button key={index} className="bg-gray-700 text-white px-3 py-1 rounded-xl text-sm cursor-pointer text-left" onClick={() => {
                                            setInput(sugerencia);
                                            enviarMensaje();
                                        }}>
                                            <ReactMarkdown>{sugerencia}</ReactMarkdown>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )

                )}
                {escribiendo && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-700 px-4 py-2 rounded-2xl text-sm font-medium animate-pulse">
                            Contablito está pensando... 🤔
                        </div>
                    </div>
                )}
            </div>



            <div className="p-3 flex items-center">
                <input
                    type="text"
                    placeholder="Escribe tu duda..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                />
                {/* Botón de enviar mensaje solo con icono */}
                <button onClick={enviarMensaje} className="appearance-none py-2 px-4 flex items-center justify-center cursor-pointer">
                    <Image src={enviar.src} alt="Enviar" width={24} height={24} className="text-white " />
                </button>
            </div>
        </div>
    );
};

export default ChatNIFBot;
