import BalanzaComprobacion from "@/components/transacciones/BalanzaComprobacion";
import BalanzaComprobacionFallback from "@/components/transacciones/fallbacks/BalanzaComprobacion";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Empresa } from "@/interfaces/cuenta";

export default async function GenerarBalanza() {
    const cookiesList = cookies() as any;
    const empresaGuardada = await cookiesList.get('empresaSeleccionada')?.value;

    console.log("Cookie empresaSeleccionada:", empresaGuardada);

    if (!empresaGuardada) {
        console.warn("No se encontró la cookie 'empresaSeleccionada'.");
        return <div>Error: No se pudo obtener la empresa.</div>;
    }

    let empresa: Empresa;
    try {
        empresa = JSON.parse(empresaGuardada) as Empresa;
    } catch (error) {
        console.error("Error al parsear la cookie:", error);
        return <div>Error: La cookie no tiene un formato válido.</div>;
    }

    const transaccionesPromise = fetch(`http://localhost:3000/api/balanza?id_empresa=${empresa.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
    return (
        <Suspense fallback={<BalanzaComprobacionFallback />} >
            <BalanzaComprobacion transaccionesPromise={transaccionesPromise} />
        </Suspense>
    );
}
