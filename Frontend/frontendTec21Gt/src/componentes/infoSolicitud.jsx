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
            <div className="bg-white shadow-lg rounded-lg p-6 m-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Solicitud No. {solicitud.noSolicitud}</h1>
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Estado: {solicitud.estadoSolicitud}</h2>
                <h2 className="text-lg text-gray-600 mb-1">Fecha de ingreso del equipo: {new Date(solicitud.fechaIngreso).toLocaleDateString('es-ES', {
                timeZone: 'UTC'
                })}</h2>
                <h2 className="text-lg text-gray-600 mb-1">Fecha para la entrega del equipo: {new Date(solicitud.fechaEntrega).toLocaleDateString('es-ES', {
                timeZone: 'UTC'
                })}</h2>
                <h2 className="text-lg text-gray-600 mb-1">Presupuesto de la solicitud: {solicitud.presupuesto}</h2>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
                <h1 className="text-xl font-bold mb-2">No. Serial del Equipo {solicitud.equipoSerial}</h1>
                <h2 className="text-lg text-gray-700 mb-1">Marca: {solicitud.marca}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Modelo: {solicitud.modelo}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Tipo de Equipo: {solicitud.tipoEquipo}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Memoria RAM: {solicitud.ram}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Almacenamiento: {solicitud.almacenamiento}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Características adicionales: {solicitud.otrasCaracteristicas}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Contraseña del equipo: {solicitud.passwordEquipo}</h2>
                <h2 className="text-lg text-gray-700 mb-1">Razón para mantenimiento/Reparación: {solicitud.problema}</h2>
            </div>
            <div className="mt-5 mb-6">
                <label htmlFor="estado" className="block text-lg font-medium text-gray-700 mb-2">Actualizar Estado de la Solicitud</label>
                <select
                    id="estado"
                    name="estado"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 mb-2"
                >
                    <option value="">Seleccione un estado</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Iniciado">Iniciado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                </select>
                <button
                    onClick={actualizarEstado}
                    className="rounded-full bg-blue-500 text-white px-4 py-2 ml-2 hover:bg-blue-600 transition"
                >
                    Actualizar Estado
                </button>
            </div>
            <div className="mb-6">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
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
                            <tr key={repuesto.noRepuesto} className="hover:bg-gray-100">
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
                <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center p-4 bg-gray-50" onSubmit={formSubmit}>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="nombreRepuesto" className="font-medium text-gray-700 mb-2">Nombre del Repuesto</label>
                        <input name="nombreRepuesto" type="text" 
                                id="nombreRepuesto"
                                value={addRepuesto.nombreRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-gray-300 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="tipoRepuesto" className="font-medium text-gray-700 mb-2">Tipo de Repuesto</label>
                        <input name="tipoRepuesto" type="text" 
                                id="tipoRepuesto"
                                value={addRepuesto.tipoRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-gray-300 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="marca" className="font-medium text-gray-700 mb-2">Marca</label>
                        <input name="marca" type="text" 
                                id="marca"
                                value={addRepuesto.marca}
                                onChange={cambioDatos}
                                className="border-2 border-gray-300 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="modelo" className="font-medium text-gray-700 mb-2">Modelo</label>
                        <input name="modelo" type="text" 
                                id="modelo"
                                value={addRepuesto.modelo}
                                onChange={cambioDatos}
                                className="border-2 border-gray-300 rounded-md p-2"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="precioRepuesto" className="font-medium text-gray-700 mb-2">Precio del Repuesto</label>
                        <input name="precioRepuesto" type="text" 
                                id="precioRepuesto"
                                value={addRepuesto.precioRepuesto}
                                onChange={cambioDatos}
                                className="border-2 border-gray-300 rounded-md p-2"/>
                    </div>
                    <button className="rounded-full bg-green-500 text-white px-4 py-2 mt-5 hover:bg-green-600 transition">
                        Agregar repuesto
                    </button>
                </form>
            </div>
            </div>
        </div>
    )
}