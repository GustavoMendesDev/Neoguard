var express = require("express");
var path = require('path');
var rota = express.Router();

rota.get("/", function (req, res) {
    res.render("index");
});

module.exports = rota;