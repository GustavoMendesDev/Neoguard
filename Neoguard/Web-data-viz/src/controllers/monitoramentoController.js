var monitoramentoModel = require('../models/monitoramentoModel');

function MonitoramentoInc(req, res) {
    var idSala = req.params.idSala;
    var idHospital = req.params.idHospital;
    var idIncubadora = req.params.idIncubadora;

    if (idHospital == undefined) {
        res.status(400).send("Seu idHospital está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send('Seu idSala está undefined');
    } else if (idIncubadora == undefined) {
        res.status(400).send('Seu idIncubadora está undefined');
    } else {
        monitoramentoModel.MonitoramentoInc(idHospital, idSala, idIncubadora)
            .then(function (resultado) {
                res.json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a busca! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    MonitoramentoInc
};