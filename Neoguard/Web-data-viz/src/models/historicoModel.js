var database = require("../database/config");

function cadastrar(temp,  alerta, fkSensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAlertas():", temp, alerta, fkSensor);


    var instrucaoSql = `
     INSERT INTO historico (Temperatura, dataHora, Alerta, fkSensor)
        VALUES ('${temp}', NOW(), '${alerta}', ${fkSensor});    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contagem( sala) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAlertas():", sala);

    const instrucaoSql = `
      SELECT 
            SUM(alerta = 'Ideal') AS ideal,
            SUM(alerta = 'Critico') AS critico,
            SUM(alerta = 'Atenção') AS atencao
        FROM historico h
        JOIN sensor s ON s.id = h.fkSensor
        JOIN incubadora i ON i.fkSensor = s.id
        JOIN salaNeoNatal sn ON sn.id = i.fkSalaNeoNatal
        WHERE sn.id = ${idSala}
        AND i.id = ${idIncubadora};
    `;
    return database.executar(instrucaoSql);
}



module.exports = {
    cadastrar,
    contagem
};
