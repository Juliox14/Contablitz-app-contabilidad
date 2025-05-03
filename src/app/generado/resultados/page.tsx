import EstadoResultadosYCapital from "@/components/ejemplos/Resultados";

export default function Resultados() {

    const estadoResultados = {
        ventas: 225000,
        ingresosServicios: 431034.48,
        costo: 150000,
        gastos: 59204.53,
        utilidad: 446829.95,
        isr: 134048.99,
        ptu: 44683.00,
        utilidadNeta: 268097.97,
      };
      
      const resumenCapital = {
        acreedores: 709400.00,
        anticipos: 0,
        ivaTrasladado: 70482.76,
        ivaPorTrasladar: 34482.76,
        capitalContable: 5126829.95,
        capitalContribuido: 0, // No se muestra valor explícito en la imagen
        capitalSocial: 4680000.00,
        utilidadDelPeriodo: 446829.95,
      };
      
    return (
        <EstadoResultadosYCapital estadoResultados={estadoResultados} resumenCapital={resumenCapital} />
    );
}