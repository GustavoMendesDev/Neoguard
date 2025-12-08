var express = require("express");
var rota = express.Router();
var userController = require ('../controllers/userController');

rota.get('/MusicaTop/:idUser', (req, res) => {
  userController.MusicaTop(req, res);
});

rota.get('/ArtistaTop/:idUser', (req, res) => {
  userController.ArtistaTop(req, res);
});

rota.get('/UserDiario/:idUser', (req, res) => {
  userController.UserDiario(req, res);
});

module.exports = rota;