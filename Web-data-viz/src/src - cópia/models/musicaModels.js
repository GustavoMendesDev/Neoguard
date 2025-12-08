var database = require("../database/config");

function buscarMusicas() {

    var instrucaoSql = `SELECT
    (SELECT COUNT(*)
     FROM diario d
     JOIN musica m ON d.fkMusic = m.idMusic
     WHERE m.link <> ' '
    ) AS diarios_com_musica,
    (SELECT COUNT(*)
     FROM diario d
     JOIN musica m ON d.fkMusic = m.idMusic
     WHERE m.link = ""
    ) AS diarios_sem_musica;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// function buscarMedidasEmTempoReal(idAquario) {

//     var instrucaoSql = `SELECT 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         FROM medida WHERE fk_aquario = ${idAquario} 
//                     ORDER BY id DESC LIMIT 1`;

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

module.exports = {
    buscarMusicas
}