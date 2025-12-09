var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");


router.post("/cadastrar", function (req, res) {
    historicoController.cadastrar(req, res);
});


router.get("/contagem/:idSala", function (req, res) {
    historicoController.contagem(req, res);
}); 

router.get("/ultimaTemperatura/:idSensor", function (req, res) {
    historicoController.ultimaTemperatura(req, res);
}); 

router.get("/log/:idSala", function (req, res) {
    historicoController.logHistorico(req, res);
}); 





module.exports = router;