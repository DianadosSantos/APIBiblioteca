const Livro = require("../models/Livros");

module.exports = class LivrosController{
    static async criarLivro(req,res){
        const livro = {
            titulo: req.body.titulo,
            genero: req.body.genero,
            paginas: req.body.paginas,
            autor: req.body.autor,
            AutorId: req.body.AutorId,
            status: true
        }
        await Livro.create(livro)
        if(!livro){
            res.status(402).json({message: 'livro invalido'})
            return
        }
        res.status(201).json({message:`livro - criado - ${livro.titulo}`})
    }

    static async listarLivro(){

    }
}