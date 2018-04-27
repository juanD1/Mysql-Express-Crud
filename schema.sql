DROP DATABASE IF EXISTS indentation_war;

CREATE DATABASE indentation_war;

USE indentation_war;

CREATE TABLE team(
	id CHAR(5) PRIMARY KEY,
	name CHAR(10) NOT NULL,
	-- twitter VARCHAR(50) NOT NULL,
	-- country VARCHAR(20) NOT NULL,
	-- side VARCHAR(10) NOT NULL
);


/*
INSERT INTO team (campo1, campo2) VALUES (valor1, valor2);
INSERT INTO team SET campo1 = valor1, campo2 = valor2;
*/