import Cookies from "js-cookie";

const registrarCookieEmpresa = (e: React.FormEvent, empresa: string) => {
    e.preventDefault();

    Cookies.set("empresaSeleccionada", JSON.stringify(empresa), { expires: 7 });

};

export default registrarCookieEmpresa;