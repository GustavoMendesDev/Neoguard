var database = require("../database/config")

function Artistatotal() {
    var instrucaoSql = `
SELECT 
usuario.nome AS User,
musica.artista AS Artista,
COUNT(diario.idDiario) AS Quantidade
FROM diario
JOIN musica ON diario.fkMusic = musica.idMusic AND musica.artista IS NOT NULL
JOIN usuario ON diario.fkuser = usuario.idUser
GROUP BY usuario.nome, musica.artista
ORDER BY Quantidade DESC
LIMIT 5;`;
    console.log("Executando a instrução do SQL: \n " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function Musicatotal() {
    var instrucaoSql = `
SELECT 
usuario.nome AS User,
musica.nome AS Musica,
COUNT(diario.idDiario) AS Quantidade
FROM diario
JOIN musica ON diario.fkMusic = musica.idMusic AND musica.nome IS NOT NULL
JOIN usuario ON diario.fkuser = usuario.idUser
GROUP BY usuario.nome, musica.nome
ORDER BY Quantidade DESC
LIMIT 5;`;
    console.log("Executando a instrução do SQL: \n " + instrucaoSql);
    return database.executar(instrucaoSql);
}

function MusicaNumero() {
    var instrucaoSql = `
SELECT 
    m.nome AS musica,
    COUNT(*) AS qtd_vezes,
    ROUND(
        (COUNT(*) * 100.0) / 
        (SELECT COUNT(*) FROM diario WHERE fkmusic IS NOT NULL),
        2
    ) AS porcentagem
FROM diario d
JOIN musica m ON d.fkmusic = m.idMusic
WHERE m.nome != '' AND m.nome IS NOT NULL
GROUP BY m.nome
ORDER BY qtd_vezes DESC
LIMIT 1;
`;
    console.log("Executando a instrução do SQL: \n " + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    Artistatotal,
    Musicatotal,
    MusicaNumero

}