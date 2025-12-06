var incubadoraModel = require('../models/incubadoraModel');



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idSala = req.body.idSalaServer
    var idSensor = req.body.idSensorServer




    // Faça as validações dos valores
    if (idSensor == undefined) {
        res.status(400).send("Seu sensor está undefined!");
    } else if (idSala == undefined) {
        res.status(400).send('Seu idSala esta undefined')
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        incubadoraModel.cadastrar(idSala, idSensor)
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