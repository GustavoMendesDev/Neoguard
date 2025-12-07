var sensorModel = require('../models/sensorModel');




function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
var idSensor = req.body.idSensorServer



    // Faça as validações dos valores
    if (idSensor == undefined) {
        res.status(400).send("Seu NumeroSala está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        sensorModel.cadastrar(idSensor)
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