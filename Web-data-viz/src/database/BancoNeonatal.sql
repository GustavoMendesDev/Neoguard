CREATE DATABASE NeoGuard;
USE NeoGuard;

-- HOSPITAL
CREATE TABLE hospital (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NomeFantasia VARCHAR(99) NOT NULL,
    Cnpj CHAR(14) NOT NULL
);

INSERT INTO hospital (NomeFantasia, Cnpj) VALUES
('Santa Marcelina','00000000000000');

-- TIPO
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

-- USUÁRIO
CREATE TABLE usuario (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(99) NOT NULL,
    Sobrenome VARCHAR(99),
    Email VARCHAR(80) NOT NULL,
    Senha VARCHAR(50) NOT NULL,
    fkTipo INT,
    fkHospital INT,
    CONSTRAINT tipoUsuario 
       FOREIGN KEY (fkTipo) REFERENCES tipo(Id),
    CONSTRAINT hospitalUsuario 
       FOREIGN KEY (fkHospital) REFERENCES hospital(Id)
);

INSERT INTO usuario (Nome, Sobrenome, Email, Senha, fkTipo, fkHospital) VALUES
('Antonio', 'Panasonic', 'gestor.santamarcelina@neoguard.com', '123456', 1 , 1);

-- SALA NEONATAL
CREATE TABLE salaneonatal (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NumeroSala CHAR(1) NOT NULL,
    fkHospital INT, 
    CONSTRAINT salaHospital 
      FOREIGN KEY (fkHospital) REFERENCES hospital(Id)
);

-- SENSOR
CREATE TABLE sensor (
    Id INT PRIMARY KEY AUTO_INCREMENT
);

-- INCUBADORA
CREATE TABLE incubadora (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    FkSalaNeoNatal INT,
    fkSensor INT,   
    CONSTRAINT incubadoraSala 
       FOREIGN KEY (FkSalaNeoNatal) REFERENCES salaneonatal(Id),
    CONSTRAINT sensorIncubadora 
       FOREIGN KEY (fkSensor) REFERENCES sensor(Id)
);

-- BEBE
CREATE TABLE bebe (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PeriodoGestacao CHAR(2) NOT NULL,
    FkIncubadora INT,
    CONSTRAINT bebeIncubadora 
       FOREIGN KEY (FkIncubadora) REFERENCES incubadora(Id)
);

-- HISTÓRICO
CREATE TABLE historico (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Temperatura DECIMAL(3,1) NOT NULL,
    dataHora DATETIME NOT NULL,
    Alerta VARCHAR(45),
    fkSensor INT,
    CONSTRAINT historicoSensor 
      FOREIGN KEY (fkSensor) REFERENCES sensor(Id)
);
