CREATE DATABASE NeoGuardEquipe;
USE NeoGuardEquipe;

-- ENDEREÇO (cada cliente tem um endereço)
CREATE TABLE Endereco (
    IdEndereco INT PRIMARY KEY AUTO_INCREMENT,
    estado CHAR(2),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    rua VARCHAR(100),
    numeroEndereco VARCHAR(100),
    cep CHAR(9)
);

-- CLIENTE (hospital que contratou a NeoGuard)
CREATE TABLE Cliente (
    IdCliente INT PRIMARY KEY AUTO_INCREMENT,
    nomeHospital VARCHAR(100) NOT NULL,
    cnpj VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    FkEndereco INT,
		FOREIGN KEY (FkEndereco) 
			REFERENCES Endereco(IdEndereco)
);

-- TELEFONES do cliente 
CREATE TABLE Telefone (
    IdTelefone INT PRIMARY KEY AUTO_INCREMENT,
    numero VARCHAR(20) NOT NULL,
    tipo VARCHAR(20),
    CONSTRAINT chk_tipoTelefone CHECK (tipo IN ('Comercial')),
    FkCliente INT,
		FOREIGN KEY (FkCliente) 
			REFERENCES Cliente(IdCliente)
);

-- USUÁRIOS administradores ou técnicos do hospital
CREATE TABLE UsuarioHospital (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100),
    cargo VARCHAR(30),
    CONSTRAINT chk_cargo 
        CHECK (cargo IN ('Administrador','Coordenador','Técnico','Enfermeiro(a)','Técnico(a) de Enfermagem')),
    FkCliente INT,
    FOREIGN KEY (FkCliente) 
        REFERENCES Cliente(IdCliente)
);


-- INCUBADORAS instaladas nos hospitais
CREATE TABLE Incubadora (
    IdIncubadora INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50),
    tipoIncubadora VARCHAR(30),
    CONSTRAINT chk_tipoIncubadora
        CHECK (tipoIncubadora IN ('Simples','Avançada','Especial')),
    faixaTemperaturaMin DECIMAL(4,1),
    faixaTemperaturaMax DECIMAL(4,1),
    custo DECIMAL(10,2),
    status VARCHAR(20),
    CONSTRAINT chk_status 
        CHECK (status IN ('Ativa','Em manutenção','Inativa')),
    FkCliente INT,
    FOREIGN KEY (FkCliente) 
        REFERENCES Cliente(IdCliente)
);


-- SENSORES conectados às incubadoras
CREATE TABLE Sensor (
    IdSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipoSensor VARCHAR(20),
		CONSTRAINT chk_tipoSensor 
			CHECK (tipoSensor IN ('Temperatura')),
    FkIncubadora INT,
		FOREIGN KEY (FkIncubadora)
			REFERENCES Incubadora(IdIncubadora)
);

-- HISTÓRICO das leituras de sensores
CREATE TABLE HistoricoSensor (
    IdHistorico INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,1),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
	FkSensor INT,
		FOREIGN KEY (FkSensor) 
			REFERENCES Sensor(IdSensor)
);

-- ALERTAS automáticos
CREATE TABLE Alerta (
    IdAlerta INT PRIMARY KEY AUTO_INCREMENT,
    nivel VARCHAR(10),
		CONSTRAINT chk_nivel 
			CHECK (nivel IN ('Crítico','Aviso')),
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FkIncubadora INT,
		FOREIGN KEY (FkIncubadora) 
			REFERENCES Incubadora(IdIncubadora)
);

-- ENDEREÇOS
INSERT INTO Endereco (estado, cidade, bairro, rua, numeroEndereco, cep) VALUES
('SP', 'São Paulo', 'Centro', 'Rua das Flores', '123', '01000-000'),
('MG', 'Belo Horizonte', 'Savassi', 'Av. Brasil', '456', '30140-110');

-- CLIENTES (Hospitais)
INSERT INTO Cliente (nomeHospital, cnpj, email, FkEndereco)
VALUES
('Hospital São Lucas', '12345678000199', 'contato@saolucas.com', 1),
('Hospital Esperança', '11223344000166', 'info@esperanca.com', 2);

-- TELEFONES
INSERT INTO Telefone (numero, tipo, FkCliente)
VALUES
('11999998888', 'Comercial', 1),
('31944445555', 'Comercial', 2);

-- USUÁRIOS DO HOSPITAL
INSERT INTO UsuarioHospital (nome, email, senha, cargo, FkCliente)
VALUES
('Marina Costa', 'marina@saolucas.com', 'senha123', 'Administrador', 1),
('João Almeida', 'joao@esperanca.com', 'senha321', 'Coordenador', 2),
('Beatriz Souza', 'beatriz@saolucas.com', 'senha987', 'Enfermeiro(a)', 1),
('Paulo Santos', 'paulo@esperanca.com', 'senha654', 'Técnico(a) de Enfermagem', 2);

-- INCUBADORAS
INSERT INTO Incubadora (modelo, tipoIncubadora, faixaTemperaturaMin, faixaTemperaturaMax, custo, status, FkCliente)
VALUES
('NeoGuard X1', 'Simples', 36.5, 37.5, 33630.00, 'Ativa', 1),
('NeoGuard Pro 2', 'Avançada', 37.0, 37.5, 50000.00, 'Ativa', 2),
('NeoGuard Extreme', 'Especial', 37.0, 37.5, 60000.00, 'Em manutenção', 1);

-- SENSORES
INSERT INTO Sensor (tipoSensor, FkIncubadora)
VALUES
('Temperatura', 1),
('Temperatura', 2),
('Temperatura', 3);

-- HISTÓRICO DE LEITURAS
INSERT INTO HistoricoSensor (FkSensor, temperatura)
VALUES
(1, 36.8),
(1, 37.2),
(2, 36.5),
(3, 35.9);


-- Mostra informações dos hospitais, incluindo endereço e telefone
SELECT 
    C.IdCliente AS ID_Hospital,
    C.nomeHospital AS Nome_Hospital,
    C.cnpj AS CNPJ,
    E.estado,
    E.cidade,
    E.bairro,
    E.rua,
    E.numeroEndereco AS Numero,
    E.cep,
    T.numero AS Telefone
FROM Cliente C
JOIN Endereco E ON C.FkEndereco = E.IdEndereco
LEFT JOIN Telefone T ON C.IdCliente = T.FkCliente;

-- Lista as incubadoras de cada hospital, com modelo, tipo, faixa de temperatura, custo e status
SELECT 
    C.nomeHospital AS Hospital,
    I.modelo AS Modelo,
    I.tipoIncubadora AS Tipo,
    I.faixaTemperaturaMin AS Faixa_Min,
    I.faixaTemperaturaMax AS Faixa_Max,
    I.custo AS Custo,
    I.status AS Status
FROM Incubadora I
JOIN Cliente C ON I.FkCliente = C.IdCliente
ORDER BY C.nomeHospital;

-- Mostra o histórico de leituras de temperatura de cada sensor nas incubadoras
SELECT 
    C.nomeHospital AS Hospital,
    I.modelo AS Incubadora,
    S.tipoSensor AS Sensor,
    H.temperatura AS Temperatura,
    H.dataHora AS Data_Hora
FROM Cliente C
JOIN Incubadora I ON C.IdCliente = I.FkCliente
JOIN Sensor S ON I.IdIncubadora = S.FkIncubadora
JOIN HistoricoSensor H ON S.IdSensor = H.FkSensor
ORDER BY H.dataHora DESC;

-- Lista todas as incubadoras com sensores e leituras, mesmo que não haja leitura ou alerta registrada
SELECT 
    C.nomeHospital AS Hospital,
    I.modelo AS Incubadora,
    I.tipoIncubadora AS Tipo,
    S.tipoSensor AS Sensor,
    H.temperatura AS Temperatura,
    H.dataHora AS Data_Leitura
FROM Cliente C
JOIN Incubadora I ON C.IdCliente = I.FkCliente
LEFT JOIN Sensor S ON I.IdIncubadora = S.FkIncubadora
LEFT JOIN HistoricoSensor H ON S.IdSensor = H.FkSensor
LEFT JOIN Alerta A ON I.IdIncubadora = A.FkIncubadora
ORDER BY C.nomeHospital, I.modelo;








