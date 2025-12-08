var express = require("express");
var router = express.Router();

var musicaController = require("../controllers/musicaController");

// router.get("/ultimas", function (req, res) {
//     musicaController.buscarUltimasMedidas(req, res);
// });


router.get("/buscarMusicas", function (req, res) {
    musicaController.buscarMusicas(req, res);
})

module.exports = router;