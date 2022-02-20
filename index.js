const express = require("express");
const app = express();
const conn = require("./db/conn");
const porta = process.env.PORT || 3000;

//Usuarios
const Usuario = require("./models/Usuarios");
const usuarioRoutes = require("./routes/usuarioRoutes");

//Autores
const Autor = require("./models/Autores");
const autorRoutes = require("./routes/autoresRoutes");

//Livros
const Livro = require("./models/Livros");
const livrosRoutes  = require("./routes/livrosRoutes");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/usuarios", usuarioRoutes);
app.use("/autores", autorRoutes);
app.use("/livros", livrosRoutes);

conn
.sync()
 //.sync({force: true})
.then(() => {
    app.listen(porta);
})
.catch((err) => console.log(err));
