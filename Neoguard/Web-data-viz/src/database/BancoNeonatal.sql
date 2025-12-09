CREATE DATABASE NeoGuard;
USE NeoGuard;

SELECT * FROM usuario;

SELECT * FROM salaNeoNatal;
SELECT * FROM incubadora;
SELECT * FROM sensor;
SELECT * FROM historico;

SELECT s.id 
	FROM salaNeoNatal AS s
    JOIN hospital AS h
    ON s.fkHospital = h.id
    WHERE h.id =  39;

SELECT
	i.id AS idIncubadora
	FROM salaNeoNatal AS s
    JOIN hospital AS h
    ON s.fkHospital = h.id
    JOIN incubadora AS i
    ON i.fkSalaNeoNatal = s.id
    WHERE s.id =  43
    GROUP BY i.id;
    
    SELECT 
		h.alerta AS alerta,
        h.Temperatura AS temperatura,
        i.id AS incubadora,
        DATE_FORMAT(dataHora, '%d/%m/%Y %H:%i:%s') AS data_formatada
        FROM historico AS  h
        JOIN sensor AS s
        ON h.fkSensor = s.id
        JOIN incubadora AS i
        ON i.fkSensor = s.id
        WHERE h.alerta NOT IN ('Ideal') AND 
        i.fkSalaNeoNatal = 1
        ORDER BY h.dataHora DESC LIMIT 5;
        
    
    SELECT 
    i.id AS incubadora,
    h.Temperatura AS temperatura,
    CASE 
        WHEN h.Temperatura < 36.5 THEN 'Crítico'
        WHEN h.Temperatura BETWEEN 36.5 AND 37.5 THEN 'Ideal'
        WHEN h.Temperatura > 37.5 THEN 'Atenção'
    END AS alerta,
    TIMESTAMPDIFF(MINUTE, h.dataHora, NOW()) AS minutos_desde_ultima_leitura
FROM incubadora AS i
JOIN sensor AS s ON s.id = i.fkSensor
JOIN historico AS h ON h.fkSensor = s.id
WHERE h.dataHora = (
    SELECT MAX(h2.dataHora)
    FROM historico AS h2
    WHERE h2.fkSensor = s.id
);
    
CREATE TABLE hospital (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NomeFantasia VARCHAR(99) NOT NULL,
    Cnpj CHAR(14) NOT NULL
);

INSERT INTO hospital (NomeFantasia, Cnpj) VALUES
('Santa Marcelina','00000000000000');


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
    
    CONSTRAINT tipoUsuario 
       FOREIGN KEY (fkTipo) REFERENCES tipo(Id),
    CONSTRAINT hospitalUsuario 
       FOREIGN KEY (fkHospital) REFERENCES hospital(Id)
);

INSERT INTO usuario (Nome, Sobrenome, Email, Senha, fkTipo, fkHospital) VALUES
('Antonio', 'Panasonic', 'gestor.santamarcelina@neoguard.com', '123456', 1 , 1);


CREATE TABLE salaNeoNatal (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    NumeroSala CHAR(1) NOT NULL,
    fkHospital INT,
    CONSTRAINT salaHospital 
      FOREIGN KEY (fkHospital) REFERENCES hospital(Id)
);
INSERT INTO salaNeoNatal (NumeroSala, fkHospital) VALUES
('1' , 1);

CREATE TABLE sensor (
    Id INT PRIMARY KEY AUTO_INCREMENT
);

INSERT INTO sensor (id) VALUES
(1),
(2),
(3),
(4),
(5);


CREATE TABLE incubadora (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    fkSalaNeoNatal INT,
    fkSensor INT,
    CONSTRAINT incubadoraSala 
       FOREIGN KEY (FkSalaNeoNatal) REFERENCES salaNeoNatal(Id),
    CONSTRAINT sensorIncubadora 
       FOREIGN KEY (fkSensor) REFERENCES sensor(Id)
);
INSERT INTO incubadora (fkSalaNeoNatal, fksensor) VALUES
(1, 1),
(1, 2),
(1 ,3);




CREATE TABLE bebe (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    PeriodoGestacao CHAR(2) NOT NULL,
    FkIncubadora INT,
    CONSTRAINT bebeIncubadora 
       FOREIGN KEY (FkIncubadora) REFERENCES incubadora(Id)
);
INSERT INTO bebe (PeriodoGestacao, FkIncubadora) VALUES
('28', 2);


CREATE TABLE historico (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Temperatura DECIMAL(3,1) NOT NULL,
    dataHora DATETIME DEFAULT NOW(),
    Alerta VARCHAR(45),
    fkSensor INT,
    CONSTRAINT historicoSensor 
      FOREIGN KEY (fkSensor) REFERENCES sensor(Id)
);


