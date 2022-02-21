const Autor = require("../models/Autores");
const Livro = require("../models/Livros");

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

  static async mostrarAutor(req, res) {
    const id = req.params.id;
    const autor = await Autor.findOne({ where: { id: id } });

    if (!autor) {
      res.status(406).json({ message: "parametro-autor-ausente" });
      return;
    }
    res.status(200).json(autor);
  }

  static async atualizarAutor(req, res) {
    const id = req.body.id;

    const autor = {
      nome: req.body.nome,
      descricao: req.body.descricao,
    };

    await Autor.update(autor, { where: { id: id } });

    if (!autor) {
      res.status(402).json({ message: "parametro-autor-ausente" });
      return;
    }

    res.status(201).json({ message: `autor-${id}-alterado` });
  }

  static async removerAutor(req, res) {
    const id = req.body.id;

    if (!id) {
      res.status(402).json({ message: "parametro-autor-id-nulo" });
      return;
    }
    await Autor.destroy({ where: { id: id } });
    res.status(202).json({ message: `usuario-#${id}-removido` });
  }

  static async listaLivros(req, res) {
    const id = req.params.id;

    const autor = await Autor.findOne({ where: { id: id } });

    if (!autor) {
      res.status(406).json({ message: "param_autor_null" });
      return;
    }

    const livros = await Livro.findAll({ where: { AutorId: id } });

    console.log("\nFoi");
    res.status(200).json(livros);
  }
};
