import { useState } from "react"

export const CrearVentas = () => {
    const endpointVentas = "http://localhost:4000/ventas";

    const [ventas, SetVentas] = useState({
        fechaVenta: "",
        estado: "",
        gui: "",
        tipoVenta: ""
    })

    const cambioDatos = (e) =>{
        e.preventDefault()
        SetVentas({
            ...ventas,
            [e.target.name]: e.target.value
        })
    }

    const formSubmit = async(e) => {
        e.preventDefault()

        console.log(ventas)

        let fetchResp = await fetch(endpointVentas, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(ventas),
            credentials: 'include'
        })
        let respJson = await fetchResp.json()
        console.log(respJson)
    }

    return(
        <form className="flex flex-wrap border-4 space-x-5 space-y-5 ml-72 mr-72 rounded-md justify-center" onSubmit={formSubmit}>
            <div className="flex flex-col mt-5">
                <label htmlFor="fechaVenta">Fecha de venta</label>
                <input name="fechaVenta" type="text" 
                        id="fechaVenta"
                        value={ventas.fechaVenta}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="estado" htmlFor="estado">Estado de la Venta</label>
                <input name="estado" type="text" 
                        id="estado"
                        value={ventas.estado}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="gui" htmlFor="gui">GUI</label>
                <input name="gui" type="text" 
                        id="gui"
                        value={ventas.gui}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <div className="flex flex-col">
                <label className="tipoVenta" htmlFor="tipoVenta">Tipo de Venta</label>
                <input name="tipoVenta" type="text" 
                        id="tipoVenta"
                        value={ventas.tipoVenta}
                        onChange={cambioDatos}
                        className="border-2 border-b-sky-500 rounded-md"/>
            </div>
            <button className="rounded-full bg-green-500 place-self-end px-2 py-2">Crear venta</button>
        </form>
    )
}