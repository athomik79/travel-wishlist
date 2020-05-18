CREATE DATABASE destinations_db;
USE destinations_db;

CREATE TABLE destinations(
    id INT NOT NULL AUTO_INCREMENT,
    destination_name VARCHAR(50) NOT NULL,
    travelled BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (id)
);