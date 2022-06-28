const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

const {
  getAnswers,
  createEntry,
  datedQuery,
  getSurvey,
  updateSurvey,
} = require("../../controllers/forms/formPrincipal");

router.route("/")
  .post(seguridad, createEntry);

router.route("/dated-query")
  .post(seguridad, datedQuery);

router.route("/registros")
  .post(seguridad, getAnswers);

router.route("/ultima-encuesta")
  .post(seguridad, getSurvey);

router.route("/actualizar-registro")
  .put(seguridad, updateSurvey);
module.exports = router;
