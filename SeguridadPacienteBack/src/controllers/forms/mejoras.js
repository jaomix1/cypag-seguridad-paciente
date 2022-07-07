/* eslint-disable camelcase */
const OportunidadesMejoraModel = require("../../models/forms/oportunidadesMejora");

// #### OPORTUNIDADES DE MEJORA ####
exports.createMejora = async (req, res) => {
  const {
    Id_Master,
    Codigo_Externo,
    Descripcion,
    Responsable,
  } = req.body;
  try {
    const entry = [];
    if (Codigo_Externo.length === Descripcion.length) {
      for (let i = 0; i < Descripcion.length; i += 1) {
        entry[i] = {
          Id_Master,
          Codigo_Externo: Codigo_Externo[i],
          Descripcion: Descripcion[i],
          Responsable: Responsable[i],
        };
      }
      const data = await OportunidadesMejoraModel.bulkCreate(entry);
      return res.status(200).json(data);
    }
    return res.status(503).send("Campos Faltantes");
  } catch (err) {
    return res.status(503).send(`No fue posible guardar el registro: ${err}`);
  }
};

exports.getMejora = async (req, res) => {
  const { Id_Master } = req.body;
  try {
    const data = await OportunidadesMejoraModel.findAll({
      where: { Id_Master, Estado: "ACT" },
      order: [["Codigo_Externo", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send(`No fue posible consultar los registros: ${err.message}`);
  }
};

exports.updateMejora = async (req, res) => {
  const { Id, Porcentaje_Mejora } = req.body;
  try {
    await OportunidadesMejoraModel.update({
      Porcentaje_Mejora,
    }, {
      where: { Id },
    });
    return res.status(200).json({ message: "Registro Actualizado" });
  } catch (err) {
    return res.status(503).send(`No fue posible actualizar el registro: ${err.message}`);
  }
};
// #### FIN OPORTUNIDADES DE MEJORA ####
