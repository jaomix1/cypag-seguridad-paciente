const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class NovedadCausaModel extends Model {}

NovedadCausaModel.init(
  {
    Id: { type: DataTypes.INTEGER, primaryKey: true },
    Descripcion: { type: DataTypes.STRING(100), allowNull: false },
    Estado: { type: DataTypes.STRING(3), allowNull: false },
    Id_Tipo_Novedad: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: "SEGPAC_Novedad_Causas",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = NovedadCausaModel;
