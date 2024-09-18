function SolicitudCard ({ solicitud }) {
    console.log(solicitud)
    return(
        <div className="border-solid border-8 max-w-md p-10 rounded-md">
            <header>
                <h1 className="text-2xl font-bold">
                    Solicitud No. {solicitud.noSolicitud}
                </h1>
                <h1>
                    Equipo: {solicitud.equipoSerial}
                </h1>
            </header>
            <p>
                Fecha de Ingreso: {solicitud.fechaIngreso}
            </p>
            <p>
                Fecha de Entrega: {solicitud.fechaEntrega}
            </p>
            <p>
                Presupuesto: {solicitud.presupuesto}
            </p>
            <p>
                Estado: {solicitud.estadoSolicitud}
            </p>
        </div>
    );

}

export default SolicitudCard;