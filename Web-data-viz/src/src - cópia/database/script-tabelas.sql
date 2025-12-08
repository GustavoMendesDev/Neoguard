-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
CREATE DATABASE LuscoFusco ;

USE LuscoFusco;

DROP DATABASE LuscoFusco;

CREATE TABLE usuario (
idUser INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(59),
email VARCHAR(59),
senha VARCHAR(59)
);

CREATE TABLE musica (
idMusic INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(59),
link VARCHAR(255),
artista VARCHAR(59)
);

CREATE TABLE diario (
idDiario INT PRIMARY KEY AUTO_INCREMENT,
relato VARCHAR(999),
dataD DATETIME DEFAULT CURRENT_TIMESTAMP(),
imagem VARCHAR(255),
idUser INT,
idMusic INT,
CONSTRAINT fk_usuario FOREIGN KEY (idUser)
REFERENCES usuario(idUser),
CONSTRAINT fk_musica FOREIGN KEY (idMusic)
REFERENCES musica(idMusic)
);