const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

router.get('/', async (req, res, next) => {
    let data = []
  
    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .query(`select noVenta, fechaVenta, estado from Venta`)
      data = resultado.recordset
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });

  router.post("/", async (req, res, next)=>{
    const Venta = req.body;
    let resultado = {}
    try {
      let connection = await sql.connect(config)
      const result = await connection
                                    .request()
                                    .input("fechaVenta", sql.Date, Venta.fechaVenta)
                                    .input("estado", sql.VarChar, Venta.estado)
                                    .input("GUI", sql.VarChar, Venta.gui)
                                    .input("tipoVenta", sql.VarChar, Venta.tipoVenta)
                                    .query(`INSERT INTO Venta (fechaVenta, estado, GUI, tipoVenta) Values (@fechaVenta, @estado, @GUI, @tipoVenta)`)
      resultado = result.rowsAffected
      await connection.close()
  
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      resultado = res
    }
    res.send(resultado)
  })

  router.get('/:noVenta', async (req, res, next) => {
    let data = []
  
    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .input("noVenta", sql.Int, req.params.noVenta)
                                                .query(`SELECT noVenta, fechaVenta, estado, GUI, tipoVenta FROM Venta WHERE noVenta = @noVenta`)
      data = resultado.recordset[0]
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });

  router.post("/detalleVenta", async (req, res, next)=>{
    const DetalleVenta = req.body;
    let resultado = {}
    try {
      let connection = await sql.connect(config)

      const checkResult = await connection.request()
      .input("noProducto", sql.Int, DetalleVenta.noProducto)
      .query("SELECT noProducto FROM Producto WHERE noProducto = @noProducto");

      if (checkResult.recordset.length === 0) {
          return res.status(404).send({ message: "No se encontro el producto" });
      }
      const result = await connection
                                    .request()
                                    .input("noVenta", sql.Int, DetalleVenta.noVenta)
                                    .input("noProducto", sql.Int, DetalleVenta.noProducto)
                                    .input("color", sql.VarChar, DetalleVenta.color)
                                    .input("fechaVenta", sql.VarChar, DetalleVenta.fechaVenta)
                                    .input("cantidad", sql.Int, DetalleVenta.cantidad)
                                    .input("precioUnitario", sql.Money, DetalleVenta.precioUnitario)
                                    .batch(`INSERT INTO detalleVenta (noVenta, noProducto, cantidad, precioUnitario) Values (@noVenta, @noProducto, @cantidad, @precioUnitario)
                                            INSERT INTO detalleProducto (noProducto, color, fechaIngreso, cantidad, precio) Values (@noProducto, @color, @fechaVenta, @cantidad*-1, @precioUnitario)`)
      resultado = result.rowsAffected
      await connection.close()
  
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      resultado = res
    }
    res.send(resultado)
  })

  router.put('/actualizar/:noVenta', async (req, res) => {
    try {
        const connection = await sql.connect(config);
        const {noVenta} = req.params;
        const {estado} = req.body

        const checkResult = await connection.request()
            .input("noVenta", sql.Int, noVenta)
            .query("SELECT noVenta FROM Venta WHERE noVenta = @noVenta");

        if (checkResult.recordset.length === 0) {
            return res.status(404).send({ message: "No se encontro la venta" });
        }

        // Update the employee type to "Borrado"
        const updateResult = await connection.request()
            .input("noVenta", sql.Int, noVenta)
            .input("estado", sql.VarChar, estado)
            .query("UPDATE Venta SET estado = @estado WHERE noVenta = @noVenta");

        res.send({ rowsAffected: updateResult.rowsAffected });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});
module.exports = router;