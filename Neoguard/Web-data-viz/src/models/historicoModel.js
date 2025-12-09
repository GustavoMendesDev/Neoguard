var database = require("../database/config");

function cadastrar(temp, alerta, fkSensor) {

    var instrucaoSql = `
    INSERT INTO historico (Temperatura ,Alerta, fkSensor)
        VALUES (${temp},'${alerta}', ${fkSensor});
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contagem(idSala) {

    const instrucaoSql = `
        SELECT 
                COUNT(h.id) AS qtd_alerta,
                h.alerta AS alerta
        FROM historico h
        JOIN sensor s ON s.id = h.fkSensor
        JOIN incubadora i ON i.fkSensor = s.id
        JOIN salaNeoNatal sn ON sn.id = i.fkSalaNeoNatal
        WHERE sn.id = ${idSala}
        AND h.dataHora >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
        GROUP BY alerta;
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}
function logHistorico(idSala) {

    var instrucaoSql = `
    SELECT 
		h.alerta AS alerta,
        h.Temperatura AS temperatura,
        i.id AS incubadora,
        DATE_FORMAT(dataHora, '%d/%m/%Y %H:%i:%s') AS data_formatada
        FROM historico AS  h
        JOIN sensor AS s
        ON h.fkSensor = s.id
        JOIN incubadora AS i
        ON i.fkSensor = s.id
        WHERE h.alerta NOT IN ('Ideal') AND 
        i.fkSalaNeoNatal = ${idSala}
        ORDER BY h.dataHora DESC LIMIT 5;
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function ultimaTemperatura(idSensor) {

    const instrucaoSql = `
        SELECT Temperatura, fkSensor, alerta , TIMESTAMPDIFF(SECOND, dataHora, NOW()) AS segundos_atras
         FROM historico WHERE fkSensor = ${idSensor} ORDER BY dataHora DESC  LIMIT 1;
            
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    contagem,
    ultimaTemperatura,
    logHistorico
};
