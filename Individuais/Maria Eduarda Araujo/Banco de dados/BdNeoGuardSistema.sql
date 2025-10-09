CREATE DATABASE NeoGuardSistema;
USE NeoGuardSistema;

CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    tipo VARCHAR(50) NOT NULL,
    CONSTRAINT chk_tipoUsuario 
        CHECK (tipo IN ('Administrador','Enfermeiro(a)','Técnico(a) de enfermagem'))
);


CREATE TABLE Login (
    IdLogin INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    FkUsuario INT,
		FOREIGN KEY (FkUsuario) 
			REFERENCES Usuario(IdUsuario)
);


CREATE TABLE Incubadora (
    IdIncubadora INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(100)
);


CREATE TABLE Bebe (
    IdBebe INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    sexo CHAR(1),
		CONSTRAINT chk_sexo 
			CHECK (sexo IN ('M','F')),
    peso DECIMAL(4,1),
    dataNascimento DATE,
    FkIncubadora INT,
		FOREIGN KEY (FkIncubadora) 
		REFERENCES Incubadora(IdIncubadora)
);


CREATE TABLE Sensor (
    IdSensor INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,1),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FkIncubadora INT,
		FOREIGN KEY (FkIncubadora) 
			REFERENCES Incubadora(IdIncubadora)
);


CREATE TABLE HistoricoSensor (
    IdHistorico INT PRIMARY KEY AUTO_INCREMENT,
    temperaturaAnterior DECIMAL(4,1),
    novaTemperatura DECIMAL(4,1),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FkSensor INT,
		FOREIGN KEY (FkSensor) 
			REFERENCES Sensor(IdSensor)
);




INSERT INTO Usuario (email, tipo) VALUES
	('admin@neoguard.com', 'Administrador'),
	('enfermeira@neoguard.com', 'Enfermeiro(a)'),
	('tecnico@neoguard.com', 'Técnico(a) de enfermagem');

INSERT INTO Login (email, senha, FkUsuario) VALUES
	('admin@neoguard.com', 'senha123', 1),
	('enfermeira@neoguard.com', 'senha456', 2),
	('tecnico@neoguard.com', 'senha789', 3);

INSERT INTO Incubadora (numero) VALUES
	('101'), 
	('102'), 
	('103');


INSERT INTO Bebe (nome, sexo, peso, dataNascimento, FkIncubadora) VALUES
	('Lucas Silva', 'M', 3.2, '2025-09-01', 1),
	('Maria Souza', 'F', 2.8, '2025-09-02', 2),
	('Ana Pereira', 'F', 3.0, '2025-09-03', 3);



INSERT INTO Sensor (temperatura, FkIncubadora) VALUES
	(36.8, 1),
	(37.1, 2),
	(36.9, 3);


INSERT INTO HistoricoSensor (temperaturaAnterior, novaTemperatura, FkSensor) VALUES
	(36.8, 37.0, 1),
	(37.1, 37.2, 2),
	(36.9, 37.1, 3);


-- 1. Listar todos os usuários
SELECT IdUsuario, email, tipo FROM Usuario;

-- 2. Listar logins
SELECT L.IdLogin, L.email, L.senha, U.tipo AS Tipo_Usuario FROM Login L
	JOIN Usuario U 
		ON L.FkUsuario = U.IdUsuario;

-- 3. Listar incubadoras e os bebês que estão nelas
SELECT 
    I.numero AS Incubadora, 
    B.nome AS Bebe, 
    B.sexo, 
    B.peso, 
    B.dataNascimento
FROM Incubadora I
LEFT JOIN Bebe B ON I.IdIncubadora = B.FkIncubadora
ORDER BY I.numero;

-- 4. Listar sensores e suas últimas temperaturas
SELECT 
    I.numero AS Incubadora, 
    S.temperatura, 
    S.dataHora
FROM Sensor S
JOIN Incubadora I ON S.FkIncubadora = I.IdIncubadora
ORDER BY I.numero;

-- 5. Listar histórico de alterações de temperatura
SELECT 
    I.numero AS Incubadora, 
    S.IdSensor, 
    H.temperaturaAnterior, 
    H.novaTemperatura, 
    H.dataHora
FROM HistoricoSensor H
JOIN Sensor S ON H.FkSensor = S.IdSensor
JOIN Incubadora I ON S.FkIncubadora = I.IdIncubadora
ORDER BY H.dataHora DESC;

-- 6. Dashboard completo
SELECT 
    I.numero AS Incubadora,
    B.nome AS Bebe,
    B.sexo,
    B.peso,
    S.temperatura AS Temp_Atual,
    H.temperaturaAnterior,
    H.novaTemperatura,
    H.dataHora AS Data_Historico
FROM Incubadora I
LEFT JOIN Bebe B ON I.IdIncubadora = B.FkIncubadora
LEFT JOIN Sensor S ON I.IdIncubadora = S.FkIncubadora
LEFT JOIN HistoricoSensor H ON S.IdSensor = H.FkSensor
ORDER BY I.numero, B.nome, H.dataHora DESC;
