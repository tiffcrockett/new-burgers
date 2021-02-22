
CREATE DATABASE newburger_db;
USE newburger_db;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	newburger_name varchar(100) NOT NULL,
	wholeburger BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
