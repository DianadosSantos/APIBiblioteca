const express =require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController')

router.post('/add', UsuarioController.criarUsuario)
router.get('/',UsuarioController.listarUsuario)
router.get('/:id', UsuarioController.mostrarUsuario)
router.post('/atualizar', UsuarioController.atualizarUsuario)
router.post('/remover', UsuarioController.removerUsuario)


module.exports = router