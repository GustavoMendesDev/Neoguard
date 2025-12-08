var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");


router.post("/cadastrar", function (req, res) {
    historicoController.cadastrar(req, res);
});


router.get("/contagem/:idHospital/:idSala/:idIncubadora", function (req, res) {
    historicoController.contagem(req, res);
});



module.exports = router;