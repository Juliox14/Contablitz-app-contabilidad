export interface CuentaCatalogo {
    id: number;
    id_cuenta_cat: number;
    codigo: number;
    nombre: string;
    tipo: string;
}

export interface CuentaAfectada {
    id_cuenta_cat: number;
    codigo: number;
    nombre: string;
    debe?: number;
    haber?: number;
    tipo: string;
}

export interface empresa {
    nombre: string;
    id: number;
}