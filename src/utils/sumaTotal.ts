interface Cuenta {
    id: number;
    nombre: string;
    tipo: string;
    saldo: number;
}

export const sumaTotal = (cuentas: Cuenta[]): number => {
    
    const total = cuentas.reduce((acc, cuenta) => acc + Number(cuenta.saldo), 0);

    return total;
}