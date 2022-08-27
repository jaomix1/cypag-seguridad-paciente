const ServiciosModel = require("../../models/combos/servicios");

exports.obtenerServicios = async (req, res) => {
  try {
    const data = await ServiciosModel.findAll({
      where: { Estado: "ACT" },
      attributes: ["Id", "Descripcion"],
      order: [["Descripcion", "ASC"]],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
