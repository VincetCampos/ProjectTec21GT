const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

router.get('/:noSolicitud', async (req, res, next) => {
    let data = []
    let { noSolicitud } = req.params
  
    try {
      const connection = await sql.connect(config)

      const resultado = await connection.request()
                                                .input('noSolicitud', sql.Int, noSolicitud)
                                                .query(`Select noRepuesto, nombreRepuesto, tipoRepuesto, marca, modelo, precioRepuesto
                                                        From Repuesto
                                                        Where noSolicitud = @noSolicitud`)
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
    const Repuesto = req.body;
    let resultado = {}
    try {
      let connection = await sql.connect(config)
      const result = await connection
                                    .request()
                                    .input("noEquipo", sql.Int, Repuesto.noEquipo)
                                    .input("noSolicitud", sql.Int, Repuesto.noSolicitud)
                                    .input("tipoRepuesto", sql.VarChar, Repuesto.tipoRepuesto)
                                    .input("nombreRepuesto", sql.VarChar, Repuesto.nombreRepuesto)
                                    .input("marca", sql.VarChar, Repuesto.marca)
                                    .input("modelo", sql.VarChar, Repuesto.modelo)
                                    .input("precioRepuesto", sql.Money, Repuesto.precioRepuesto)
                                    .query(`INSERT INTO Repuesto (noEquipo, noSolicitud, tipoRepuesto, nombreRepuesto, marca, modelo, precioRepuesto) 
                                        Values (@noEquipo, @noSolicitud, @tipoRepuesto, @nombreRepuesto, @marca, @modelo, @precioRepuesto)`)
      resultado = result.rowsAffected
      await connection.close()
  
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      resultado = res
    }
    res.send(resultado)
  })

module.exports = router