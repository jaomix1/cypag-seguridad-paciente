const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../config/db");
const TiposNovedadModel = require("../combos/tiposNovedad");
const EmpresasModel = require("../combos/empresas");
const SedesModel = require("../combos/sedes");
const TiposIdModel = require("../combos/tiposId");
const ServiciosModel = require("../combos/servicios");

class MasterModel extends Model {}

MasterModel.init(
  {
    Id: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), primaryKey: true },
    Fecha_Incidente: {
      type: DataTypes.STRING(50),
      allowNull: false,
      // get() {
      //   return new Date(this.getDataValue("Fecha_Incidente"));
      // },
    },
    Hora_Incidente: { type: DataTypes.STRING(50), allowNull: false },
    Nombre_Quien_Reporta: { type: DataTypes.STRING(80), allowNull: true },
    Cargo_Quien_Reporta: { type: DataTypes.STRING(40), allowNull: true },
    Empresa: { type: DataTypes.INTEGER, allowNull: false },
    Sede: { type: DataTypes.INTEGER, allowNull: false },
    Servicio_Id: { type: DataTypes.INTEGER, allowNull: false },
    Nombre_Paciente: { type: DataTypes.STRING(80), allowNull: true },
    Tipo_Id: { type: DataTypes.INTEGER, allowNull: true },
    Numero_Id: { type: DataTypes.INTEGER, allowNull: true },
    Sexo: { type: DataTypes.STRING(1), allowNull: true },
    Edad: { type: DataTypes.INTEGER, allowNull: true },
    Tipo_Novedad: { type: DataTypes.INTEGER, allowNull: false },
    Preg_Que: { type: DataTypes.STRING(500), allowNull: false },
    Preg_Como: { type: DataTypes.STRING(500), allowNull: false },
    Preg_Hay_Testigos: { type: DataTypes.BOOLEAN, allowNull: false },
    Preg_Quien: { type: DataTypes.STRING(500), allowNull: false },
    Preg_En_Atencion: { type: DataTypes.BOOLEAN, allowNull: false },
    Preg_Involuntario: { type: DataTypes.BOOLEAN, allowNull: false },
    Preg_Genero_Dano: { type: DataTypes.BOOLEAN, allowNull: false },
    Preg_Dano_Generado: { type: DataTypes.STRING(500), allowNull: false },
    Preg_Dano_Severidad: { type: DataTypes.STRING(20), allowNull: false },
    Accion_Tomada: { type: DataTypes.STRING(500), allowNull: true },
    Imagen_Evidencia: { type: DataTypes.UUID, defaultValue: sequelize.literal("newid()"), allowNull: true },
    Id_Detalle: { type: DataTypes.UUID, defaultValue: null, allowNull: true },
    Id_Investigacion: { type: DataTypes.UUID, defaultValue: null, allowNull: true },
    Estado_Proceso: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
    Estado: {
      type: DataTypes.STRING(3), defaultValue: "ACT", allowNull: false, validate: { isIn: [["ACT", "INA"]] },
    },
    Fecha_Creacion: { type: DataTypes.DATE, defaultValue: sequelize.literal("getdate()"), allowNull: false },
    Fecha_Modificacion: { type: DataTypes.DATE, defaultValue: null, allowNull: true },
  },
  {
    sequelize,
    tableName: "SEGPAC_Master",
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  },
);

MasterModel.belongsTo(TiposNovedadModel, { foreignKey: "Tipo_Novedad", as: "Tipo_Novedad_Join", onDelete: "NO ACTION" });
MasterModel.belongsTo(EmpresasModel, { foreignKey: "Empresa", as: "Empresa_Join", onDelete: "NO ACTION" });
MasterModel.belongsTo(SedesModel, { foreignKey: "Sede", as: "Sede_Join", onDelete: "NO ACTION" });
MasterModel.belongsTo(TiposIdModel, { foreignKey: "Tipo_Id", as: "Tipo_Id_Join", onDelete: "NO ACTION" });
MasterModel.belongsTo(ServiciosModel, { foreignKey: "Servicio_Id", as: "Servicio_Id_Join", onDelete: "NO ACTION" });

module.exports = MasterModel;
