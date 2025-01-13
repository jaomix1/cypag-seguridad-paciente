const ResponsablesModel = require("../../models/combos/responsables");

exports.obtenerResponsables = async (req, res) => {
  try {
    const data = await ResponsablesModel.findAll({
      where: { Estado: "ACT" },
      attributes: ["Id", "NombreCompleto"],
      order: [["NombreCompleto", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
