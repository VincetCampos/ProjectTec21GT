const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")

router.get('/', async (req, res, next) => {
    let data = []
  
    try {
      await sql.connect(config)
      const solicitud = await sql.query(`Select s.noSolicitud, e.equipoSerial, s.fechaIngreso, s.fechaEntrega, s.presupuesto, s.estadoSolicitud
                                        From Solicitud as s
                                        JOIN Equipo as e On e.noEquipo = s.noEquipo`)
      data = solicitud.recordset
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });

  router.get('/:noSolicitud', async (req, res, next) => {
    let data = []
    let { noSolicitud } = req.params

    try {
      const connection = await sql.connect(config)
      //ejecutamos la consulta
      const resultado = await connection.request()
                                                .input("noSolicitud", sql.Int, noSolicitud)
                                                .query(`Select s.noSolicitud, s.noEquipo, s.estadoSolicitud, s.fechaIngreso, s.fechaEntrega, s.presupuesto,
                                                        e.equipoSerial, e.marca, e.modelo, e.tipoEquipo, e.procesador, e.ram, e.almacenamiento, e.otrasCaracteristicas,
                                                        e.passwordEquipo, e.problema
                                                        From Solicitud as s
                                                        JOIN Equipo as e On e.noEquipo = s.noEquipo
                                                        WHERE noSolicitud =  @noSolicitud`)
      data = resultado.recordset[0]
      await sql.close()
  
    } catch (err) {
      console.error(err)
      data = err
      res.statusCode = 500
    }
  
    res.send(data)
  });

  router.put('/actualizar/:noSolicitud', async (req, res, next) => {
    let data = []
    let { noSolicitud } = req.params
    let { estadoSolicitud } = req.body
    try {
        const connection = await sql.connect(config)
        const checkResult = await connection.request()
            .input("noSolicitud", sql.Int, noSolicitud)
            .query("SELECT noSolicitud FROM Solicitud WHERE noSolicitud = @noSolicitud");

        if (checkResult.recordset.length === 0) {
            return res.status(404).send({ message: "No se encontró la solicitud" });
        }

        // Ejecutamos la consulta
        const resultado = await connection.request()
            .input("noSolicitud", sql.Int, noSolicitud)
            .input("estadoSolicitud", sql.VarChar, estadoSolicitud)
            .query(`UPDATE Solicitud SET estadoSolicitud = @estadoSolicitud WHERE noSolicitud = @noSolicitud`)
        data = resultado.rowsAffected
        await sql.close()
    } catch (err) {
        console.error(err)
        data = err
        res.statusCode = 500
    }

    res.send(data)
})

module.exports = router