import { formatearNumero } from "@/utils/formateador";
import { Compra } from "@/interfaces/transacciones";
import { CuentaAfectada } from "@/interfaces/cuenta";
import TablaDesglose from "@/components/TablaDesglose";
import TablaCuentasAfectadas from "@/components/TablaCuentasAfectadas";


export interface TablaComprasProps {
    detallesCompra: Compra;
    cuentasAfectadas: CuentaAfectada[];
    porcentajeAnticipo?: number;
    mesesAnticipo?: number;
}
export const TablaAnticipo = ({ detallesCompra, cuentasAfectadas, porcentajeAnticipo }: TablaComprasProps) => {


    return (
        <div>
            <div className="flex justify-center items-center p-4 relative">
                <h2 className="text-2xl font-semibold text-center">Detalle del anticipo</h2>

            </div>
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-center">
                <div className="w-full flex justify-center gap-4">
                    {porcentajeAnticipo !== undefined && (
                        <TablaDesglose 
                            detalles={detallesCompra}
                            porcentajeAnticipo={porcentajeAnticipo}
                        />
                    )}

                    <TablaDesglose detalles={detallesCompra} />
                </div>

                {/* Tabla de cuentas a afectar */}
                <h3 className="text-md font-semibold mt-4 mb-2">Cuentas a Afectar</h3>
                <TablaCuentasAfectadas cuentasAfectadas={cuentasAfectadas} />
            </div>
        </div>
    )
}


export default TablaAnticipo;