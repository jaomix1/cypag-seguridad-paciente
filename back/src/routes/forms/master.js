const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
  GetAllMasterRequiereOportunidad,
  getAnswers2,
  createEntry,
  getAllData,
  fileUpload,
  fileUploadSeguimiento,
  fileDownload,
  fileDownloadSeguimiento,
} = require("../../controllers/forms/master");

const {
  createMejora,
  getMejoras,
  getMejora,
  updateMejora,
} = require("../../controllers/forms/mejoras");

router.route("/")
  .post(createEntry);

router.route("/det-inv")
  .post(seguridad, getAllData);

router.route("/registrosRequierePlanAccion")
  .post(seguridad, GetAllMasterRequiereOportunidad);

router.route("/registrosV2")
  .post(seguridad, getAnswers2);

router.route("/mejoras")
  .post(seguridad, createMejora);

router.route("/mejoras/registros")
  .post(seguridad, getMejoras);

router.route("/mejoras/one")
  .post(seguridad, getMejora);

router.route("/mejoras/actualizar")
  .post(seguridad, updateMejora);

router.route("/fileupload/:IdMaster")
  .post(fileUpload);

router.route("/fileUploadSeguimiento/:seguimientoId")
  .post(fileUploadSeguimiento);

router.route("/filedownload/:IdMaster")
  .get(fileDownload);

router.route("/filedownloadSeguimiento/:seguimientoId")
  .get(fileDownloadSeguimiento);

module.exports = router;
