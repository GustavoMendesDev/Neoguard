var historicoModel = require('../models/historicoModel');

function cadastrar(req, res) {

    var temp = req.body.tempServer;
    var alerta = req.body.alertaServer;
    var idSensor = req.body.idSensorServer;

    if (temp == undefined) return res.status(400).send("Temperatura undefined");
    if (alerta == undefined) return res.status(400).send("Alerta undefined");
    if (idSensor == undefined) return res.status(400).send("ID Sensor undefined");

    historicoModel.cadastrar(temp, alerta, idSensor)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro cadastro:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function contagem(req, res) {

    const idHospital = req.params.idHospital;
    const idSala = req.params.idSala;
    const idIncubadora = req.params.idIncubadora;

    if (!idHospital || !idSala || !idIncubadora)
        return res.status(400).send("Parâmetros inválidos");

    historicoModel.contagem(idHospital, idSala, idIncubadora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro contagem:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    contagem
};
