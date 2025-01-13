/* eslint-disable camelcase */
const { Op } = require("sequelize");
const OportunidadesMejoraModel = require("../../models/forms/oportunidadesMejora");
const { enviarMail } = require("../../services/mailer");
const ResponsablesModel = require("../../models/combos/responsables");

// #### OPORTUNIDADES DE MEJORA ####
exports.createMejora = async (req, res) => {
  const mejoraObject = req.body;
  try {
    const data = await OportunidadesMejoraModel.bulkCreate(mejoraObject);
    mejoraObject.forEach(async (element) => {
      const { Correo } = await ResponsablesModel.findOne({
        where: { Id: element.Responsable, Estado: "ACT" },
        raw: true,
        attributes: ["Correo"],
      });
      await enviarMail("M", element.Codigo_Externo, Correo);
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send(`No fue posible guardar el registro: ${err}`);
  }
};

exports.getMejoras = async (req, res) => {
  const {
    Id_Master
  } = req.body;
  try {
    const data = await OportunidadesMejoraModel.findAll({
      where: {
        [Op.or]: [
          { Id_Master },
        ],
        Estado: "ACT",
      },
      order: [["Codigo_Externo", "ASC"]],
      include: [{
        model: ResponsablesModel,
        as: "Responsable_Join",
        where: { Estado: { [Op.or]: ["ACT", "INA"] } },
        attributes: ["NombreCompleto"],
      }],
      raw: true,
      nest: true,
    });

    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(503)
      .send(`No fue posible consultar los registros: ${err.message}`);
  }
};


exports.getMejora = async (req, res) => {
  const {
    Id
  } = req.body;
  try {
    const data = await OportunidadesMejoraModel.findAll({
      where: {
        [Op.or]: [
          { Id },
        ],
        Estado: "ACT",
      },
      order: [["Codigo_Externo", "ASC"]],
      include: [{
        model: ResponsablesModel,
        as: "Responsable_Join",
        where: { Estado: { [Op.or]: ["ACT", "INA"] } },
        attributes: ["NombreCompleto"],
      }],
      raw: true,
      nest: true,
    });

    return res.status(200).json(data);
  } catch (err) {
    return res
      .status(503)
      .send(`No fue posible consultar los registros: ${err.message}`);
  }
};

exports.updateMejora = async (req, res) => {
  const { Id, Porcentaje_Mejora } = req.body;
  try {
    await OportunidadesMejoraModel.update(
      {
        Porcentaje_Mejora,
      },
      {
        where: { Id },
      },
    );
    return res.status(200).json({ message: "Registro Actualizado" });
  } catch (err) {
    return res
      .status(503)
      .send(`No fue posible actualizar el registro: ${err.message}`);
  }
};
// #### FIN OPORTUNIDADES DE MEJORA ####
