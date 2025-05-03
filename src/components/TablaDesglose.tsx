import { Compra } from "@/interfaces/transacciones";
import { formatearNumero } from "@/utils/formateador";

interface TablaDesgloseProps {
    detalles: Compra;
    porcentajeAnticipo?: number;
    tipo?: string;
}
const TablaDesglose = ({ detalles, porcentajeAnticipo, tipo }: TablaDesgloseProps) => {
    const subtotal = porcentajeAnticipo
        ? detalles.subtotal * (1 / (porcentajeAnticipo / 100))
        : detalles.subtotal;

    const iva = porcentajeAnticipo
        ? detalles.iva * (1 / (porcentajeAnticipo / 100))
        : detalles.iva;

    const total = porcentajeAnticipo
        ? detalles.total * (1 / (porcentajeAnticipo / 100))
        : detalles.total;

    let titulo = "DESGLOSE";
    if (tipo) {
        titulo = `DESGLOSE DE ${tipo.toUpperCase()}`;
    } else {
        titulo = porcentajeAnticipo ? "DESGLOSE DE LA VENTA" : `DESGLOSE DEL ANTICIPO`;
    }

    return (
        <table className="border-collapse border border-gray-300 mb-4">
            <thead>
                <tr className="bg-gray-100">
                    <th colSpan={2} className="border border-gray-300 p-2">{titulo}</th>
                </tr>


                <tr>
                    <th className="border border-gray-300 p-2">Venta</th>
                    <th className="w-64 border border-gray-300 p-2"> $ </th>
                </tr>
            </thead>
            <tbody>
                {/* Fila de la compra */}
                <tr>
                    <th className="border border-gray-300 p-2">Subtotal</th>
                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(subtotal)}</th>
                </tr>
                <tr>
                    <th className="border border-gray-300 p-2">IVA (16%)</th>
                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(iva)}</th>
                </tr>
                <tr>
                    <th className="border border-gray-300 p-2">Total</th>
                    <th className="border w-64 border-gray-300 p-2">{formatearNumero(total)}</th>
                </tr>
            </tbody>
        </table>

    )
}

export default TablaDesglose;