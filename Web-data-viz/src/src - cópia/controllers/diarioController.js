var diarioModel = require("../models/diarioModel");

function enviarDiario(req, res) {

  console.log("BACKEND BODY =>", req.body);
  console.log("BACKEND FILE =>", req.file);

  var relato = req.body.relatoServer;
  var link = req.body.LinkServer;
  var nome = req.body.NomeMusicaServer;
  var artista = req.body.ArtistaServer;
  var idUser = req.body.idUserServer;

  var imagem = req.file ? req.file.filename : null;

  if (relato == undefined) {
    res.status(400).send("Seu relato está undefined!");
  } else if (link == undefined) {
    res.status(400).send("Seu link está undefined!");
  } else if (nome == undefined) {
    res.status(400).send("Sua nome está undefined!");
  } else if (artista == undefined) {
    res.status(400).send("Sua artista a vincular está undefined!");
  } else if (idUser == undefined) {
    res.status(400).send("Sua idUser a vincular está undefined!");
  } else {
    diarioModel.enviarDiario(relato, imagem, link, nome, artista, idUser)
    .then(function (resultado) {
      
      res.json({ insertId: resultado.insertId });

    }).catch(function (erro) {

      console.log(erro)
      console.log("Houve um erro ao buscar as ações do diario. ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage)
    });
  }
}

function buscarImagemPeloDiario(req, res) {
  diarioModel.buscarImagemPeloDiario(req.params.idDiario)
    .then(resultado => {
      res.json(resultado);
    }).catch(err => {
      res.status(500).send(err);
    });
}

module.exports = {
  enviarDiario,
  buscarImagemPeloDiario
}