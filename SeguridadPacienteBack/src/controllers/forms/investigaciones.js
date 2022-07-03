/* eslint-disable camelcase */
const { sequelize } = require("../../../config/db");
const InvestigacionesM5Model = require("../../models/forms/investigaciones5m");
// const InvestigacionesP5Model = require("../../models/forms/investigaciones5p");
// const InvestigacionesNaranjoModel = require("../../models/forms/investigacionesNaranjo");
// const InvestigacionesLondresModel = require("../../models/forms/investigacionesLondres");
// const DetallesModel = require("../../models/forms/detalles");
const MasterModel = require("../../models/forms/master");

exports.createInvM5 = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await InvestigacionesM5Model.findOne({
      where: { Id_Detalle: entry.Id_Detalle, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await InvestigacionesM5Model.create(entry);
      await MasterModel.update({
        Id_Investigacion: result.Id,
        Estado_Proceso: 3,
        Fecha_Modificacion: sequelize.literal("getdate()"),
      }, {
        where: { Id_Detalle: entry.Id_Detalle },
      });
      return res.status(200).json(result);
    }
    return res.status(503).send("No fue posible guardar la investigación ya que existe una activa");
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el detalle: , ${err.message}`);
  }
};

exports.getInvM5 = async (req, res) => {
  const { Id } = req.body;
  try {
    const data = await InvestigacionesM5Model.findOne({
      where: { Id, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteInvM5 = async (req, res) => {
  const { Id } = req.body;
  try {
    const data = await InvestigacionesM5Model.findOne({
      where: { Id, Estado: "ACT" },
    });
    if (data) {
      data.update({ Estado: "INA", Fecha_Modificacion: sequelize.literal("getdate()") });
      return res.status(200).json({ message: "Registro eliminado" });
    }
    return res.status(200).json({ message: "No hay registros para eliminar" });
  } catch (error) {
    return res.status(503).send("No fue posible consultar la tabla:", error);
  }
};
