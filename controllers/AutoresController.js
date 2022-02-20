const Autor = require("../models/Autores");

module.exports = class AutoresController {
  static async criarAutor(req, res) {
    const autor = {
      nome: req.body.nome,
      descricao: req.body.descricao,
    };

    await Autor.create(autor);

    if (!autor) {
      res.status(402).json({ message: "autor_invalido" });
      return;
    }

    res.status(201).json({ message: `autor_${autor.nome}_criado` });
  }

  static async listarAutor(req, res) {
    const autor = await Autor.findAll();

    if (!autor) {
      res.status(402).json({ message: "lista-autores-nulo" });
      return;
    }

    res.status(202).json(autor);
  }
};
