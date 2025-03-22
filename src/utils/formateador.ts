export const formatearNumero = (numero: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numero);
}

export const desformatearNumero = (numero: string): number => {
    return Number(numero.replace(/[^0-9.-]+/g, ""));
}
