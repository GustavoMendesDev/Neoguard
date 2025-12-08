var express = require("express");
var rota = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
rota.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

rota.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = rota;