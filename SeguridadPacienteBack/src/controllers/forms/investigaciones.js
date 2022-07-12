/* eslint-disable camelcase */
const { sequelize } = require("../../../config/db");
const InvestigacionesM5Model = require("../../models/forms/investigaciones5m");
const InvestigacionesP5Model = require("../../models/forms/investigaciones5p");
const InvestigacionesNaranjoModel = require("../../models/forms/investigacionesNaranjo");
const InvestigacionesLondresModel = require("../../models/forms/investigacionesLondres");
const DetallesModel = require("../../models/forms/detalles");

// Metodos Investigaciones M5
exports.createInvM5 = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await InvestigacionesM5Model.findOne({
      where: { Id_Detalle: entry.Id_Detalle, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await InvestigacionesM5Model.create(entry);
      await DetallesModel.update({
        Tipo_Investigacion: "Investigaciones_M5",
      }, {
        where: { id: entry.Id_Detalle },
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
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesM5Model.findOne({
      where: { Id_Detalle, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteInvM5 = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesM5Model.findOne({
      where: { Id_Detalle, Estado: "ACT" },
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

// Metodos Investigaciones P5
exports.createInvP5 = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await InvestigacionesP5Model.findOne({
      where: { Id_Detalle: entry.Id_Detalle, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await InvestigacionesP5Model.create(entry);
      await DetallesModel.update({
        Tipo_Investigacion: "Investigaciones_P5",
      }, {
        where: { id: entry.Id_Detalle },
      });
      return res.status(200).json(result);
    }
    return res.status(503).send("No fue posible guardar la investigación ya que existe una activa");
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el detalle: , ${err.message}`);
  }
};

exports.getInvP5 = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesP5Model.findOne({
      where: { Id_Detalle, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteInvP5 = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesP5Model.findOne({
      where: { Id_Detalle, Estado: "ACT" },
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

// Metodos Investigaciones Naranjo
exports.createInvNaranjo = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await InvestigacionesNaranjoModel.findOne({
      where: { Id_Detalle: entry.Id_Detalle, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await InvestigacionesNaranjoModel.create(entry);
      await DetallesModel.update({
        Tipo_Investigacion: "Investigaciones_Naranjo",
      }, {
        where: { id: entry.Id_Detalle },
      });
      return res.status(200).json(result);
    }
    return res.status(503).send("No fue posible guardar la investigación ya que existe una activa");
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el detalle: , ${err.message}`);
  }
};

exports.getInvNaranjo = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesNaranjoModel.findOne({
      where: { Id_Detalle, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteInvNaranjo = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesNaranjoModel.findOne({
      where: { Id_Detalle, Estado: "ACT" },
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

// Metodos Investigaciones Londres
exports.createInvLondres = async (req, res) => {
  const entry = { ...req.body };
  try {
    const regExistente = await InvestigacionesLondresModel.findOne({
      where: { Id_Detalle: entry.Id_Detalle, Estado: "ACT" },
    });
    if (!regExistente) {
      const result = await InvestigacionesLondresModel.create(entry);
      await DetallesModel.update({
        Tipo_Investigacion: "Investigaciones_Londres",
      }, {
        where: { id: entry.Id_Detalle },
      });
      return res.status(200).json(result);
    }
    return res.status(503).send("No fue posible guardar la investigación ya que existe una activa");
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el detalle: , ${err.message}`);
  }
};

exports.getInvLondres = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesLondresModel.findOne({
      where: { Id_Detalle, Estado: "ACT" },
    });
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};

exports.deleteInvLondres = async (req, res) => {
  const { Id_Detalle } = req.body;
  try {
    const data = await InvestigacionesLondresModel.findOne({
      where: { Id_Detalle, Estado: "ACT" },
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
