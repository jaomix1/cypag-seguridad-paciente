/* eslint-disable camelcase */
const moment = require("moment");
const { Op } = require("sequelize");
const EmpresasModel = require("../../models/combos/empresas");
const SedesModel = require("../../models/combos/sedes");
const ServiciosModel = require("../../models/combos/servicios");
const TiposIdModel = require("../../models/combos/tiposId");
const TiposNovedadModel = require("../../models/combos/tiposNovedad");
const DetallesModel = require("../../models/forms/detalles");
const InvestigacionesM5Model = require("../../models/forms/investigaciones5m");
const InvestigacionesP5Model = require("../../models/forms/investigaciones5p");
const InvestigacionesLondresModel = require("../../models/forms/investigacionesLondres");
const InvestigacionesNaranjoModel = require("../../models/forms/investigacionesNaranjo");
const MasterModel = require("../../models/forms/master");
const OportunidadesMejoraModel = require("../../models/forms/oportunidadesMejora");

// #### FORMULARIO MASTER ####
exports.createEntry = async (req, res) => {
  const entry = { ...req.body };
  // console.log("IMAGEN:::", entry.Imagen_Archivo);
  if (entry.Imagen_Archivo) {
    delete entry.Imagen_Evidencia;
  }
  entry.Codigo = moment().format("YYYYMMDDHHmmss");
  try {
    await MasterModel.create(entry);
    return res.status(200).json({ message: "Registro Creado" });
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el registro: ${err.message}`);
  }
  // next();
};

exports.getAnswers = async (req, res) => {
  const {
    Codigo, Numero_Id, Start_Date, End_Date, Tipo_Novedad, Empresa, Sede,
  } = req.body;
  try {
    const answers = await MasterModel.findAll({
      where: {
        [Op.or]: [
          { Codigo },
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
      }, {
        model: TiposIdModel,
        as: "Tipo_Id_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
      }, {
        model: ServiciosModel,
        as: "Servicio_Id_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
      }],
    });
    return res.status(200).json(answers);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send("No fue posible consultar la tabla: ", err);
  }
};

exports.getAllData = async (req, res) => {
  const { Id_Master } = req.body;
  try {
    let [
      detalleData,
      opcionesMejora,
      InvestigacionM5Data,
      InvestigacionP5Data,
      InvestigacionNaranjoData,
      InvestigacionLondresData,
    ] = [null, null, null, null, null, null];

    const masterData = await MasterModel.findOne({
      where: { Id: Id_Master, Estado: "ACT" },
      raw: true,
      nest: true,
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
      }, {
        model: TiposIdModel,
        as: "Tipo_Id_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
      }, {
        model: ServiciosModel,
        as: "Servicio_Id_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
      }],
    });

    if (masterData) {
      detalleData = await DetallesModel.findOne({
        where: { Id_Master, Estado: "ACT" },
        include: [{
          model: TiposNovedadModel,
          as: "Tipo_Novedad_Join",
          where: { Estado: "ACT" },
          attributes: ["Descripcion"],
        }],
        raw: true,
        nest: true,
      });

      opcionesMejora = await OportunidadesMejoraModel.findAll({
        where: { Id_Master, Estado: "ACT" },
        raw: true,
      });
    }

    if (detalleData) {
      InvestigacionM5Data = await InvestigacionesM5Model.findOne({
        where: { Id_Detalle: detalleData.id, Estado: "ACT" },
        raw: true,
      });

      InvestigacionP5Data = await InvestigacionesP5Model.findOne({
        where: { Id_Detalle: detalleData.id, Estado: "ACT" },
        raw: true,
      });

      InvestigacionNaranjoData = await InvestigacionesNaranjoModel.findOne({
        where: { Id_Detalle: detalleData.id, Estado: "ACT" },
        raw: true,
      });

      InvestigacionLondresData = await InvestigacionesLondresModel.findOne({
        where: { Id_Detalle: detalleData.id, Estado: "ACT" },
        raw: true,
      });
    }
    const objFinal = {
      Master: masterData,
      Detalle: detalleData,
      OpcionesMejora: opcionesMejora,
      M5: InvestigacionM5Data,
      P5: InvestigacionP5Data,
      Naranjo: InvestigacionNaranjoData,
      Londres: InvestigacionLondresData,
    };
    return res.status(200).json(objFinal);
  } catch (err) {
    return res.status(503).send("No fue posible consultar las tablas: ", err);
  }
};

exports.form = async (req, res) => {
  console.log(req);
  return res.status(200).send("Form-Data");
};
