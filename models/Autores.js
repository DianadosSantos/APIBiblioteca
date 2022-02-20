const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const Autor = db.define("Autor", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Autor
