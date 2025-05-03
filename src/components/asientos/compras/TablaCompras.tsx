import { formatearNumero } from "@/utils/formateador";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import TablaDesglose from "@/components/TablaDesglose";
import TablaCuentasAfectadas from "@/components/TablaCuentasAfectadas";

export interface TablaComprasProps {
    detallesCompra: Compra;
    cuentasAfectadas: CuentaAfectada[];
    cuentaSeleccionada: CuentaAfectada;
}
export const TablaCompras = ({ detallesCompra, cuentasAfectadas, cuentaSeleccionada }: TablaComprasProps) => {


    return (
        <div>
            <div className="flex justify-center items-center p-4 relative">
                <h2 className="text-2xl font-semibold text-center">Detalle de la Compra</h2>

            </div>
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center">
                <div className="w-full flex justify-center">
                    <TablaDesglose detalles={detallesCompra} tipo="COMPRA" />
                </div>

                {/* Tabla de cuentas a afectar */}
                <h3 className="text-md font-semibold mt-4 mb-2">Cuentas a Afectar</h3>

                <TablaCuentasAfectadas cuentasAfectadas={cuentasAfectadas} cuentaSeleccionada={cuentaSeleccionada} />


            </div>
        </div>
    )
}


export default TablaCompras;