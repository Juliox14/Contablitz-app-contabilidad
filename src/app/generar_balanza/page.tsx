import BalanzaComprobacion from "@/components/transacciones/BalanzaComprobacion";
import BalanzaComprobacionFallback from "@/components/fallbacks/BalanzaComprobacion";
import { Suspense } from "react";

export default function GenerarBalanza() {
    const transaccionesPromise = fetch("http://localhost:3000/api/balanza")
        .then((response) => response.json());
    return (
        <Suspense fallback={<BalanzaComprobacionFallback />} >
            <BalanzaComprobacion transaccionesPromise={transaccionesPromise} />
        </Suspense>
    );
}