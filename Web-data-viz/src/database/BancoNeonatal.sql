CREATE DATABASE NeoGuard;
USE NeoGuard;

CREATE TABLE Usuario (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (99) NOT NULL,
Email VARCHAR (80) NOT NULL,
Senha VARCHAR (50) NOT NULL,
FkTipo INT,
FkHospital INT
);

ALTER TABLE Usuario ADD COLUMN Sobrenome VARCHAR(99);

CREATE TABLE Tipo (
IdTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
TipoUsuario VARCHAR (40) NOT NULL,
Nivel CHAR (1) NOT NULL 
);

CREATE TABLE Hospital (
IdHospital INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (99) NOT NULL,
Cnpj CHAR (18) NOT NULL
);

ALTER TABLE Usuario ADD
CONSTRAINT FkTipoReserva1
FOREIGN KEY (FkTipo)
REFERENCES Tipo(IdTipoUsuario);

ALTER TABLE Usuario ADD
CONSTRAINT FkHospitalReserva2
FOREIGN KEY (FkHospital)
REFERENCES Hospital(IdHospital);


CREATE TABLE Bebês (
IdBebês INT PRIMARY KEY AUTO_INCREMENT,
PesoNascimento DECIMAL(4,1) NOT NULL,
PeriodoGestacao CHAR(2),
FkInternação INT,
FkIncubadora INT UNIQUE
);

CREATE TABLE Internação (
IdInternação INT PRIMARY KEY AUTO_INCREMENT,
DataEntrada DATE,
DataSaida DATE,
DescSituação VARCHAR (255),
ValorDiaria DECIMAL(6,2),
FkBebe INT
);

ALTER TABLE Bebês ADD
CONSTRAINT FkInternacao
FOREIGN KEY (FkInternação)
REFERENCES Internação(IdInternação);

CREATE TABLE Incubadora (
IdIncubadora INT PRIMARY KEY AUTO_INCREMENT,
NumeroIncubadora INT NOT NULL,
FkSalaNeoNatal INT
);

CREATE TABLE Sensores (
IdSensores INT PRIMARY KEY AUTO_INCREMENT,
FkIncubadora INT UNIQUE
);

ALTER TABLE Sensores ADD
CONSTRAINT FkIncubadoraReserva
FOREIGN KEY (FkIncubadora)
REFERENCES Incubadora(IdIncubadora);

ALTER TABLE Bebês ADD
CONSTRAINT FkIncubadora
FOREIGN KEY (FkIncubadora)
REFERENCES Incubadora(IdIncubadora);


CREATE TABLE Historicos (
IdHistoricos INT PRIMARY KEY AUTO_INCREMENT,
Temperatura DECIMAL (3,1) NOT NULL,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
FkSensores2 INT 
);

ALTER TABLE Historicos ADD
CONSTRAINT FkSensoresHistorico
FOREIGN KEY (FkSensores2)
REFERENCES Sensores(IdSensores);

CREATE TABLE SalaNeoNatal (
IdSalaNeoNatal INT PRIMARY KEY AUTO_INCREMENT,
NumeroSala CHAR(1) NOT NULL,
QuantIncubadora CHAR(2)NOT NULL,
FkIncubadora INT,
FkHospital INT
); 

ALTER TABLE SalaNeoNatal ADD 
CONSTRAINT FkHospital
FOREIGN KEY (FkHospital)
REFERENCES Hospital(IdHospital);

ALTER TABLE Incubadora ADD
CONSTRAINT FkSalaNeoNatalReserva
FOREIGN KEY (FkSalaNeoNatal)
REFERENCES SalaNeoNatal(IdSalaNeoNatal);