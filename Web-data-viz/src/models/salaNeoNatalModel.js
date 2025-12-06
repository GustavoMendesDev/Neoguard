var database = require("../database/config");


function cadastrar(numSala, idHospital) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSala():", numSala, idHospital);
    
  
    var instrucaoSql = `
        INSERT INTO salaNeoNatal (NumeroSala, fkHospital) VALUES ('${numSala}', ${idHospital});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
