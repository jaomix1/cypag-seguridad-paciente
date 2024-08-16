/* eslint-disable padded-blocks */
/* eslint-disable space-before-blocks */
/* eslint-disable indent */
/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");

const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();
const config = {
    user: process.env.USER,
    password: process.env.PASS,
    server: process.env.SERVER_SQL,
    database: process.env.BDLogin,
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

exports.crearPlan = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Accion", sql.VarChar, req.body.Accion)
            .input("Responsable", sql.UniqueIdentifier, req.body.Responsable)
            .input("FechaInicio", sql.DateTime, req.body.FechaInicio)
            .input("FechaFin", sql.DateTime, req.body.FechaFin)
            .input("EvidenciaCierre", sql.VarChar, req.body.EvidenciaCierre)
            .input("OportunidadId", sql.UniqueIdentifier, req.params.OportunidadId)
            .input("PorcentajeMejora", sql.Int, req.body.PorcentajeMejora)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.createPlan");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};


exports.getPlan = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("PlanId", sql.Int, req.params.Id)
            .execute("SeguridadPaciente.dbo.getPlan");
        let data = result2.recordsets[0][0];
        data.Seguimientos = result2.recordsets[1];
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};


exports.crearSeguimiento = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("PlanId", sql.Int, req.params.PlanId)
            .input("Seguimiento", sql.VarChar, req.body.Seguimiento)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.createSeguimiento");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};