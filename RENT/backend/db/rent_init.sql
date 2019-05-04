DROP DATABASE IF EXISTS rent;
CREATE DATABASE IF NOT EXISTS rent;
USE rent;

CREATE TABLE `Users` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`rental` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Roommates` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`roommate1` bigint(20) DEFAULT NULL,
	`roommate2` bigint(20) DEFAULT NULL,
	`roommate3` bigint(20) DEFAULT NULL,
	`roommate4` bigint(20) DEFAULT NULL,
	`roommate5` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `PropertyDocument` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`document` mediumblob NOT NULL,
	`docName` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Rental` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`document` bigint(20) NOT NULL,
	`roommates` bigint(20) NOT NULL,
	`contactInfo` bigint(20) NOT NULL,
	`expenses` bigint(20) NOT NULL,
	`shoppingList` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ContactInfo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`phoneNumber` varchar(10) NOT NULL,
	`email` varchar(255),
	`associatedUser` bigint(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `GroceryListItem` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(25) NOT NULL,
	`count` int(4) NOT NULL DEFAULT 0,
	`price` DECIMAL(13, 2) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);

CREATE TABLE `GroceryList` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`listItem1` bigint(20) DEFAULT NULL,
	`listItem2` bigint(20) DEFAULT NULL,
	`listItem3` bigint(20) DEFAULT NULL,
	`listItem4` bigint(20) DEFAULT NULL,
	`listItem5` bigint(20) DEFAULT NULL,
	`listItem6` bigint(20) DEFAULT NULL,
	`listItem7` bigint(20) DEFAULT NULL,
	`listItem8` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Expenses` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`rent` bigint(20) NOT NULL,
	`heat_gas` bigint(20) DEFAULT NULL,
	`internet` bigint(20) DEFAULT NULL,
	`electricity` bigint(20) DEFAULT NULL,
	`insurance` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ExpenseListItem` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`expense` varchar(255) NOT NULL,
	`cost` DECIMAL(13,2) NOT NULL DEFAULT 0,
	`paid` BOOL NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`rental`) REFERENCES `Rental`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk0` FOREIGN KEY (`roommate1`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk1` FOREIGN KEY (`roommate2`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk2` FOREIGN KEY (`roommate3`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk3` FOREIGN KEY (`roommate4`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk4` FOREIGN KEY (`roommate5`) REFERENCES `Users`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk0` FOREIGN KEY (`document`) REFERENCES `PropertyDocument`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk1` FOREIGN KEY (`roommates`) REFERENCES `Roommates`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk2` FOREIGN KEY (`contactInfo`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk3` FOREIGN KEY (`expenses`) REFERENCES `Expenses`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk4` FOREIGN KEY (`shoppingList`) REFERENCES `GroceryList`(`id`);

ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_fk0` FOREIGN KEY (`associatedUser`) REFERENCES `Users`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk0` FOREIGN KEY (`listItem1`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk1` FOREIGN KEY (`listItem2`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk2` FOREIGN KEY (`listItem3`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk3` FOREIGN KEY (`listItem4`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk4` FOREIGN KEY (`listItem5`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk5` FOREIGN KEY (`listItem6`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk6` FOREIGN KEY (`listItem7`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_fk7` FOREIGN KEY (`listItem8`) REFERENCES `GroceryListItem`(`id`);

ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_fk0` FOREIGN KEY (`rent`) REFERENCES `ExpenseListItem`(`id`);

ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_fk1` FOREIGN KEY (`heat_gas`) REFERENCES `ExpenseListItem`(`id`);

ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_fk2` FOREIGN KEY (`internet`) REFERENCES `ExpenseListItem`(`id`);

ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_fk3` FOREIGN KEY (`electricity`) REFERENCES `ExpenseListItem`(`id`);

ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_fk4` FOREIGN KEY (`insurance`) REFERENCES `ExpenseListItem`(`id`);

