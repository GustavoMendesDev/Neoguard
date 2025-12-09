DROP DATABASE NeoGuard;

CREATE DATABASE NeoGuard;

USE NeoGuard;

CREATE TABLE hospital (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NomeFantasia VARCHAR(99) NOT NULL,
    Cnpj CHAR(14) NOT NULL
);

CREATE TABLE tipo (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    TipoUsuario VARCHAR(40) NOT NULL,
    Nivel CHAR(1) NOT NULL
);

INSERT INTO tipo (TipoUsuario, Nivel) VALUES 
    ('root', '0'),
    ('gestor', '1'),
    ('Enfermeiro', '2'),
    ('tec. Enfermagem', '3');

CREATE TABLE usuario (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(99) NOT NULL,
    Sobrenome VARCHAR(99),
    Email VARCHAR(80) NOT NULL,
    Senha VARCHAR(50) NOT NULL,
    fkTipo INT,
    fkHospital INT,
    CONSTRAINT tipoUsuario FOREIGN KEY (fkTipo) REFERENCES tipo (Id),
    CONSTRAINT hospitalUsuario FOREIGN KEY (fkHospital) REFERENCES hospital (Id)
);

CREATE TABLE salaNeoNatal (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NumeroSala CHAR(1) NOT NULL,
    fkHospital INT,
    CONSTRAINT salaHospital FOREIGN KEY (fkHospital) REFERENCES hospital (Id)
);

CREATE TABLE sensor ( 
    Id INT PRIMARY KEY AUTO_INCREMENT 
);

CREATE TABLE incubadora (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    fkSalaNeoNatal INT,
    fkSensor INT,
    CONSTRAINT incubadoraSala FOREIGN KEY (FkSalaNeoNatal) REFERENCES salaNeoNatal (Id),
    CONSTRAINT sensorIncubadora FOREIGN KEY (fkSensor) REFERENCES sensor (Id)
);

CREATE TABLE bebe (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PeriodoGestacao CHAR(2) NOT NULL,
    FkIncubadora INT,
    CONSTRAINT bebeIncubadora FOREIGN KEY (FkIncubadora) REFERENCES incubadora (Id)
);

CREATE TABLE historico (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Temperatura DECIMAL(3, 1) NOT NULL,
    dataHora DATETIME NOT NULL,
    Alerta VARCHAR(45),
    fkSensor INT,
    CONSTRAINT historicoSensor FOREIGN KEY (fkSensor) REFERENCES sensor (Id)
);

INSERT INTO
    usuario (
        Nome,
        Sobrenome,
        Email,
        Senha,
        fkTipo,
        fkHospital
    )
VALUES (
        'Antonio',
        'Panasonic',
        'gestor.santamarcelina@neoguard.com',
        '123456',
        1,
        1
    );

INSERT INTO
    hospital (NomeFantasia, Cnpj)
VALUES (
        'Santa Marcelina',
        '00000000000000'
    );

INSERT INTO salaNeoNatal (NumeroSala, fkHospital) VALUES ('1', 1);

INSERT INTO sensor (id) VALUES (1), (2), (3), (4), (5);

INSERT INTO
    incubadora (fkSalaNeoNatal, fksensor)
VALUES (1, 1),
    (1, 2),
    (1, 3);

INSERT INTO bebe (PeriodoGestacao, FkIncubadora) VALUES ('28', 2);