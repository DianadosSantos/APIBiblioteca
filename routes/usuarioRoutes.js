const express =require('express')
const router = express.Router()

const UsuarioController = require('../controllers/UsuarioController')

router.post('/add', UsuarioController.createUsuario)
router.get('/',UsuarioController.mostrarUsuario)


module.exports = router