const { DataTypes } = require ("sequelize")
const db = require ("../db/conn")
const Autor = require('./Autores');
const Usuario = require('./Usuarios');

const Livro = db.define ("Livro",{
    titulo: {
        type: DataTypes.STRING,
        allowNull:false
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: false
    },
    paginas:{
        type: DataTypes.INTEGER, //NUMBER
        allowNull:false
    },
    autor:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

Usuario.hasMany(Livro);
Autor.hasMany(Livro);

Livro.belongsTo(Usuario);
Livro.belongsTo(Autor);


module.exports = Livro