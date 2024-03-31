-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cst8285_group
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cst8285_group` DEFAULT CHARACTER SET utf8 ;
USE `cst8285_group` ;

-- -----------------------------------------------------
-- Table `cst8285_group`.`FamilyMembers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`FamilyMembers` ;

CREATE TABLE IF NOT EXISTS `cst8285_group`.`FamilyMembers` (
  `MemberID` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(50) NULL,
  `LastName` VARCHAR(50) NULL,
  `NickName` VARCHAR(50) NULL,
  `Relationship` VARCHAR(20) NULL,
  `Gender` VARCHAR(6) NULL,
  `email` VARCHAR(50) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`MemberID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cst8285_group`.`Vendors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`Vendors` ;

CREATE TABLE IF NOT EXISTS `cst8285_group`.`Vendors` (
  `VendorID` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `VendorName` VARCHAR(50) NULL,
  `GSTNo` VARCHAR(15) NULL,
  `Email` VARCHAR(50) NULL,
  `Phone` VARCHAR(15) NULL,
  `Address` VARCHAR(50) NULL,
  `City` VARCHAR(30) NULL,
  `Province` VARCHAR(20) NULL,
  `Zip` VARCHAR(6) NULL,
  `Membership` VARCHAR(20) NULL,
  PRIMARY KEY (`VendorID`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cst8285_group`.`Transactions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`Transactions` ;

CREATE TABLE IF NOT EXISTS `cst8285_group`.`Transactions` (
  `TransactionID` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `InvoiceNumber` VARCHAR(20) NULL,
  `TransactionDate` DATE NULL,
  `TransactionTime` TIME NULL,
  `Subtotal` DECIMAL(10,2) NULL,
  `TotalTax` DECIMAL(9,2) NULL,
  `Descriptions` VARCHAR(255) NULL,
  `MemberID` TINYINT UNSIGNED NOT NULL,
  `VendorID` MEDIUMINT UNSIGNED NOT NULL,
  PRIMARY KEY (`TransactionID`, `VendorID`),
  INDEX `fk_Transactions_Vendors1_idx` (`VendorID` ASC),
  CONSTRAINT `fk_Transactions_Vendors1`
    FOREIGN KEY (`VendorID`)
    REFERENCES `cst8285_group`.`Vendors` (`VendorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `cst8285_group`.`Usages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`Usages` ;


-- -----------------------------------------------------
-- Table `cst8285_group`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`Products` ;

CREATE TABLE IF NOT EXISTS `cst8285_group`.`Products` (
  `ProductID` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ProductName` VARCHAR(50) NULL,
  `VendorProductID` VARCHAR(50) NULL,
  `LatestPrice` DECIMAL(10,3) NULL,
  `TaxType` VARCHAR(1) NULL,
  `TaxRate` DECIMAL(7,4) NULL,
  `Unit` VARCHAR(10) NULL,
  `Descriptions` VARCHAR(100) NULL,
  `VendorID` MEDIUMINT UNSIGNED NOT NULL,
  PRIMARY KEY (`ProductID`, `VendorID`),
  INDEX `fk_Products_Vendors1_idx` (`VendorID` ASC),
  CONSTRAINT `fk_Products_Vendors1`
    FOREIGN KEY (`VendorID`)
    REFERENCES `cst8285_group`.`Vendors` (`VendorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `cst8285_group`.`TransactionDetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cst8285_group`.`TransactionDetails` ;

CREATE TABLE IF NOT EXISTS `cst8285_group`.`TransactionDetails` (
  `TransactionDetailID` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `TransactionID` MEDIUMINT UNSIGNED NOT NULL,
  `ProductID` INT UNSIGNED NOT NULL,
  `Price` DECIMAL(10,3) NOT NULL,
  `Quantity` DECIMAL(10,3) UNSIGNED NOT NULL,
  PRIMARY KEY (`TransactionDetailID`, `TransactionID`, `ProductID`),
  INDEX `fk_TransactionDetails_Transaction1_idx` (`TransactionID` ASC),
  INDEX `fk_TransactionDetails_Products1_idx` (`ProductID` ASC),
  CONSTRAINT `fk_TransactionDetails_Transaction1`
    FOREIGN KEY (`TransactionID`)
    REFERENCES `cst8285_group`.`Transactions` (`TransactionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TransactionDetails_Products1`
    FOREIGN KEY (`ProductID`)
    REFERENCES `cst8285_group`.`Products` (`ProductID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Insert data into vendors for testing
-- -----------------------------------------------------
INSERT INTO vendors (VendorName, GSTNo, Email, Phone, Address, City, Province, Zip, Membership) 
VALUES ("COSTCO WHOLESALE - Barrhaven #1263", "121476329RT", "", "", "4315 Strandherd Drive", "Ottawa", "ON", "K2J6E5", "111899751938");

INSERT INTO vendors (VendorName, GSTNo, Email, Phone, Address, City, Province, Zip, Membership) 
VALUES ("T&T Supermarket Ottawa Store", "13574713RT", "", "", "222 Hunt Club Rd Unit A", "Ottawa", "ON", "K1V1C1", "41040319259");

INSERT INTO vendors (VendorName, GSTNo, Email, Phone, Address, City, Province, Zip, Membership) 
VALUES ("Walmart - Store 3638", "137466199RT0001", "", "", "3651 Strandherd Drive", "Barrhaven", "ON", "K2J4G8", null);

INSERT INTO vendors (VendorName, GSTNo, Email, Phone, Address, City, Province, Zip, Membership) 
VALUES ("FRESHCO - Store Findlay", "742731482RT001", "", "613-822-4549", "4750 Bank Street", "Ottawa", "ON", "", "Scene+ ****773");

-- -----------------------------------------------------
-- insert data into products for testing
-- -----------------------------------------------------
-- For vendor 1
INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID) 
VALUES("MILK 2%", "458", 5.59, "", 0, "", "Blue bag", 1);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("BROCCOLI", "426192", 6.99, "", 0, "", "", 1);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("EGGS 2.5 DZ", "129572", 8.55, "", 0, "", "", 1);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("JAMIESON VITAMIN D 1000", "2941400", 13.99, "H", 0.13, "", "", 1);

-- For Vendor 2
INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("ANGEL YEAST", "", 7.49, "", 0, "", "安琪酵母低糖", 2);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("ATLANTIC SALMON HEAD", "", 8.80, "", 0, "kg", "大西洋三文鱼头", 2);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("CHINESE CELERY", "", 6.59, "", 0, "kg", "唐芹", 2);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("CRO QUAIL EGGS", "", 3.79, "", 0, "", "鹌鹑蛋", 2);

-- For Vendor 3
INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("POTATOES", "062891536252", 4.97, "D", 0, "", "", 3);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("LONG SQUASH", "000000003141K", 3.90, "D", 0, "kg", "", 3);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("ICEBERG", "007143003187", 3.47, "D", 0, "", "", 3);

INSERT INTO products (ProductName, VendorProductID, LatestPrice, TaxType, TaxRate, Unit, Descriptions, VendorID)
VALUES("GARDEN SEED", "077805499152", 2.49, "H", 0.13, "", "", 3);


-- -----------------------------------------------------
-- insert data into transactions &  transactionDetails for testing
-- -----------------------------------------------------
-- Transaction 1
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("20231102121516", "2023-11-02", "12:15:16", 33.56, 1.82, "", 0, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(1, 1, 5.59, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(1, 2, 6.99, 2);

-- Transaction 2
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("20231107121516", "2023-11-07", "12:15:16", 25.58, 0, "", 0, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(2, 5, 7.49, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(2, 6, 8.80, 2.056);

-- Transaction 3
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("20231212121516", "2023-12-12", "12:15:16", 19.73, 0, "", 0, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(3, 1, 5.59, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(3, 3, 8.55, 1);

-- Transaction 4
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("2024010512121516", "2024-01-05", "12:15:16", 33.71, 0, "", 0, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(4, 1, 5.59, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(4, 2, 6.99, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(4, 3, 8.55, 1);

-- Transaction 5
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("2024011512121516", "2024-01-15", "12:15:16", 13.84, 0, "", 0, 3);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(5, 9, 4.97, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(5, 11, 3.90, 1);

-- Transaction 6
INSERT INTO transactions (InvoiceNumber, TransactionDate, TransactionTime, Subtotal, TotalTax, Descriptions, MemberID, VendorID)
VALUES("2024012512121516", "2024-01-25", "12:15:16", 43.14, 0, "", 0, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(6, 6, 8.80, 2);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(6, 7, 6.59, 1);

INSERT INTO transactionDetails (TransactionID, ProductID, Price, Quantity)
VALUES(6, 8, 3.79, 5);

-- --------------------------------------------------------------------------
-- CREATE TRIGGER
-- --------------------------------------------------------------------------
-- DELIMITER //
-- CREATE TRIGGER before_insert_product
-- BEFORE INSERT ON cst8285_group.products
-- FOR EACH ROW
-- BEGIN
--     IF EXISTS (SELECT 1 FROM cst8285_group.products WHERE VendorProductID = NEW.VendorProductID) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'VendorProductID already exists';
--     END IF;
--     IF EXISTS (SELECT 1 FROM cst8285_group.products WHERE ProductName = NEW.ProductName) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ProductName already exists';
--     END IF;
-- END;//
-- DELIMITER ;

-- DELIMITER //
-- CREATE TRIGGER before_update_product
-- BEFORE UPDATE ON cst8285_group.products
-- FOR EACH ROW
-- BEGIN
--     IF EXISTS (SELECT 1 FROM cst8285_group.products WHERE VendorProductID = NEW.VendorProductID AND ProductID <> NEW.ProductID) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'VendorProductID already exists';
--     END IF;
--     IF EXISTS (SELECT 1 FROM cst8285_group.products WHERE ProductName = NEW.ProductName AND ProductID <> NEW.ProductID) THEN
--         SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'ProductName already exists';
--     END IF;
-- END;//
-- DELIMITER ;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- CREATE PROJECT USER
-- -----------------------------------------------------
-- CREATE USER IF NOT EXISTS 'xuUser'@'%' IDENTIFIED BY 'xuPassword123';
-- GRANT ALL PRIVILEGES ON cst8285_group.* TO 'xuUser'@'%';
-- FLUSH PRIVILEGES;
