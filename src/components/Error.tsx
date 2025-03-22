
interface ErrorProps {
    mensaje: string;
}

export const Error = ({ mensaje }: ErrorProps) => {
    return (
        <div className="fixed top-4 left-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg z-50">
            <p className="text-lg font-semibold">Error</p>
            <p>{mensaje}</p>
        </div>
    );
}

export default Error;