const moment = require("moment")
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
            UsuarioId: undefined, 
            dataEmprestimo: undefined, 
            atrasado: undefined
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
            id: req.body.id,
            titulo: req.body.titulo,
            genero: req.body.genero,
            paginas: req.body.paginas,
            autor: autor.nome,
            AutorId,
            status: true,
        }

        await Livro.update(livro, { where: { id: livro.id } })

        if (!livro) {
            res.status(402).json({ message: 'parametro-livro-ausente' })
            return
        }

        res.status(202).json({ message: `livro-#${livro.id}-atualizado` })
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
        const UsuarioId = req.body.UsuarioId;
        const dataEmprestimo = req.body.dataEmprestimo

        const usuario = await Usuario.findOne({ where: { id: UsuarioId } });

        if (!usuario) {
            res.status(406).json({ message: "usuario-inexistente" });
            return;
        }

        const dataAtual = moment()
        const vencimento = moment(dataEmprestimo).add(30, 'days')
        const atrasado = moment(dataAtual).isAfter(vencimento)

        const livro = {
            id: req.body.id,
            UsuarioId: UsuarioId,
            status: false,
            dataEmprestimo: dataEmprestimo,
            atrasado: atrasado
        };

        await Livro.update(livro, { where: { id: livro.id, status: true } });

        if (!livro) {
            res.status(402).json({ message: "livro-nulo" });
            return;
        }

        res.status(200).json({ message: `livro-#${livro.id}-adicionado-ao-usuario-#${UsuarioId}` });
    }

    static async livrosPendentes(req, res){
        const livrosAtrasados = await Livro.findAll({where: {atrasado: true}, raw: true})

        if(!livrosAtrasados){
            res.status(402).json({message: 'livros-pendentes-nulo'})
            return
        }

        res.status(202).json({livrosAtrasados})
    }
}