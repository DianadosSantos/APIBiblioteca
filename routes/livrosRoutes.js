const express = require('express');
const router = express.Router();

const LivrosController = require('../controllers/LivrosController');

router.post('/add', LivrosController.criarLivro)
router.get('/', LivrosController.listarLivro)
router.get('/:id', LivrosController.mostrarLivro)
router.post('/atualizar', LivrosController.atualizarLivro)
router.post('/remover', LivrosController.removerLivro)
router.post('/emprestar', LivrosController.emprestarLivro)


module.exports = router