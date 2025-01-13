const ClasificacionReporteModel = require("../../models/combos/clasificacionReporte");

exports.obtenerClasificacionReporte = async (req, res) => {
  try {
    const data = await ClasificacionReporteModel.findAll({
      where: { Estado: "ACT" },
      attributes: ["Id", "Descripcion"],
      order: [["Descripcion", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
