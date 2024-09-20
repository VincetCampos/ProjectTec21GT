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
            <h1>Usuarios</h1>
            <Link to="/Empleado/crearEmpleado">
                <button>Nuevo Empleado</button>
            </Link>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Numero Empleado</th>
                            <th className="py-2 px-4 border-b">Nombre Empleado</th>
                            <th className="py-2 px-4 border-b">Usuario</th>
                            <th className="py-2 px-4 border-b">Area</th>
                            <th className="py-2 px-4 border-b">Acciones</th>
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
                                        console.log(empleado.noEmpleado)
                                    }}>Editar</button>
                                    <button onClick={()=>{
                                        deleteEmpleado(empleado.noEmpleado)
                                    }}>Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}