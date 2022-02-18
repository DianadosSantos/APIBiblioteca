const express = require('express');
const app = express();
const conn = require('./db/conn');
const porta = process.env.PORT || 3000

const Usuario = require('./models/Usuarios')
const usuarioRoutes = require('./routes/usuarioRoutes')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/usuarios', usuarioRoutes)

conn
.sync()
//.sync({force: true})
.then(() =>{
    app.listen(porta)
})
.catch((err) => console.log(err))