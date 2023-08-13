CREATE DATABASE frosted_files;
use frosted_files;

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
	PRIMARY KEY (id),
    nombre VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME NOT NULL,
    es_moderador BOOLEAN,
    es_admin BOOLEAN,
    id_roles INT,
    FOREIGN KEY (id_roles) REFERENCES roles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    nombre VARCHAR(255)
);

CREATE TABLE subcategories (
    subcategory_id INT UNIQUE AUTO_INCREMENT,
	nombre VARCHAR(255),
	category_id INT,
    PRIMARY KEY (subcategory_id),
    FOREIGN KEY (id_category) REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE files (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    nombre VARCHAR(255) NOT NULL,
    extension VARCHAR(10),
    tamaño DECIMAL(10, 2),
    fecha_subida DATETIME NOT NULL,
    visibilidad BOOLEAN,
    id_category INT,
    FOREIGN KEY (id_category) REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    id_subcategory INT,
    FOREIGN KEY (id_subcategory) REFERENCES subcategories(subcategory_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE comentarios (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    texto TEXT NOT NULL,
    fecha DATETIME NOT NULL,
    id_files INT,
    FOREIGN KEY (id_files) REFERENCES files(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE multimedia (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    tipo VARCHAR(255) NOT NULL,
    archivo VARCHAR(255) NOT NULL,
    nombre VARCHAR(255),
    fecha DATETIME NOT NULL,
    id_files INT,
    FOREIGN KEY (id_files) REFERENCES files(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE acciones (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    tipo_accion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    id_files INT,
    id_user INT,
    FOREIGN KEY (id_files) REFERENCES files(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (id_user) REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE datos_estadisticos (
    id INT AUTO_INCREMENT,
    PRIMARY KEY (id),
    tipo_accion VARCHAR(255) NOT NULL,
    fecha DATETIME NOT NULL,
    cantidad INT NOT NULL,
    id_acciones INT,
    FOREIGN KEY (id_acciones) REFERENCES acciones(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



/*
DROP TABLE categories;
DROP DATABASE frosted_files;

ALTER TABLE Users
DROP COLUMN rol;

ALTER TABLE Multimedia
MODIFY archivo VARCHAR(255);

RENAME TABLE Roles TO roles;
RENAME TABLE Users TO users;
RENAME TABLE Categories TO categories;
RENAME TABLE Files TO files;
RENAME TABLE Comentarios TO comentarios;
RENAME TABLE Multimedia TO multimedia;
RENAME TABLE Acciones TO acciones;
RENAME TABLE Datos_estadisticos TO datos_estadisticos;

ALTER TABLE users CHANGE COLUMN esModerador es_moderador BOOLEAN;
ALTER TABLE users CHANGE COLUMN esAdmin es_admin BOOLEAN;
*/
