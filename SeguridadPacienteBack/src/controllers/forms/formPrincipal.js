// const moment = require("moment");
const sql = require("mssql");
const FormPrincipalModel = require("../../models/forms/formPrincipal");
const connectDatabase = require("../../../config/db");

exports.getAnswers = async (req, res) => {
  const { limit } = req.body;
  try {
    const answers = await FormPrincipalModel.findAll({
      where: { typist: req.Usuario.user.NombreCompleto },
      order: [["id", "DESC"]],
      limit,
    });
    return res.status(200).json(answers);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla");
  }
};

exports.createEntry = async (req, res) => {
  const entry = { ...req.body };
  entry.typist = req.Usuario.user.Id;
  // entry.entryTime = moment()
  //   .tz("America/New_York");
  try {
    const data = await FormPrincipalModel.create(entry);
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el registro, ${err.message}`);
  }
  // next();
};

exports.datedQuery = async (req, res) => {
  try {
    const { start, end } = req.body;
    const pool = await sql.connect(connectDatabase.config);
    let result;
    if (req.Usuario.user.Perfil === "digitador") {
      result = await pool
        .request()
        .input("fechasFin", sql.Date, end)
        .input("fechasInicio", sql.Date, start)
        // .input("ipsid", sql.Int, req.Usuario.user.IpsId)
        .input("userId", sql.VarChar, req.Usuario.user.Id)
        .execute("dbo.SP_Exportar_Excel_user");
    } else if (req.Usuario.user.Perfil === "facturacion" || req.Usuario.user.Perfil === "enfermera") {
      result = await pool
        .request()
        .input("fechasFin", sql.Date, end)
        .input("fechasInicio", sql.Date, start)
        .input("ipsid", sql.Int, req.Usuario.user.IpsId)
        // .input("userId", sql.VarChar, req.Usuario.user.Id)
        .execute("dbo.SP_Exportar_Excel_ips");
    } else {
      return res.status(503).send("No tiene permisos para ver esta información");
    }
    // console.log("Result: ", result);
    return res.status(200).send(result.recordset);
  } catch (error) {
    return res.status(503).send("No fue posible consultar los registros");
  }
};

exports.getSurvey = async (req, res) => {
  const { typeId, numberDoc } = req.body;
  try {
    const answers = await FormPrincipalModel.findOne({
      where: { typeId, numberDoc },
      order: [["id", "DESC"]],
    });
    return res.status(200).json(answers);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla");
  }
};

exports.updateSurvey = async (req, res) => {
  const { typeId, numberDoc } = req.body;
  try {
    const answers = await FormPrincipalModel.findOne({
      where: { typeId, numberDoc },
      order: [["id", "DESC"]],
    });
    const updatedObject = { ...req.body };
    await answers.update(updatedObject);
    return res.status(200).send("Fue Modificado el Registro");
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible modificar el registro: ${err.message}`);
  }
};
