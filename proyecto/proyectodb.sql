-- MySQL Script generated by MySQL Workbench
-- Wed Sep 11 19:13:41 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema proyectodb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `proyectodb` ;

-- -----------------------------------------------------
-- Schema proyectodb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyectodb` DEFAULT CHARACTER SET utf8 ;
USE `proyectodb` ;

-- -----------------------------------------------------
-- Table `proyectodb`.`USUARIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`USUARIOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `CORREO` VARCHAR(45) NOT NULL,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `APELLIDO` VARCHAR(45) NOT NULL,
  `FECHA_NAC` DATE NOT NULL,
  `DIR_ENTREGA` VARCHAR(100) NOT NULL,
  `PASSWORD` VARCHAR(45) NOT NULL,
  `FLG_ACTIVO_INACTIVO` INT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectodb`.`TELEFONOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`TELEFONOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `USUARIO_ID` INT NOT NULL,
  `TELEFONO` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `telefonos_usuarioFK_idx` (`USUARIO_ID` ASC) VISIBLE,
  CONSTRAINT `telefonos_usuarioFK`
    FOREIGN KEY (`USUARIO_ID`)
    REFERENCES `proyectodb`.`USUARIOS` (`ID`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectodb`.`PRODUCTOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`PRODUCTOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(100) NOT NULL,
  `COSTO_UNITARIO` FLOAT NOT NULL,
  `DESCRIPCION` VARCHAR(500) NULL,
  `IMAGEN` BLOB NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectodb`.`ANUNCIOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`ANUNCIOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `TEXTO` VARCHAR(500) NOT NULL,
  `IMAGEN` BLOB NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectodb`.`PEDIDOS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`PEDIDOS` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `NOMBRE` VARCHAR(45) NOT NULL,
  `FECHA_ENTREGA` DATE NOT NULL,
  `TOTAL` FLOAT NOT NULL,
  `USUARIO_ID` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `pedidoUsuarioFK_idx` (`USUARIO_ID` ASC) VISIBLE,
  CONSTRAINT `pedidoUsuarioFK`
    FOREIGN KEY (`USUARIO_ID`)
    REFERENCES `proyectodb`.`USUARIOS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectodb`.`DET_PRODUCTO`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectodb`.`DET_PRODUCTO` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `PEDIDO_ID` INT NOT NULL,
  `PRODUCTO_ID` INT NOT NULL,
  `CANTIDAD` FLOAT NOT NULL,
  `TOTAL` FLOAT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `detallePedidoPedidoFK_idx` (`PEDIDO_ID` ASC) VISIBLE,
  INDEX `detallePedidoProductoFK_idx` (`PRODUCTO_ID` ASC) VISIBLE,
  CONSTRAINT `detallePedidoPedidoFK`
    FOREIGN KEY (`PEDIDO_ID`)
    REFERENCES `proyectodb`.`PEDIDOS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `detallePedidoProductoFK`
    FOREIGN KEY (`PRODUCTO_ID`)
    REFERENCES `proyectodb`.`PRODUCTOS` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
