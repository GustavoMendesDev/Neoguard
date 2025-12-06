var express = require("express");
var router = express.Router();

var salaNeoNatalController = require("../controllers/salaNeoNatalController");


router.post("/cadastrar", function (req, res) {
    salaNeoNatalController.cadastrar(req, res);
});

module.exports = router;