var express = require("express");
var rota = express.Router();
var upload = require('../config/configUpload');
var diarioController = require ('../controllers/diarioController');

rota.post('/enviarDiario', upload.single('foto'), (req, res) => {
    diarioController.enviarDiario(req, res);
});

// rota.get('/buscarImagemPeloDiario/:idDiario', upload.single('foto'), (req, res) => {
//   diarioController.buscarImagemPeloDiario(req, res);
//  });

rota.get('/buscarImagemPeloDiario/:idDiario', (req, res) => {
  diarioController.buscarImagemPeloDiario(req, res);
});

module.exports = rota;