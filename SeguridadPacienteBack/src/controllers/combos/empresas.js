const EmpresasModel = require("../../models/combos/empresas");

exports.obtenerEmpresas = async (req, res) => {
  try {
    const data = await EmpresasModel.findAll({
      where: { Estado: "ACT" },
      attributes: ["Id", "Nombre"],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
