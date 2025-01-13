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

exports.createPlanAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Descripcion", sql.VarChar, req.body.Descripcion)
            .input("Responsable", sql.UniqueIdentifier, req.body.Responsable)
            .input("UsuarioCreacion", sql.VarChar, req.Usuario.user.Id)
            .execute("SeguridadPaciente.dbo.SP_CreatePlanAccion");
        res.status(200).send(result2.recordsets[0][0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getAllPlanAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("Descripcion", sql.VarChar, req.body.Descripcion ? req.body.Descripcion : null)
            .input("Responsable", sql.UniqueIdentifier, (req.body.Responsable ? req.body.Responsable : null))
            .input("Fecha_Inicial", sql.Date, req.body.Start_Date ? req.body.Start_Date : null)
            .input("Fecha_Final", sql.Date, req.body.End_Date ? req.body.End_Date : null)
            .input("Page", sql.Int, req.body.Page)
            .input("RowsByPag", sql.Int, req.body.RowsByPag)
            .execute("SeguridadPaciente.dbo.SP_GetAllPlanAccion");
        // eslint-disable-next-line max-len
        res.status(200).send({ count: result2.recordsets[0][0].Count, data: result2.recordsets[1] });
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getPlanAccion = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("PlanAccionId", sql.UniqueIdentifier, req.params.Id)
            .execute("SeguridadPaciente.dbo.SP_GetPlanAccion");
        const data = result2.recordsets[0][0];
        // eslint-disable-next-line prefer-destructuring
        data.Planes = result2.recordsets[1];
        res.status(200).send(data);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getAllPlanesAccionByMasterId = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("MasterId", sql.UniqueIdentifier, req.params.MasterId)
            .execute("SeguridadPaciente.dbo.SP_GetAllPlanesAccionByMasterId");
        // eslint-disable-next-line max-len
        res.status(200).send({ news: result2.recordsets[0], olds: result2.recordsets[1] });
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.getAllQuejasAsociadasByPlanId = async (req, res) => {
    try {
        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("PlanAccionId", sql.UniqueIdentifier, req.params.PlanAccionId)
            .execute("SeguridadPaciente.dbo.SP_GetAllQuejasAsociadasByPlanId");
        // eslint-disable-next-line max-len
        res.status(200).send(result2.recordsets[0]);
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};

exports.createMasterPlanAccion = async (req, res) => {
    try {

        const table = new sql.Table();
        table.columns.add("Value", sql.UniqueIdentifier, { nullable: false });

        req.body.forEach(dato => {
            table.rows.add(dato.Id);
        });

        const pool = await sql.connect(config);
        // Stored procedure
        const result2 = await pool.request()
            .input("PlanAccionId", sql.UniqueIdentifier, req.params.PlanAccionId)
            .input("Quejas", table)
            .execute("SeguridadPaciente.dbo.SP_CreateMasterPlanAccion");
        // eslint-disable-next-line max-len
        res.status(200).send({ estado: result2.recordsets[0][0].estado });
    } catch (err) {
        res.status(400).send(`${err} ${req.body}`);
    }
};
