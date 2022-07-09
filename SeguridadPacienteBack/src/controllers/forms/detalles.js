/* eslint-disable camelcase */
const { sequelize } = require("../../models/forms/detalles");
const DetallesModel = require("../../models/forms/detalles");
const InvestigacionesM5Model = require("../../models/forms/investigaciones5m");
const InvestigacionesP5Model = require("../../models/forms/investigaciones5p");
const InvestigacionesNaranjoModel = require("../../models/forms/investigacionesNaranjo");
const InvestigacionesLondresModel = require("../../models/forms/investigacionesLondres");

exports.createDetail = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await DetallesModel.findOne({
      where: { Id_Master: entry.Id_Master, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await DetallesModel.create(entry);
      return res.status(200).json(result);
    }
    return res
      .status(503)
      .send("No fue posible guardar el detalle ya que existe uno activo");
  } catch (err) {
    // Implementar Error Responses
    return res
      .status(503)
      .send(`No fue posible guardar el detalle: , ${err.message}`);
  }
};

exports.getDetail = async (req, res) => {
  const { Id_Master } = req.body;
  try {
    const data = await DetallesModel.findOne({
      where: { Id_Master, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteDetail = async (req, res) => {
  const { Id_Master } = req.body;
  try {
    const data = await DetallesModel.findOne({
      where: { Id_Master, Estado: "ACT" },
    });
    if (data) {
      switch (data.Tipo_Investigacion) {
        case "Investigaciones_M5":
          await InvestigacionesM5Model.update(
            {
              Estado: "INA",
              Fecha_Modificacion: sequelize.literal("getdate()"),
            },
            {
              where: { Id_Detalle: data.id, Estado: "ACT" },
            },
          );
          break;
        case "Investigaciones_P5":
          await InvestigacionesP5Model.update(
            {
              Estado: "INA",
              Fecha_Modificacion: sequelize.literal("getdate()"),
            },
            {
              where: { Id_Detalle: data.id, Estado: "ACT" },
            },
          );
          break;
        case "Investigaciones_Naranjo":
          await InvestigacionesNaranjoModel.update(
            {
              Estado: "INA",
              Fecha_Modificacion: sequelize.literal("getdate()"),
            },
            {
              where: { Id_Detalle: data.id, Estado: "ACT" },
            },
          );
          break;
        case "Investigaciones_Londres":
          await InvestigacionesLondresModel.update(
            {
              Estado: "INA",
              Fecha_Modificacion: sequelize.literal("getdate()"),
            },
            {
              where: { Id_Detalle: data.id, Estado: "ACT" },
            },
          );
          break;
        default:
          // Nothing
          break;
      }
      data.update({
        Estado: "INA",
        Fecha_Modificacion: sequelize.literal("getdate()"),
      });
      return res.status(200).json({ message: "Registro eliminado" });
    }
    return res.status(200).json({ message: "No hay registros para eliminar" });
  } catch (error) {
    return res.status(503).send("No fue posible consultar la tabla:", error);
  }
};
