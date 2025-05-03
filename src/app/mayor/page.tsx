import EsquemaMayor from "@/components/transacciones/EsquemaMayor";
import EsquemaMayorFallback from "@/components/transacciones/fallbacks/EsquemaMayor";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { Empresa } from "@/interfaces/cuenta";


export default async function mayorPage() {
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

    const cuentasPromise = await fetch(`http://localhost:3000/api/mayor/?id_empresa=${empresa.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());

    return (
        <Suspense fallback={<EsquemaMayorFallback />}>
            <EsquemaMayor cuentasPromise={Promise.resolve(cuentasPromise)} />
        </Suspense>
    );
}