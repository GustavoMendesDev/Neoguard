CREATE DATABASE NeoguardClientes;
USE NeoguardClientes;
DROP DATABASE NeoguardClientes;

CREATE TABLE Usuario (
IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
Nome VARCHAR (99) NOT NULL,
Sobrenome VARCHAR(99) NOT NULL,
Email VARCHAR (80) NOT NULL UNIQUE,
Senha VARCHAR (50) NOT NULL,
FkTipo INT,
FkHospital INT NOT NULL
);

CREATE TABLE Tipo (
IdTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
TipoUsuario VARCHAR (40) NOT NULL,
Nivel CHAR (1) NOT NULL,
CONSTRAINT NIVELAMENTO CHECK (Nivel in('1','2','3')),
CONSTRAINT TIPOUSER CHECK (TipoUsuario in('Enfermeira','Medico','Enfermeira'))
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

CREATE TABLE Bebes (
IdBebes INT PRIMARY KEY AUTO_INCREMENT,
PeriodoGestacao CHAR(2),
FkInternacao INT,
FkIncubadora INT UNIQUE
);

CREATE TABLE Incubadora (
IdIncubadora INT PRIMARY KEY AUTO_INCREMENT,
FkSalaNeoNatal INT NOT NULL,
FkSensores INT UNIQUE,
FkBebes INT UNIQUE 
);

CREATE TABLE Sensores (
IdSensores INT PRIMARY KEY AUTO_INCREMENT,
FkIncubadora INT UNIQUE
);

ALTER TABLE Incubadora ADD
CONSTRAINT FkSensoresRv
FOREIGN KEY (FkSensores)
REFERENCES Sensores(IdSensores);

ALTER TABLE Incubadora ADD
CONSTRAINT FkBebesRv
FOREIGN KEY (FkBebes)
REFERENCES Bebes(IdBebes);

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

CREATE TABLE Alertas (
IdAlertas INT PRIMARY KEY AUTO_INCREMENT,
TipoAlerta VARCHAR(19) NOT NULL,
FkHistorico INT,
CONSTRAINT TipoAlert CHECK (TipoAlerta in('Ideal','Critico','Atenção'))
);

ALTER TABLE Alertas ADD
CONSTRAINT FkHistoricoReserva
FOREIGN KEY (FkHistorico)
REFERENCES Historicos(IdHistoricos);

CREATE TABLE SalaNeoNatal (
IdSalaNeoNatal INT PRIMARY KEY AUTO_INCREMENT,
NumeroSala CHAR(1) NOT NULL,
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
