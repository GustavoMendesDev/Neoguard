var historicoModel = require('../models/historicoModel');


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var temp = req.body.tempServer
    var alerta = req.body.alertaServer
    var idSensor = req.body.idSensorServer


    // Faça as validações dos valores
    if (alerta == undefined) {
        res.status(400).send("Seu periodoGestacao está undefined!");
    } else if (idIncubadora == undefined) {
        res.status(400).send("Seu idIncubadora está undefined!");
    }else if (temp == undefined) {
            res.status(400).send("Seu temperatura está undefined!");
        } else {

            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            historicoModel.cadastrar(temp, alerta, idSensor)
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


function contagem(req, res) {
    const idHospital = req.params.idHospital;
    const idSala = req.params.idSala;
    const idIncubadora = req.params.idIncubadora;

    historicoModel.contagem(idHospital, idSala, idIncubadora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ao buscar contagem:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}





    module.exports = {
        cadastrar,
        contagem
    };