import { useState } from "react"

export const Equipos = () =>{

    const endpointEquipos = "http://localhost:4000/equipos"

    const [equipo, SetEquipo] = useState({
        equipoSerial:"",
        marca: "",
        modelo: "",
        procesador: "",
        ram : "",
        almacenamiento : "",
        tipoEquipo : "",
        otrasCaracteristicas : "",
        passwordEquipo : "",
        problema : ""
    })

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetEquipo({
            ...equipo,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(equipo)

        let fetchResp = await fetch(endpointEquipos, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(equipo),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
    }

    return(
        <form className="flex flex-wrap border-4 shrink space-x-5 space-y-5 ml-64 mr-64 rounded-md justify-center" onSubmit={formSubmit}>
            <div className="flex flex-col mt-5">
                <label htmlFor="equipoSerial">Numero de Serie</label>
                <input name="equipoSerial" type="text" 
                        id="equipoSerial"
                        value={equipo.equipoSerial}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="marca">Marca</label>
                <input name="marca" type="text" 
                        id="marca"
                        value={equipo.marca}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="modelo">Modelo</label>
                <input name="modelo" type="text" 
                        id="modelo"
                        value={equipo.modelo}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="procesador">Procesador</label>
                <input name="procesador" type="text" 
                        id="procesador"
                        value={equipo.procesador}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="ram">Memoria RAM</label>
                <input name="ram" type="text" 
                        id="ram"
                        value={equipo.ram}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="almacenamiento">Almacenamiento</label>
                <input name="almacenamiento" type="text" 
                        id="almacenamiento"
                        value={equipo.almacenamiento}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="tipoEquipo">Tipo de Equipo</label>
                <input name="tipoEquipo" type="text" 
                        id="tipoEquipo"
                        value={equipo.tipoEquipo}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="passwordEquipo">Contraseña del equipo</label>
                <input name="passwordEquipo" type="text" 
                        id="passwordEquipo"
                        value={equipo.passwordEquipo}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="otrasCaracteristicas">Caracteristicas adicionales</label>
                <textarea name="otrasCaracteristicas" type="text" 
                        id="otrasCaracteristicas"
                        value={equipo.otrasCaracteristicas}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md h-20 w-80"></textarea>
            </div>
            <div className="flex flex-col">
                <label htmlFor="problema">Que problema tiene su equipo</label>
                <textarea name="problema" type="text" 
                        id="problema"
                        value={equipo.problema}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md h-20 w-80"></textarea>
            </div>
            <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Guardar</button>
        </form>
    )
}