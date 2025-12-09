var historicoModel = require('../models/historicoModel');



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    //    var dataHora = req.body.dataHoraServer
    var temp = req.body.tempServer
   var alerta = req.body.alertaServer
   var idSensor = req.body.idSensorServer


    // Faça as validações dos valores
    if (temp == undefined) {
        res.status(400).send("Seu temp está undefined!");
    } else if (alerta == undefined) {
        res.status(400).send("Seu alerta está undefined!");
    } 
     else if (idSensor == undefined) {
        res.status(400).send("Seu idSensor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        historicoModel.cadastrar(temp,  alerta, idSensor)
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

    const idSala = req.params.idSala;

    if (!idSala)
        return res.status(400).send("Parâmetros inválidos");

    historicoModel.contagem(idSala)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro contagem:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}




function logHistorico (req, res){
    var idSala = req.params.idSala;

        if (!idSala)
        return res.status(400).send("Parâmetros inválidos");

    historicoModel.logHistorico(idSala)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro contagem:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });


}




function ultimaTemperatura(req, res){ 
    const idSensor = req.params.idSensor;


console.log('Recuperando última temperatura')
historicoModel.ultimaTemperatura(idSensor).then(function(resultado){
    if(resultado.length > 0 ){
        res.status(200).json(resultado);

    }else {
        res.status(204).send('Busca de temperatura sem retorno')
    }

}).catch(function(erro){


    console.log(erro)
    console.log('Houve um erro na busca da última temperatura.', erro.sqlMessage)
    res.status(500).json(erro.sqlMessage)
})

}
module.exports = {
    cadastrar,
    contagem,
    ultimaTemperatura,
    logHistorico

};
