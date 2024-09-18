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
                <Link to={"/Equipos"}>
                    <button>Crear nueva solicitud</button>
                </Link>
            </div>
            {solicitud.map((solicitud) => (
                <Link to={`/Solicitud/${solicitud.noSolicitud}`} key={solicitud.noSolicitud}>
                    <SolicitudCard solicitud={solicitud} key={solicitud.noSolicitud}/>
                </Link>
            ))}
        </div>
    );
}