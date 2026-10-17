CREATE DATABASE `pecuaria`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

CREATE TABLE `Fazenda` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `fazenda` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE `Animal` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `sisbov` INT(11) NOT NULL,
    `faixa_etaria` VARCHAR(30) NOT NULL,
    `raca` VARCHAR(50) NOT NULL,
    `id_fazenda` INT(11) NULL,
    `dataEntrega` DATE NOT NULL,
    `horaEntrega` TIME NOT NULL,
    `peso_atual` FLOAT(6,2) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_id_fazenda`
        FOREIGN KEY (`id_fazenda`)
        REFERENCES `Fazenda`(`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;