function CatalogoCard ({ producto }) {
    console.log(producto)
    return(
        <div className="border-solid border-8 max-w-md p-10 rounded-md">
            <header>
                <h1 className="text-2xl font-bold">
                    {producto.nombreProducto}
                </h1>
            </header>
            <p>
                Precio: {producto.precio}
            </p>
            <p>Existencia: {producto.existencias}</p>
        </div>
    );

}

export default CatalogoCard;