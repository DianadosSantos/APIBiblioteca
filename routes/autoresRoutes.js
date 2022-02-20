const express = require("express");
const router = express.Router();

const AutorController = require("../controllers/AutoresController");

router.post("/add", AutorController.criarAutor);

router.get("/", AutorController.listarAutor);

module.exports = router;
