function CatalogoCard ({ producto }) {
    console.log(producto)
    return(
        <div className="border-4 border-gray-300 bg-white max-w-md p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <header className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    {producto.noProducto + " " + producto.nombreProducto}
                </h1>
            </header>
            <p className="text-gray-600 mb-2">
                Descripción Extra: {producto.descripcionExtra}
            </p>
            <p className={`font-semibold ${producto.existencias === 0 ? "text-red-500" : "text-green-600"}`}>
                Existencia: {producto.existencias === 0 ? "Sin existencias" : producto.existencias}
            </p>
        </div>
    );

}

export default CatalogoCard;