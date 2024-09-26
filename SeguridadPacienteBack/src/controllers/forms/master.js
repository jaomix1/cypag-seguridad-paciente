/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const moment = require("moment");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const { Op } = require("sequelize");
const sql = require("mssql");
const dotenv = require("dotenv");
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
const ResponsablesModel = require("../../models/combos/responsables");
const NovedadCausaModel = require("../../models/combos/novedadCausa");

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

// #### FORMULARIO MASTER ####
exports.createEntry = async (req, res) => {
  const entry = { ...req.body };
  if (entry.Imagen_Archivo) {
    delete entry.Imagen_Evidencia;
  }
  entry.Codigo = moment().format("YYYYMMDDHHmmss");
  try {
    const data = await MasterModel.create(entry);
    return res.status(200).json(data);
  } catch (err) {
    // Implementar Error Responses
    return res.status(503).send(`No fue posible guardar el registro: ${err.message}`);
  }
  // next();
};

exports.GetAllMasterRequiereOportunidad = async (req, res) => {
  const { Start_Date, End_Date } = req.body;
  const Start_Date_F = Start_Date ? Start_Date.split("T")[0] : null;
  const End_Date_F = End_Date ? End_Date.split("T")[0] : null;
  // const Codigo = req.body.Codigo !== "" ? req.body.Codigo : null;
  // const Numero_Id = req.body.Numero_Id !== "" ? req.body.Numero_Id : null;
  // const Tipo_Novedad = req.body.Tipo_Novedad !== "" ? req.body.Tipo_Novedad : null;
  // const Empresa = req.body.Empresa !== "" ? req.body.Empresa : null;
  // const Sede = req.body.Sede !== "" ? req.body.Sede : null;
  try {
    const pool = await sql.connect(config);
    // Stored procedure
    const result2 = await pool.request()
      //.input("Codigo", sql.VarChar, Codigo)
      //.input("Numero_Id", sql.Int, Numero_Id)
      //.input("Tipo_Novedad", sql.Int, Tipo_Novedad)
      //.input("Empresa", sql.Int, Empresa)
      //.input("Sede", sql.Int, Sede)
      .input("Start_Date_F", sql.Date, Start_Date_F)
      .input("End_Date_F", sql.Date, End_Date_F)
      .input("Page", sql.Int, req.body.Page)
      .input("RowsByPag", sql.Int, req.body.RowsByPag)
      .execute("SeguridadPaciente.dbo.SP_GetAllMasterRequiereOportunidad");
    // eslint-disable-next-line max-len
    res.status(200).send({ count: result2.recordsets[0][0].Count, data: result2.recordsets[1] });
  } catch (err) {
    res.status(400).send(`${err} ${req.body}`);
  }
};

exports.getAnswers2 = async (req, res) => {
  const { Start_Date, End_Date } = req.body;
  const Start_Date_F = Start_Date ? Start_Date.split("T")[0] : null;
  const End_Date_F = End_Date ? End_Date.split("T")[0] : null;
  const Codigo = req.body.Codigo !== "" ? req.body.Codigo : null;
  const Numero_Id = req.body.Numero_Id !== "" ? req.body.Numero_Id : null;
  const Tipo_Novedad = req.body.Tipo_Novedad !== "" ? req.body.Tipo_Novedad : null;
  const Empresa = req.body.Empresa !== "" ? req.body.Empresa : null;
  const Sede = req.body.Sede !== "" ? req.body.Sede : null;
  try {
    const pool = await sql.connect(config);
    // Stored procedure
    const result2 = await pool.request()
      .input("Codigo", sql.VarChar, Codigo)
      .input("Numero_Id", sql.Int, Numero_Id)
      .input("Tipo_Novedad", sql.Int, Tipo_Novedad)
      .input("Empresa", sql.Int, Empresa)
      .input("Sede", sql.Int, Sede)
      .input("Start_Date_F", sql.Date, Start_Date_F)
      .input("End_Date_F", sql.Date, End_Date_F)
      .execute("SeguridadPaciente.dbo.getAllMaster");
    // eslint-disable-next-line max-len
    res.status(200).send(result2.recordsets[0]);
  } catch (err) {
    res.status(400).send(`${err} ${req.body}`);
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
        attributes: ["Descripcion"],
      }, {
        model: SedesModel,
        as: "Sede_Join",
        where: { Estado: "ACT" },
        attributes: ["Descripcion"],
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
      }, {
        model: NovedadCausaModel,
        as: "Novedad_Id_Join",
        required: false,
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
        },
        {
          model: NovedadCausaModel,
          as: "Novedad_Causa_Join",
          where: { Estado: "ACT" },
          attributes: ["Descripcion"],
        }],
        raw: true,
        nest: true,
      });

      opcionesMejora = await OportunidadesMejoraModel.findAll({
        where: { Id_Master, Estado: "ACT" },
        raw: true,
        nest: true,
        include: [{
          model: ResponsablesModel,
          as: "Responsable_Join",
          where: { Estado: { [Op.or]: ["ACT", "INA"] } },
          attributes: ["NombreCompleto"],
        }],
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

exports.fileUpload = async (req, res) => {
  const guid = req.params.IdMaster;
  try {
    const form = new formidable.IncomingForm();
    const carpeta = path.join(process.cwd(), "src", "uploads", guid);
    await fs.rmSync(carpeta, { recursive: true, force: true });
    await fs.mkdir(carpeta, { recursive: true }, (error) => {
      if (error) {
        return console.error(error);
      }
      return console.log("Directory created successfully!");
    });
    await form.parse(req)
      .on("fileBegin", (name, file) => {
        file.filepath = `${carpeta}/${file.originalFilename}`;
      })
      .on("file", (name, file) => {
        console.log("Uploaded file");
      });

    return res.status(200).send("Ok");
  } catch (err) {
    return res.status(503).send("No fue posible guardar la imagen: ", err);
  }
};

exports.fileUploadSeguimiento = async (req, res) => {
  const seguimientoId = req.params.seguimientoId;
  try {
    const form = new formidable.IncomingForm();
    const carpeta = path.join(process.cwd(), "src", "uploads", "_accion", seguimientoId);
    await fs.rmSync(carpeta, { recursive: true, force: true });
    await fs.mkdir(carpeta, { recursive: true }, (error) => {
      if (error) {
        return console.error(error);
      }
      return console.log("Directory created successfully!");
    });
    await form.parse(req)
      .on("fileBegin", (name, file) => {
        file.filepath = `${carpeta}/${file.originalFilename}`;
      })
      .on("file", (name, file) => {
        console.log("Uploaded file");
      });

    return res.status(200).send("Ok");
  } catch (err) {
    return res.status(503).send("No fue posible guardar la imagen: ", err);
  }
};

exports.fileDownload = async (req, res) => {
  try {
    const guid = req.params.IdMaster;
    const carpeta = path.join(process.cwd(), "src", "uploads", guid);
    const uploadDir = fs.readdirSync(carpeta);
    if (uploadDir.length > 0) {
      const zip = new AdmZip();
      uploadDir.forEach((file) => {
        if (file !== "segpac-files.zip") {
          zip.addLocalFile(path.join(carpeta, file));
        }
      });
      const data = zip.toBuffer();
      zip.writeZip(path.join(carpeta, "segpac-files.zip"));
    }
    const fileExists = fs.existsSync(carpeta);
    if (fileExists) {
      return res.status(200).download(path.join(carpeta, "segpac-files.zip"));
    }
    return res.status(503).send("El registro de archivos para esta investigacion no existe");
  } catch (error) {
    return res.status(503).send("Hubo un error en la busqueda: ", error);
  }
};

exports.fileDownloadSeguimiento = async (req, res) => {
  try {
    const seguimientoId = req.params.seguimientoId;
    const carpeta = path.join(process.cwd(), "src", "uploads", "_accion", seguimientoId);
    const uploadDir = fs.readdirSync(carpeta);
    if (uploadDir.length > 0) {
      const zip = new AdmZip();
      uploadDir.forEach((file) => {
        if (file !== "segpac-files.zip") {
          zip.addLocalFile(path.join(carpeta, file));
        }
      });
      const data = zip.toBuffer();
      zip.writeZip(path.join(carpeta, "segpac-files.zip"));
    }
    const fileExists = fs.existsSync(carpeta);
    if (fileExists) {
      return res.status(200).download(path.join(carpeta, "segpac-files.zip"));
    }
    return res.status(503).send("El registro de archivos para esta investigacion no existe");
  } catch (error) {
    return res.status(503).send("Hubo un error en la busqueda: ", error);
  }
};
