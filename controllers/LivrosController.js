const Livro = require("../models/Livros")
const Autor = require("../models/Autores")
const Usuario = require("../models/Usuarios")

module.exports = class LivrosController {
    static async criarLivro(req, res) {
        const AutorId = req.body.AutorId

        if (!AutorId) {
            res.status(401).json({ message: 'AutorId-nulo' })
            return
        }

        const autor = await Autor.findOne({ where: { id: AutorId } })

        if (!autor) {
            res.status(401).json({ message: `autor-${AutorId}-inexistente` })
            return
        }

        const livro = {
            titulo: req.body.titulo,
            genero: req.body.genero,
            paginas: req.body.paginas,
            autor: autor.nome,
            AutorId,
            status: true,
            UsuarioId: undefined
        }

        await Livro.create(livro)

        if (!livro) {
            res.status(402).json({ message: 'livro-invalido' })
            return
        }

        res.status(201).json({ message: `livro-criado-${livro.titulo}` })
    }

    static async listarLivro(req, res) {
        const livros = await Livro.findAll({ raw: true })

        if (!livros) {
            res.status(402).json({ message: 'lista-livros-nulo' })
            return
        }

        res.status(202).json(livros)
    }

    static async mostrarLivro(req, res) {
        const id = req.params.id
        const livro = await Livro.findOne({ where: { id: id } })

        if (!livro) {
            res.status(406).json({ message: `livro-#${id}-inexistente` })
            return
        }

        res.status(202).json(livro)
    }

    static async atualizarLivro(req, res) {
        const id = req.params.id
        const livro = {
            titulo: req.body.titulo,
            genero: req.body.genero,
            paginas: req.body.paginas,
            autor: autor.nome,
            AutorId,
            status: true,
            UsuarioId: undefined
        }

        await Livro.update(livro, { where: { id: id } })

        if (!livro) {
            res.status(402).json({ message: 'parametro-livro-ausente' })
            return
        }

        res.status(202).json({ message: `livro-#${id}-atualizado` })
    }

    static async removerLivro(req, res){
        const id = req.body.id

        if(!id){
            res.status(402).json({message: 'parametro-livro-id-nulo'})
            return
        }

        await Livro.destroy({where: {id: id}})

        res.status(202).json({message: `livro-#${id}-removido`})
    }

    static async emprestarLivro(req, res) {
        const id = req.params.id;
        const UsuarioId = req.body.UsuarioId;

        const usuario = await Usuario.findOne({ where: { id: UsuarioId } });

        if (!usuario) {
            res.status(406).json({ message: "usuario-inexistente" });
            return;
        }

        const livro = {
            UsuarioId: UsuarioId,
            status: true,
        };

        await Livro.update(livro, { where: { id: id, status: false } });

        if (!livro) {
            res.status(402).json({ message: "livro-nulo" });
            return;
        }

        res.status(200).json({ message: `livro-#${id}-adicionado-ao-usuario-#${UsuarioId}` });
    }
}