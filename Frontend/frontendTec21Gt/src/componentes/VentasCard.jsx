function VentasCard ({ venta }) {
    console.log(venta)
    return(
        <div className="border-solid border-8 max-w-md p-10 rounded-md">
            <header>
                <h1 className="text-2xl font-bold">
                    {"venta No. " + venta.noVenta}
                </h1>
            </header>
            <p>Estado: {venta.estado}</p>
            <p>Fecha: {new Date(venta.fechaVenta).toLocaleDateString()}</p>
        </div>
    );

}

export default VentasCard;