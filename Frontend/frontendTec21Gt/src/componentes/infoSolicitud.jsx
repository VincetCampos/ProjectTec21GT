import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';


export const InfoSolicitud = () =>{
    const { noSolicitud } = useParams();

    const [solicitud, setSolicitud] = useState([]);
    const [repuesto, setRepuesto] = useState([]);
    const [addRepuesto, setAddRepuesto] = useState({
        noEquipo: 0,
        noSolicitud: 0,
        tipoRepuesto: "",
        nombreRepuesto: "",
        marca: "",
        modelo: "",
        precioRepuesto: 0
    });
    const [nuevoEstado, setNuevoEstado] = useState('');

    useEffect(() => {
        const fetchSolicitudData = async () => {
            const fetchSolicitud = await fetch(`http://localhost:4000/solicitudes/${noSolicitud}`, { credentials: 'include' });
            const dataSolicitud = await fetchSolicitud.json();
            setSolicitud(dataSolicitud);
        };

        const fetchRepuestoData = async () => {
            const fetchRepuesto = await fetch(`http://localhost:4000/repuestos/${noSolicitud}`, { credentials: 'include' });
            const dataRepuesto = await fetchRepuesto.json();
            setRepuesto(dataRepuesto);
        };

        fetchSolicitudData();
        fetchRepuestoData();
    }, [noSolicitud]);

    useEffect(() => {
        if (solicitud) {
            setAddRepuesto({
                noSolicitud: solicitud.noSolicitud,
                noEquipo: solicitud.noEquipo,
                tipoRepuesto: "",
                nombreRepuesto: "",
                marca: "",
                modelo: "",
                precioRepuesto: 0
            });
        }
    }, [solicitud]);

const cambioDatos = (e) =>{
    e.preventDefault()
    setAddRepuesto({
        ...addRepuesto,
        [e.target.name]: e.target.value
    })
}

const formSubmit = async(e) => {
    e.preventDefault()

    console.log(addRepuesto)

    let fetchResp = await fetch("http://localhost:4000/repuestos", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(addRepuesto),
        credentials: 'include'
    })
    let respJson = await fetchResp.json()
    console.log(respJson)

    if (fetchResp.ok) {
        const fetchRepuesto = await fetch(`http://localhost:4000/repuestos/${noSolicitud}`, { credentials: 'include' });
        const dataRepuesto = await fetchRepuesto.json();
        setRepuesto(dataRepuesto);

        setAddRepuesto({
            noEquipo: solicitud.noEquipo,
            noSolicitud: solicitud.noSolicitud,
            tipoRepuesto: "",
            nombreRepuesto: "",
            marca: "",
            modelo: "",
            precioRepuesto: 0
        });
    }
}

const actualizarEstado = async () => {
    let fetchResp = await fetch(`http://localhost:4000/solicitudes/actualizar/${noSolicitud}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ estadoSolicitud: nuevoEstado }),
        credentials: 'include'
    });
    if (fetchResp.ok) {
        const fetchSolicitud = await fetch(`http://localhost:4000/solicitudes/${noSolicitud}`, { credentials: 'include' });
        const dataSolicitud = await fetchSolicitud.json();
        setSolicitud(dataSolicitud);
        alert('El estado de la solicitud ha sido actualizado exitosamente');
    }
};

    return(
        <div>
            <div>
                <h1>Solicitud No. {solicitud.noSolicitud}</h1>
                <h2>Estado: {solicitud.estadoSolicitud}</h2>
                <h2>Fecha de ingreso del equipo: {new Date(solicitud.fechaIngreso).toLocaleDateString()}</h2>
                <h2>Fecha para la entrega del equipo: {new Date(solicitud.fechaEntrega).toLocaleDateString()}</h2>
                <h2>Presupuesto de la solicitud: {solicitud.presupuesto}</h2>
            </div>
            <div>
                <h1>No. Serial del Equipo {solicitud.equipoSerial}</h1>
                <h2>Marca: {solicitud.marca}</h2>
                <h2>Modelo: {solicitud.modelo}</h2>
                <h2>Tipo de Equipo: {solicitud.tipoEquipo}</h2>
                <h2>Memoria RAM: {solicitud.ram}</h2>
                <h2>Almacenamiento: {solicitud.almacenamiento}</h2>
                <h2>Caracteristicas adicionales: {solicitud.otrasCaracteristicas}</h2>
                <h2>Constraseña del equipo: {solicitud.passwordEquipo}</h2>
                <h2>Razon para mantenimiento/Reparacion: {solicitud.problema}</h2>
            </div>
            <div className="mt-5">
                <label htmlFor="estado">Actualizar Estado de la Solicitud</label>
                <select
                    id="estado"
                    name="estado"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="border-2 border-b-sky-500 rounded-md"
                >
                    <option value="">Seleccione un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Iniciado">Iniciado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <button
                    onClick={actualizarEstado}
                    className="rounded-full bg-blue-500 px-2 py-2 ml-2"
                >
                    Actualizar Estado
                </button>
            </div>
            <div>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre del Repuesto</th>
                            <th className="py-2 px-4 border-b">Tipo de Repuesto</th>
                            <th className="py-2 px-4 border-b">Marca</th>
                            <th className="py-2 px-4 border-b">Modelo</th>
                            <th className="py-2 px-4 border-b">Precio del Repuesto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repuesto.map((repuesto) => (
                            <tr key={repuesto.noRepuesto}>
                                <td className="py-2 px-4 border-b">{repuesto.nombreRepuesto}</td>
                                <td className="py-2 px-4 border-b">{repuesto.tipoRepuesto}</td>
                                <td className="py-2 px-4 border-b">{repuesto.marca}</td>
                                <td className="py-2 px-4 border-b">{repuesto.modelo}</td>
                                <td className="py-2 px-4 border-b">{repuesto.precioRepuesto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center" onSubmit={formSubmit}>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="nombreRepuesto">Nombre del Repuesto</label>
                        <input name="nombreRepuesto" type="text" 
                                id="nombreRepuesto"
                                value={addRepuesto.nombreRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="tipoRepuesto">Tipo de Repuesto</label>
                        <input name="tipoRepuesto" type="text" 
                                id="tipoRepuesto"
                                value={addRepuesto.tipoRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="marca">marca</label>
                        <input name="marca" type="text" 
                                id="marca"
                                value={addRepuesto.marca}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="modelo">modelo</label>
                        <input name="modelo" type="text" 
                                id="modelo"
                                value={addRepuesto.modelo}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="precioRepuesto">Precio del Repuesto</label>
                        <input name="precioRepuesto" type="text" 
                                id="precioRepuesto"
                                value={addRepuesto.precioRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-b-sky-500 rounded-md"/>
                    </div>
                    <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Agregar repuesto</button>
                </form>
            </div>
        </div>
    )
}