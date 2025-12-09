var database = require("../database/config");

function MonitoramentoInc(idHospital, idSala, idIncubadora) {
    console.log("ACESSEI O MONITORAMENTO MODEL - Parâmetros:", idHospital, idSala, idIncubadora);
    
    var instrucaoSql = `
        SELECT 
            i.id AS incubadora,
            h.Temperatura AS temperatura,
            CASE 
                WHEN h.Temperatura < 36.5 THEN 'Crítico'
                WHEN h.Temperatura BETWEEN 36.5 AND 37.5 THEN 'Ideal'
                WHEN h.Temperatura > 37.5 THEN 'Atenção'
            END AS alerta,
            TIMESTAMPDIFF(MINUTE, h.dataHora, NOW()) AS minutos_desde_ultima_leitura
        FROM incubadora AS i
        JOIN salaNeoNatal sn ON sn.Id = i.fkSalaNeoNatal
        JOIN hospital hp ON hp.Id = sn.fkHospital
        JOIN sensor s ON s.id = i.fkSensor
        JOIN historico h ON h.fkSensor = s.id
        WHERE h.dataHora = (
            SELECT MAX(h2.dataHora)
            FROM historico h2
            WHERE h2.fkSensor = s.id
        )
        AND hp.Id = ${idHospital}
        AND sn.Id = ${idSala}
        AND i.Id = ${idIncubadora}
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    MonitoramentoInc
};