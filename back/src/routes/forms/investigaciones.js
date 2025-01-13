const express = require("express");

const router = express.Router();

const { seguridad } = require("../../middleware/seguridad");

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
  .post(seguridad, createInvM5);

router.route("/5m/registros")
  .post(seguridad, getInvM5);

router.route("/5m/borrar")
  .post(seguridad, deleteInvM5);

router.route("/5p")
  .post(seguridad, createInvP5);

router.route("/5p/registros")
  .post(seguridad, getInvP5);

router.route("/5p/borrar")
  .post(seguridad, deleteInvP5);

router.route("/naranjo")
  .post(seguridad, createInvNaranjo);

router.route("/naranjo/registros")
  .post(seguridad, getInvNaranjo);

router.route("/naranjo/borrar")
  .post(seguridad, deleteInvNaranjo);

router.route("/londres")
  .post(seguridad, createInvLondres);

router.route("/londres/registros")
  .post(seguridad, getInvLondres);

router.route("/londres/borrar")
  .post(seguridad, deleteInvLondres);

module.exports = router;
