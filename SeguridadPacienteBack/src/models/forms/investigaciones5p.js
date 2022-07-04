const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");

class InvestigacionesP5Model extends Model {}

InvestigacionesP5Model.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Id_Detalle: { type: DataTypes.UUID, allowNull: false },
    InvAtraves: { type: DataTypes.STRING(255), allowNull: true },
    P5_1: { type: DataTypes.STRING(255), allowNull: true },
    P5_2: { type: DataTypes.STRING(255), allowNull: true },
    P5_3: { type: DataTypes.STRING(255), allowNull: true },
    P5_4: { type: DataTypes.STRING(255), allowNull: true },
    P5_5: { type: DataTypes.STRING(255), allowNull: true },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
  },
  {
    sequelize,
    tableName: "SEGPAC_Investigaciones_5p",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

module.exports = InvestigacionesP5Model;
