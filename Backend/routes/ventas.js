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
                                                .query(`select v.noVenta, v.fechaVenta, v.estado, SUM(dv.subtotal) as total from Venta as v
                                                JOIN DetalleVenta as dv On v.noVenta = dv.noVenta
                                                Group By v.noVenta, v.fechaVenta, v.estado`)
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
module.exports = router;