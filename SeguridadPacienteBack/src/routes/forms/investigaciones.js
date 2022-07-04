const express = require("express");

const router = express.Router();

// const { seguridad } = require("../../../config/db");

const {
  createInvM5,
  createInvP5,
  createInvNaranjo,
  createInvLondres,
  getInvM5,
  getInvP5,
  getInvNaranjo,
  getInvLondres,
  deleteInvM5,
  deleteInvP5,
  deleteInvNaranjo,
  deleteInvLondres,
} = require("../../controllers/forms/investigaciones");

router.route("/5m")
  .post(createInvM5);

router.route("/5m/registros")
  .post(getInvM5);

router.route("/5m/borrar")
  .post(deleteInvM5);

router.route("/5p")
  .post(createInvP5);

router.route("/5p/registros")
  .post(getInvP5);

router.route("/5p/borrar")
  .post(deleteInvP5);

router.route("/naranjo")
  .post(createInvNaranjo);

router.route("/naranjo/registros")
  .post(getInvNaranjo);

router.route("/naranjo/borrar")
  .post(deleteInvNaranjo);

router.route("/londres")
  .post(createInvLondres);

router.route("/londres/registros")
  .post(getInvLondres);

router.route("/londres/borrar")
  .post(deleteInvLondres);

module.exports = router;
