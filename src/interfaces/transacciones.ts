export interface Compra {
    subtotal: number;
    iva: number;
    total: number;
}

export interface Transaccion {
    tipo: string;
    fecha: string;
    descripcion: string;
}


export interface MovimientoCuenta {
    nombre: string;
    debe: number;
    haber: number;
}

export interface Transaccion_diario {
    id_transaccion: number;
    tipo_transaccion: string;
    fecha_transaccion: string;
    movimientos_cuentas: MovimientoCuenta[];
}