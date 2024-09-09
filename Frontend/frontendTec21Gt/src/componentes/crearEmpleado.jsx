import { useState } from "react"

export const CrearEmpleado = ()=>{

    const endpointEmpleado = "http://localhost:4000/usuarios"

    const [empleado, SetEmpleado] = useState({
        nombreUsuario: "",
        usuarioEmpleado: "",
        passwordEmpleado: "",
        tipoEmpleado: ""
    })

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
            body: JSON.stringify(empleado)
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
    }

    return(
        <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center" onSubmit={formSubmit}>
            <div className="flex flex-col">
                <label className="ingresoEmpleado" htmlFor="nombreUsuario">Nombre del Empleado</label>
                <input name="nombreUsuario" type="text" 
                        id="nombreUsuario"
                        value={empleado.nombreUsuario}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoEmpleado" htmlFor="usuarioEmpleado">Usuario del Empleado</label>
                <input name="usuarioEmpleado" type="text" 
                        id="usuarioEmpleado"
                        value={empleado.usuarioEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoEmpleado" htmlFor="passwordEmpleado">Contraseña del Empleado</label>
                <input name="passwordEmpleado" type="text" 
                        id="passwordEmpleado"
                        value={empleado.passwordEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="ingresoEmpleado" htmlFor="tipoEmpleado">Tipo del Empleado</label>
                <input name="tipoEmpleado" type="text" 
                        id="tipoEmpleado"
                        value={empleado.tipoEmpleado}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Guardar</button>
        </form>
    )
}