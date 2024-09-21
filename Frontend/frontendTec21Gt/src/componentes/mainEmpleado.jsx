import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export const MainEmpleado = () => {
    const endpointGetEmpleado = "http://localhost:4000/usuarios"
    const [empleado, setEmpleado] = useState([])
    useEffect(()=>{

        (async () =>{
            let fetchEmpleado = await fetch(endpointGetEmpleado, {credentials: 'include'})
            let dataEmpleado = await fetchEmpleado.json()
            setEmpleado(dataEmpleado)
        })()
    }, [])

    const deleteEmpleado = async (noEmpleado) => {
        const endpointDeleteEmpleado = `http://localhost:4000/usuarios/borrar/${noEmpleado}`;
        try {
            let fetchResp = await fetch(endpointDeleteEmpleado, {
                method: 'PUT',
                credentials: 'include',
            });

            if (!fetchResp.ok) {
                throw new Error('Error updating employee type');
            }

            setEmpleado((prevEmpleados) => prevEmpleados.filter(emp => emp.noEmpleado !== noEmpleado));
            alert('El empleado a sido borrado exitosamente');
        } catch (error) {
            console.error(error);
            alert('Fallo al borrar al empelado');
        }
    };

    return (
        <div>
            <div className="flex flex-col items-start mb-5">
                <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
                <Link to="/Empleado/crearEmpleado">
                    <button className="bg-blue-600 text-white rounded-full px-4 py-2 shadow-md hover:bg-blue-700 transition">
                        Nuevo Empleado
                    </button>
                </Link>
            </div>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Numero Empleado</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Nombre Empleado</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Usuario</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Area</th>
                            <th className="py-3 px-4 border-b text-left text-gray-600 font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleado.map((empleado) => (
                            <tr key={empleado.noEmpleado}>
                                <td className="py-2 px-4 border-b">{empleado.noEmpleado}</td>
                                <td className="py-2 px-4 border-b">{empleado.nombreUsuario}</td>
                                <td className="py-2 px-4 border-b">{empleado.usuarioEmpleado}</td>
                                <td className="py-2 px-4 border-b">{empleado.tipoEmpleado}</td>
                                <td>
                                    <button onClick={()=>{
                                        deleteEmpleado(empleado.noEmpleado)
                                    }} className="bg-red-500 text-white rounded-full px-4 py-2 hover:bg-red-600 transition">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}