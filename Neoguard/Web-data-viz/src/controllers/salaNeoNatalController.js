var salaNeoNatalModel = require('../models/salaNeoNatalModel');


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var numSala = req.body.numSalaServer 
    var idHospital = req.body.idHospitalServer

    // Faça as validações dos valores
    if (numSala == undefined) {
        res.status(400).send("Seu NumeroSala está undefined!");
    } else if (idHospital == undefined) {
        res.status(400).send("Seu idHospital está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        salaNeoNatalModel.cadastrar(numSala ,idHospital)
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


function buscar (req, res){

    var idHospital = req.params.idHospital;


    salaNeoNatalModel.buscar(idHospital)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    
}

module.exports = {
    cadastrar,
    buscar
};


