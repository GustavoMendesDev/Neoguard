var historicoModel = require('../models/historicoModel');


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
   var temp = req.body.tempServer
   var dataHora = req.body.dataHoraServer
   var alerta = req.body.alertaServer
   var idSensor = req.body.idSensorServer


    // Faça as validações dos valores
    if (periodoGestacao == undefined) {
        res.status(400).send("Seu periodoGestacao está undefined!");
    } else if (idIncubadora == undefined) {
        res.status(400).send("Seu idIncubadora está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        historicoModel.cadastrar(temp, dataHora, alerta, idSensor)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
    cadastrar
};