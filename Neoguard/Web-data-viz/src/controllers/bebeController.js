var bebeModel = require('../models/bebeModel');





function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var periodoGestacao = req.body.periodoGestacaoServer;
    var idIncubadora = req.body.idIncubadoraServer;


    // Faça as validações dos valores
    if (periodoGestacao == undefined) {
        res.status(400).send("Seu periodoGestacao está undefined!");
    } else if (idIncubadora == undefined) {
        res.status(400).send("Seu idIncubadora está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        bebeModel.cadastrar(periodoGestacao, idIncubadora)
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