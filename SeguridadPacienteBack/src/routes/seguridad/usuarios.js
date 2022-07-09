const express = require("express");
// const { seguridad } = require("../../middleware/seguridad");
const {
  registrarUsuario,
  obtenerPerfiles,
  login,
  getAllUsers,
  inactiveUser,
} = require("../../controllers/seguridad/seguridad");

const router = express.Router();

// Route: /V1/usuarios
router.get("/", getAllUsers);
router.post("/registrar", registrarUsuario);
router.post("/login", login);
router.put("/desactivar", inactiveUser);
router.get("/perfiles", obtenerPerfiles);

module.exports = router;
