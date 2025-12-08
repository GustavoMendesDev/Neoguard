var express = require("express");
var router = express.Router();

var monitoramentoController = require("../controllers/monitoramentoController");


router.get("/buscar", function (req, res) {
    monitoramentoController.MonitoramentoInc(req, res);
});


module.exports = router;