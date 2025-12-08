var database = require("../database/config")

function enviarDiario(relato, imagem, link, nome, artista, idUser) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function enviarDiario():", relato, imagem, link, nome, artista, idUser);

  var instrucaoSql = `INSERT INTO musica (link, nome, artista) VALUES ('${link}','${nome}','${artista}');`;


  return database.executar(instrucaoSql)
    .then((resultadoMusica) => {

      var idMusic = resultadoMusica.insertId;

      var valorImagem = imagem ? `${imagem}` : 'NULL';

      var instrucaoSql2 = `INSERT INTO diario (relato, imagem, fkuser, fkmusic) VALUES ('${relato}','${valorImagem}', ${idUser}, ${idMusic});`;

      console.log("Executando a instrução SQL: \n" + instrucaoSql + instrucaoSql2);

      return database.executar(instrucaoSql2);
    });
}

function buscarImagemPeloDiario(idDiario) {
  
  var instrucaoSql = `select imagem from diario where idDiario = ${idDiario};`

  return database.executar(instrucaoSql);
}
module.exports = {
  enviarDiario,
  buscarImagemPeloDiario
}