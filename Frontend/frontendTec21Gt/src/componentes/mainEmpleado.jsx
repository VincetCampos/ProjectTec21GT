import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export const MainEmpleado = () => {
    const [empleado, SetEmpleado] = useState([])
    useEffect(()=>{

        (async () =>{
            let fetchEmpleado = await fetch("http://localhost:4000/usuarios")
            let dataEmpleado = await fetchEmpleado.json()
            SetEmpleado(dataEmpleado)
        })()
    }, [])

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
                                    <button className="" >Editar</button>
                                    <button className="">Borrar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}