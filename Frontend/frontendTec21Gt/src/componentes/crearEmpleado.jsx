import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CrearEmpleado = ()=>{

    const endpointEmpleado = "http://localhost:4000/usuarios"

    const [empleado, SetEmpleado] = useState({
        nombreUsuario: "",
        usuarioEmpleado: "",
        passwordEmpleado: "",
        tipoEmpleado: ""
    })
    const navigate = useNavigate();

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(empleado)

        let fetchResp = await fetch(endpointEmpleado, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(empleado),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
        navigate('/Empleado')
    }

    return(
        <form className="flex flex-wrap border-4 border-gray-300 p-6 rounded-md justify-center bg-white shadow-md" onSubmit={formSubmit}>
            <div className="flex flex-col w-60 mr-4">
                <label className="text-gray-700 mb-1" htmlFor="nombreUsuario">Nombre del Empleado</label>
                <input name="nombreUsuario" type="text" 
                        id="nombreUsuario"
                        value={empleado.nombreUsuario}
                        onChange={cambioDatos}
                        className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
            <div className="flex flex-col w-60 mr-4">
                <label className="text-gray-700 mb-1" htmlFor="usuarioEmpleado">Usuario del Empleado</label>
                <input name="usuarioEmpleado" type="text" 
                        id="usuarioEmpleado"
                        value={empleado.usuarioEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
            <div className="flex flex-col w-60 mr-4">
                <label className="text-gray-700 mb-1" htmlFor="passwordEmpleado">Contraseña del Empleado</label>
                <input name="passwordEmpleado" type="password" 
                        id="passwordEmpleado"
                        value={empleado.passwordEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
            <div className="flex flex-col w-60 mr-4">
                <label className="text-gray-700 mb-1" htmlFor="tipoEmpleado">Tipo del Empleado</label>
                <input name="tipoEmpleado" type="text" 
                        id="tipoEmpleado"
                        value={empleado.tipoEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"/>
            </div>
            <button className="rounded-full bg-green-500 text-white px-4 py-2 mt-4 hover:bg-green-600 transition">Guardar</button>
        </form>
    )
}