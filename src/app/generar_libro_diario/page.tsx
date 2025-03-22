'use client'
import { useState, useEffect } from 'react';
import { obtenerCookieEmpresa } from '@/utils/obtenerCookie';
import LibroDiario from "@/components/LibroDiario";

interface empresa {
    nombre: string;
    id: number;
}

const GenerarLibroDiario = () => {
    const [empresa, setEmpresa] = useState<empresa>({
        nombre: "",
        id: 10
    });

    useEffect(() => {
        setEmpresa(obtenerCookieEmpresa() as empresa);
        console.log(empresa);
    }, []);
    
    return (
        <LibroDiario id_empresa={empresa.id} />
    );
};

export default GenerarLibroDiario;
