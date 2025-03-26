"use client"

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Error capturado:", error);
    }, [error]);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h2 className="text-2xl font-semibold text-red-600">Oops! Algo salió mal</h2>
            <p className="text-gray-600 mt-2">Parece que ocurrió un error inesperado.</p>
            <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => reset()}
            >
                Intentar nuevamente
            </button>
        </div>
    );
}
