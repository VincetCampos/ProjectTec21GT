const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

router.get('/', async (req, res, next) => {
  let data = []

  try {
    await sql.connect(config)
    const productos = await sql.query(`Select p.noProducto, p.nombreProducto, p.descripcionExtra, SUM(dt.cantidad)as existencias from Producto as p
                                      Join DetalleProducto as dt
                                      On dt.noProducto = p.noProducto
                                      Group by p.noProducto, p.nombreProducto, p.descripcionExtra`)
    data = productos.recordset
    await sql.close()

  } catch (err) {
    console.error(err)
    data = err
    res.statusCode = 500
  }

  res.send(data)
});

router.post("/", async (req, res, next)=>{
    const Producto = req.body;
    let resultado = {}
    try {
      let connection = await sql.connect(config)
      const result = await connection
                                    .request()
                                    .input("noProducto", sql.Int, Producto.noProducto)
                                    .input("nombreProducto", sql.VarChar, Producto.nombreProducto)
                                    .input("marca", sql.VarChar, Producto.marca)
                                    .input("modelo", sql.VarChar, Producto.modelo)
                                    .input("descripcionExtra", sql.VarChar, Producto.descripcionExtra)
                                    .input("color", sql.VarChar, Producto.color)
                                    .input("precio", sql.Money, Producto.precio)
                                    .input("cantidad", sql.Int, Producto.cantidad)
                                    .batch(`
                                          INSERT into Producto(noProducto, nombreProducto, marca, modelo, descripcionExtra)
                                          SELECT @noProducto, @nombreProducto, @marca, @modelo, @descripcionExtra
                                          WHERE NOT EXISTS (
                                            SELECT 1 FROM Producto WHERE noProducto = @noProducto);
                                          INSERT into DetalleProducto(noProducto, color, precio, fechaIngreso, cantidad)values(@noProducto, @color, @precio, GETDATE(), @cantidad);
                                        `)
      resultado = result.rowsAffected
      await connection.close()
  
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      resultado = res
    }
    res.send(resultado)
  })

  router.get('/:noProducto', async (req, res, next) => {
    let data = []
  
    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .input("noProducto", sql.Int, req.params.noProducto)
                                                .query(`Select dp.noDetalleProducto, p.nombreProducto, p.marca, p.modelo, p.descripcionExtra, dp.color, dp.precio, dp.fechaIngreso, dp.cantidad From Producto as p
                                                        JOIN DetalleProducto as dp
                                                        On dp.noProducto = p.noProducto
                                                        Where p.noProducto = @noProducto`)
      data = resultado.recordset
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });
  
  router.get('/detalleProducto/:noVenta', async (req, res, next) => {
    let data = []
    let { noVenta } = req.params

    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .input("noVenta", sql.Int, noVenta)
                                                .query(`Select dv.noDetalleVenta, p.nombreProducto, p.marca, dv.cantidad, dv.precioUnitario from DetalleVenta as dv
                                                        JOIN Producto as p On p.noProducto = dv.noProducto
                                                        Where dv.noVenta = @noVenta`)
      data = resultado.recordset
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });
  module.exports = router;