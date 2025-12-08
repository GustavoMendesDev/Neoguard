var database = require("../database/config");




function cadastrar(idSala, idSensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarincubadora():", idSala, idSensor);
    
  
    var instrucaoSql = `
        INSERT INTO incubadora (FkSalaNeoNatal, fkSensor) VALUES (${idSala}, ${idSensor});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscar (idSala){
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarincubadora():", idSala);


    var instrucaoSql = `
    SELECT
	i.id AS idIncubadora,
    i.fkSensor AS idSensor
	FROM salaNeoNatal AS s
    JOIN hospital AS h
    ON s.fkHospital = h.id
    JOIN incubadora AS i
    ON i.fkSalaNeoNatal = s.id
    WHERE s.id =  ${idSala};
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    buscar
};
