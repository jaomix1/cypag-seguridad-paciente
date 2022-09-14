const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
  getAnswers,
  createEntry,
  getAllData,
  fileUpload,
  fileDownload,
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

router.route("/registros")
  .post(seguridad, getAnswers);

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

router.route("/filedownload/:IdMaster")
  .get(fileDownload);

module.exports = router;
