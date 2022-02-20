const express = require("express");
const router = express.Router();

const AutorController = require("../controllers/AutoresController");

router.post("/add", AutorController.criarAutor);

router.get("/", AutorController.listarAutor);

router.get('/:id', AutorController.mostrarAutor)

router.post('/atualizar', AutorController.atualizarAutor)

router.post('/remover', AutorController.removerAutor)

module.exports = router;
