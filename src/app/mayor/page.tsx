import EsquemaMayor from "@/components/transacciones/EsquemaMayor";
import EsquemaMayorFallback from "@/components/fallbacks/EsquemaMayor";
import { Suspense } from "react";

export default function mayorPage() {
    const cuentasPromise = fetch("http://localhost:3000/api/mayor")
        .then((response) => response.json());
    return (
        <Suspense fallback={<EsquemaMayorFallback />}>
            <EsquemaMayor cuentasPromise={cuentasPromise} />
        </Suspense>
    );
}