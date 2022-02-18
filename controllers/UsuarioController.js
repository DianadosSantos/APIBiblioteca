const Usuario = require ("../models/Usuarios")

module.exports = class UsuarioController {
    static async createUsuario(req, res){
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
    static async mostrarUsuario(req, res){
        const usuario = await Usuario.findAll({raw: true})
        if (!usuario){
            res.status(402).json({message: 'lista-usuarios-nulo'})
            return
        }
        res.status(202).json(usuario)
    }
    
}