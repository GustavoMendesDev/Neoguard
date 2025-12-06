var database = require("../database/config");



function cadastrar(periodoGestacao, idIncubadora) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",periodoGestacao, idIncubadora);
    
  
    var instrucaoSql = `
        INSERT INTO bebe (PeriodoGestacao, FkIncubadora) VALUES ('${periodoGestacao}', '${idIncubadora}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar
};
