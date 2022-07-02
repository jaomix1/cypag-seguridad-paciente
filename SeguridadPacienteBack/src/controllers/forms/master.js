/* eslint-disable camelcase */
const moment = require("moment");
const { Op } = require("sequelize");
const EmpresasModel = require("../../models/combos/empresas");
const SedesModel = require("../../models/combos/sedes");
const TiposNovedadModel = require("../../models/combos/tiposNovedad");
const MasterModel = require("../../models/forms/master");

exports.createEntry = async (req, res) => {
  const entry = { ...req.body };
  // console.log("IMAGEN:::", entry.Imagen_Archivo);
  if (entry.Imagen_Archivo) {
    delete entry.Imagen_Evidencia;
  }
  try {
    await MasterModel.create(entry);
    return res.status(200).json({ message: "Registro Creado" });
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el registro: , ${err.message}`);
  }
  // next();
};

exports.getAnswers = async (req, res) => {
  const {
    Id, Numero_Id, Start_Date, End_Date, Tipo_Novedad, Empresa, Sede,
  } = req.body;
  try {
    const answers = await MasterModel.findAll({
      where: {
        [Op.or]: [
          { Id },
          { Numero_Id },
          {
            Fecha_Incidente: {
              [Op.gte]: Start_Date,
              [Op.lte]: End_Date || moment().format("YYYY-MM-DD"),
              // [Op.between]: [`${Start_Date}T00:00.000Z`, `${End_Date}T23:59.000Z`],
            },
          },
          { Tipo_Novedad },
          { Empresa },
          { Sede },
        ],
      },
      order: [["Fecha_Incidente", "ASC"]],
      include: [{
        model: TiposNovedadModel,
        as: "Tipo_Novedad_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
      }, {
        model: EmpresasModel,
        as: "Empresa_Join",
        where: { Estado: "ACT" },
        attributes: ["Nombre"],
      }, {
        model: SedesModel,
        as: "Sede_Join",
        where: { Estado: "ACT" },
        attributes: ["Nombre"],
      }],
    });
    return res.status(200).json(answers);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla:", err);
  }
};
