var express = require("express");
var rota = express.Router();
var dashController = require ('../controllers/dashController');

rota.get('/Musicatotal/', (req, res) => {
  dashController.Musicatotal(req, res);
});

rota.get('/Artistatotal/', (req, res) => {
  dashController.Artistatotal(req, res);
});

rota.get('/MusicaNumero/', (req, res) => {
  dashController.MusicaNumero(req, res);
});


module.exports = rota;