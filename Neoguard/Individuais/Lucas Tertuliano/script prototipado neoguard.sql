
CREATE DATABASE hospital;
USE hospital;

CREATE TABLE dashboard (
    idDashboard INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE sensores (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    identificacao VARCHAR(45),
    fkDashboard INT,
    FOREIGN KEY (fkDashboard) REFERENCES dashboard(idDashboard)
);

CREATE TABLE enfermeiras (
    idEnfermeira INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    turno VARCHAR(15),
    fkDashboard INT,
    FOREIGN KEY (fkDashboard) REFERENCES dashboard(idDashboard)
);

CREATE TABLE tecnico_enfermagem (
    idTecnico INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45),
    sobrenome VARCHAR(45),
    turno VARCHAR(15),
    fkDashboard INT,
    FOREIGN KEY (fkDashboard) REFERENCES dashboard(idDashboard)
);

CREATE TABLE incubadoras (
    idIncubadora INT PRIMARY KEY AUTO_INCREMENT,
    identificacao VARCHAR(45),
    status VARCHAR(15),
    fkSensor INT,
    fkEnfermeira INT,
    FOREIGN KEY (fkSensor) REFERENCES sensores(idSensor),
    FOREIGN KEY (fkEnfermeira) REFERENCES enfermeiras(idEnfermeira)
);

CREATE TABLE registroTemperatura (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    fkSensor INT,
    tempRegistrada DECIMAL(4,2),
    dataRegistro DATETIME,
    FOREIGN KEY (fkSensor) REFERENCES sensores(idSensor)
);
INSERT INTO dashboard VALUES (), (), ();

INSERT INTO sensores (identificacao, fkDashboard) VALUES
('Sensor A', 1),
('Sensor B', 1),
('Sensor C', 2);

INSERT INTO enfermeiras (nome, sobrenome, turno, fkDashboard) VALUES
('Mariana', 'Souza', 'Manhã', 1),
('Carla', 'Pereira', 'Tarde', 2),
('Fernanda', 'Oliveira', 'Noite', 3);

INSERT INTO tecnico_enfermagem (nome, sobrenome, turno, fkDashboard) VALUES
('Paulo', 'Lima', 'Manhã', 1),
('Juliana', 'Silva', 'Tarde', 2),
('Rafael', 'Costa', 'Noite', 3);

INSERT INTO incubadoras (identificacao, status, fkSensor, fkEnfermeira) VALUES
('Incubadora 01', 'Ativa', 1, 1),
('Incubadora 02', 'Em manutenção', 2, 2),
('Incubadora 03', 'Ativa', 3, 3);

INSERT INTO registroTemperatura (fkSensor, tempRegistrada, dataRegistro) VALUES
(1, 36.5, '2025-10-10 08:00:00'),
(1, 36.8, '2025-10-10 09:00:00'),
(2, 37.2, '2025-10-10 08:30:00'),
(2, 37.0, '2025-10-10 09:30:00'),
(3, 36.7, '2025-10-10 10:00:00');


SELECT 
    incubadoras.idIncubadora,
    incubadoras.identificacao AS Incubadora,
    incubadoras.status,
    enfermeiras.nome AS Enfermeira,
    enfermeiras.turno
FROM incubadoras
JOIN enfermeiras ON incubadoras.fkEnfermeira = enfermeiras.idEnfermeira;

SELECT 
    registroTemperatura.idRegistro,
    sensores.identificacao AS Sensor,
    registroTemperatura.tempRegistrada,
    registroTemperatura.dataRegistro
FROM registroTemperatura 
JOIN sensores ON registroTemperatura.fkSensor = sensores.idSensor;

SELECT 
    sensores.idSensor,
    sensores.identificacao,
    dashboard.idDashboard
FROM sensores 
JOIN dashboard  ON sensores.fkDashboard = dashboard.idDashboard;

SELECT 
    incubadoras.identificacao AS Incubadora,
    enfermeiras.nome AS Enfermeira,
    sensores.identificacao AS Sensor,
    registroTemperatura.tempRegistrada,
    registroTemperatura.dataRegistro
FROM registroTemperatura 
JOIN sensores ON registroTemperatura.fkSensor = sensores.idSensor
JOIN incubadoras ON incubadoras.fkSensor = sensores.idSensor
JOIN enfermeiras ON incubadoras.fkEnfermeira = enfermeiras.idEnfermeira
ORDER BY registroTemperatura.dataRegistro DESC;

SELECT sensores.idSensor,
 incubadoras.idIncubadora, 
 registroTemperatura.idRegistro
 FROM sensores  JOIN incubadoras
 ON incubadoras.fkSensor = sensores.idSensor 
 JOIN registroTemperatura ON registroTemperatura.fkSensor = Sensores.idSensor;

