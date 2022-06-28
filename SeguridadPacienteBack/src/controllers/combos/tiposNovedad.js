const TiposNovedadModel = require("../../models/combos/tiposNovedad");

exports.obtenerTiposNovedad = async (req, res) => {
  try {
    const data = await TiposNovedadModel.findAll({
      where: { Estado: "ACT" },
      attributes: ["Id", "Descripcion"],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(503).send("Error Procesando la Consulta");
  }
};
