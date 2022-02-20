const express = require('express');
const router = express.Router();

const LivrosController = require('../controllers/LivrosController');

router.post('/add', LivrosController.criarLivro)

module.exports = router