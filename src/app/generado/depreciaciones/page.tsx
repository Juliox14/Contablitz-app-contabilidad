import TablaDepreciacionMensual from "@/components/ejemplos/depreciaciones";

export default function Depreciaciones() {

    const activos = [
        { nombre: "Terreno", porcentaje: 0, importe: 1100000, depreciacionAnual: 0, depreciacionMensual: 0 },
        { nombre: "Edificio", porcentaje: 5, importe: 600000, depreciacionAnual: 30000, depreciacionMensual: 2500 },
        { nombre: "Mobiliario y equipo", porcentaje: 10, importe: 50000, depreciacionAnual: 5000, depreciacionMensual: 416.67 },
        { nombre: "Equipos de cómputo", porcentaje: 30, importe: 342000, depreciacionAnual: 102600, depreciacionMensual: 8550 },
        { nombre: "Licencias y software", porcentaje: 30, importe: 500000, depreciacionAnual: 150000, depreciacionMensual: 12500 },
        { nombre: "Instalación", porcentaje: 10, importe: 167543.11, depreciacionAnual: 16754.31, depreciacionMensual: 1396.19 },
        { nombre: "Muebles y enseres", porcentaje: 10, importe: 150000, depreciacionAnual: 15000, depreciacionMensual: 1250 },
        { nombre: "Equipos de transporte", porcentaje: 25, importe: 590000, depreciacionAnual: 147500, depreciacionMensual: 12291.67 }
    ];

    return (
        <div className="flex flex-col items-center  min-h-screen bg-white p-4">
            <TablaDepreciacionMensual activos={activos} />
        </div>
    );
}