const moment = require("moment");
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");
const ResponsablesModel = require("../combos/responsables");

class OportunidadesMejoraModel extends Model {}

OportunidadesMejoraModel.init(
  {
    Id: {
      type: DataTypes.UUID,
      defaultValue: sequelize.literal("newid()"),
      primaryKey: true,
    },
    Id_Master: { type: DataTypes.UUID, allowNull: false },
    Codigo_Externo: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: true,
    },
    Descripcion: { type: DataTypes.STRING(500), allowNull: true },
    Porcentaje_Mejora: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
      validate: { min: 0, max: 100 },
    },
    Responsable: { type: DataTypes.UUID, allowNull: true },
    Estado: {
      type: DataTypes.STRING(3),
      defaultValue: "ACT",
      allowNull: false,
      validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: {
      type: DataTypes.STRING(50),
      defaultValue: moment().format("YYYY-MM-DD"),
      allowNull: false,
    },
    Fecha_Modificacion: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "SEGPAC_Oportunidades_Mejora",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);
OportunidadesMejoraModel.belongsTo(ResponsablesModel, { foreignKey: "Responsable", as: "Responsable_Join", onDelete: "NO ACTION" });
module.exports = OportunidadesMejoraModel;
