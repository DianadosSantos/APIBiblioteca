const express = require('express');
const router = express.Router();

const LivrosController = require('../controllers/LivrosController');

router.post('/add', LivrosController.criarLivro)
router.get('/listar', LivrosController.listarLivro)
router.get('/:id', LivrosController.mostrarLivro)
router.post('/atualizar', LivrosController.atualizarLivro)
router.post('/remover', LivrosController.removerLivro)
router.post('/emprestar', LivrosController.emprestarLivro)
router.get('/listar/pendentes', LivrosController.livrosPendentes)

module.exports = router