import BalanceGeneral from "@/components/transacciones/BalanceGeneral";
import { Suspense } from "react";
import { cookies } from "next/headers";
import BalanceGeneralFallback from "@/components/fallbacks/BalanceGeneral";

interface Empresa {
    nombre: string;
    id: number;
}

export default async function GenerarBalance() {
    // Obtén las cookies (no es necesario usar await)
    const cookiesList = cookies() as any;
    const empresaGuardada = cookiesList.get('empresaSeleccionada')?.value;

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

    const cuentasPromise = fetch(`http://localhost:3000/api/empresas/obtenerCuentas?id_empresa=${empresa.id}`, {
        method: "GET",  
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());



    return (
        <Suspense fallback={<BalanceGeneralFallback />}>
            <BalanceGeneral cuentasPromise={Promise.resolve(cuentasPromise)} />
        </Suspense>
    );
}