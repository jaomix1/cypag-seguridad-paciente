/* eslint-disable indent */
const express = require("express");

const router = express.Router();

const { seguridad } = require("../../../middleware/seguridad");

const {
    createPlanAccion,
    getAllPlanAccion,
    getPlanAccion,
    getAllPlanesAccionByMasterId,
    createMasterPlanAccion,
    getAllQuejasAsociadasByPlanId,
} = require("../../../controllers/forms/oportunidad/planDeAccion");

router.route("/create")
    .post(seguridad, createPlanAccion);

router.route("/getAll")
    .post(seguridad, getAllPlanAccion);

router.route("/getOne/:Id")
    .get(seguridad, getPlanAccion);

router.route("/byMaster/:MasterId")
    .get(seguridad, getAllPlanesAccionByMasterId);

router.route("/QuejasAsociadasByPlanAccionId/:PlanAccionId")
    .get(seguridad, getAllQuejasAsociadasByPlanId);

router.route("/AsignarAPlanAccion/:PlanAccionId")
    .post(seguridad, createMasterPlanAccion);

module.exports = router;
