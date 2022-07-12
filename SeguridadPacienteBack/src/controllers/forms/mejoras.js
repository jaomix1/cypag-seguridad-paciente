/* eslint-disable camelcase */
const { Op } = require("sequelize");
const OportunidadesMejoraModel = require("../../models/forms/oportunidadesMejora");

// #### OPORTUNIDADES DE MEJORA ####
exports.createMejora = async (req, res) => {
  const mejoraObject = req.body;
  try {
    const data = await OportunidadesMejoraModel.bulkCreate(mejoraObject);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send(`No fue posible guardar el registro: ${err}`);
  }
};

exports.getMejora = async (req, res) => {
  const {
    Id,
    Id_Master,
    Codigo_Externo,
    Start_Date,
    End_Date,
    Responsable,
  } = req.body;
  try {
    const data = await OportunidadesMejoraModel.findAll({
      where: {
        [Op.or]: [
          { Id },
          { Codigo_Externo },
          { Id_Master },
          {
            Fecha_Creacion: {
              [Op.gte]: Start_Date,
              [Op.lte]: End_Date,
            },
          },
          { Responsable },
        ],
        Estado: "ACT",
      },
      order: [["Codigo_Externo", "ASC"]],
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
