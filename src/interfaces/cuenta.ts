export interface CuentaCatalogo {
    id: number;
    id_cuenta_cat: number;
    codigo: number;
    nombre: string;
    tipo: string;
    porcentaje_depreciacion_anual?: number;
}

export interface CuentaAfectada {
    id_cuenta_cat: number;
    codigo: number;
    nombre: string;
    debe?: number;
    haber?: number;
    tipo: string;
}

export interface Empresa {
    nombre: string;
    id: number;
}