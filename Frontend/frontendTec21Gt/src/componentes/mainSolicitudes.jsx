import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SolicitudCard from "./SolicitudCard";

export const Solicitud = () => {
    const [solicitud, setSolicitud] = useState([]);

    useEffect(() => {
        (async () => {
            let fetchSoli = await fetch("http://localhost:4000/solicitudes", { credentials: 'include' });
            let dataSoli = await fetchSoli.json();
            setSolicitud(dataSoli);
        })();
    }, []);

    return (
        <div>
            <div>
            </div>
            <div className="p-6">
                <Link to={"/Equipos"}>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow transition duration-300 mb-4">
                        Crear nueva solicitud
                    </button>
                </Link>
                <h1 className="text-2xl font-bold">Solicitudes de Mantenimiento y Reparacion</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-6 p-4 bg-gray-100 rounded-lg shadow-lg">
                {solicitud.map((solicitud) => (
                    <Link to={`/Solicitud/${solicitud.noSolicitud}`} key={solicitud.noSolicitud}>
                        <SolicitudCard solicitud={solicitud} key={solicitud.noSolicitud}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}