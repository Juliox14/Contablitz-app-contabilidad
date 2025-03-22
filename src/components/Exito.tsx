interface ExitoProps {
    mensaje: string;
}

export const Exito = ({mensaje}: ExitoProps) => {
    return (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg min-w-96 z-40">
            <p className="text-lg font-semibold">Acción éxitosa</p>
            <p>{mensaje}</p>
        </div>
    );
};

export default Exito;