var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");


router.post("/cadastrar", function (req, res) {
    historicoController.cadastrar(req, res);
});


router.get("/buscar", function (req, res) {
    historicoController.monitoramentoInc(req, res);
});



module.exports = router;