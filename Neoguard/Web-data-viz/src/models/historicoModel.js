var database = require("../database/config");

function cadastrar(temp, alerta, fkSensor) {

    var instrucaoSql = `
        INSERT INTO historico (Temperatura, dataHora, Alerta, fkSensor)
        VALUES ('${temp}', NOW(), '${alerta}', ${fkSensor});
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

function contagem(idHospital, idSala, idIncubadora) {

    const instrucaoSql = `
        SELECT 
            SUM(alerta = 'Ideal') AS ideal,
            SUM(alerta = 'Critico') AS critico,
            SUM(alerta = 'Atencao') AS atencao
        FROM historico h
        JOIN sensor s ON s.id = h.fkSensor
        JOIN incubadora i ON i.fkSensor = s.id
        JOIN salaNeoNatal sn ON sn.id = i.fkSalaNeoNatal
        WHERE sn.id = ${idSala}
        AND i.id = ${idIncubadora}
        AND s.fkHospital = ${idHospital};
    `;

    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    contagem
};
