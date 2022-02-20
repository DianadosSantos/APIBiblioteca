const Usuario = require ("../models/Usuarios")

module.exports = class UsuarioController {
    static async criarUsuario(req, res){
        const usuario={
            nome: req.body.nome,
            email: req.body.email,
            status: false            
        } 
        await Usuario.create(usuario)
        if(!usuario){
            res.status().json({message: 'usuario invalido'})
            return
        }
        res.status(201).json({message: `usuario - ${usuario.nome}` })
    }

    static async listarUsuario(req, res){
        const usuario = await Usuario.findAll({raw: true})
        if (!usuario){
            res.status(402).json({message: 'lista-usuarios-nulo'})
            return
        }
        res.status(202).json(usuario)
    }

    static async mostrarUsuario(req, res) {
        const id = req.params.id

        const usuario = await Usuario.findOne({where: {id: id}})

        if(!usuario){
            res.status(406).json({message: 'parametro-usuario-ausente'})
            return
        }
        res.status(200).json(usuario)
    }
    
    static async atualizarUsuario(req, res){
        const id = req.body.id
        const usuario = {
            nome: req.body.nome,
            email: req.body.email,
            status: req.body.status
        }

        await Usuario.update(usuario, {where: {id:id}})

        if(!usuario){
            res.status(402).json({message: 'parametro-usuario-ausente'})
            return
        }

        res.status(201).json({message: `usuario-${id}-alterado`})
    }

    static async removerUsuario(req, res){
        const id = req.body.id

        if(!id){
            res.status(402).json({message: 'parametro-usuario-id-nulo'})
            return
        }

        await Usuario.destroy({where: {id: id}})

        res.status(202).json({message: `usuario-#${id}-removido`})
    }
}