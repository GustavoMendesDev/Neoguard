CREATE DATABASE NeoGuard;
USE NeoGuard;
DROP DATABASE NeoGuard;

CREATE TABLE Usuario (
IdRegistro INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (99) NOT NULL,
Email VARCHAR (80) NOT NULL,
Senha VARCHAR (50) NOT NULL,
Cnpj VARCHAR (14) NOT NULL
);

CREATE TABLE Tipo (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
TipoUsuario VARCHAR (40),
DescUsuario VARCHAR (255),
FkUsuario INT 
);

CREATE TABLE Hospital (
IdHospital INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (99) NOT NULL,
Cnpj VARCHAR (14) NOT NULL
);

ALTER TABLE Registro ADD
CONSTRAINT FkUsuarioReserva
FOREIGN KEY (FkUsuario)
REFERENCES Usuario(IdUsuario);

CREATE TABLE Bebês (
IdBebês INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR(100) NOT NULL,
DataNascimento DATE NOT NULL,
Sexo CHAR(1) NOT NULL,
PesoNascimento DECIMAL(4,1) NOT NULL,
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
TipoIncubadora VARCHAR (30),
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
NumeroSala CHAR(1),
QuantIncubadora CHAR (2),
FkIncubadora INT
); 

ALTER TABLE Incubadora ADD
CONSTRAINT FkSalaNeoNatalReserva
FOREIGN KEY (FkSalaNeoNatal)
REFERENCES SalaNeoNatal(IdSalaNeoNatal);


select * from Historicos;

truncate Historicos;

