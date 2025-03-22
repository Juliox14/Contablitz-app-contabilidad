import Cookies from "js-cookie";

const registrarCookieEmpresa = (e: React.FormEvent, empresa: string) => {
    e.preventDefault();
    console.log("Empresa registrada:", empresa);

    Cookies.set("empresaSeleccionada", JSON.stringify(empresa), { expires: 7 });

};

export default registrarCookieEmpresa;