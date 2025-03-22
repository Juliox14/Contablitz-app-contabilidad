import Cookies from "js-cookie";

interface Empresa {
  nombre: string;
  id: number;
}

export const obtenerCookieEmpresa = (): Empresa | null => {
  const empresaGuardada = Cookies.get("empresaSeleccionada");

  if (!empresaGuardada) return null;

  try {
    return JSON.parse(empresaGuardada) as Empresa;
  } catch (error) {
    console.error("Error al parsear la cookie:", error);
    return null;
  }
};
