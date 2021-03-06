DROP DATABASE IF EXISTS rent;
CREATE DATABASE IF NOT EXISTS rent character set utf8;
USE rent;

CREATE TABLE `Users` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`phoneNumber` varchar(25),
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`currentRental` bigint(20) DEFAULT NULL,
	`pastRental` bigint(20) DEFAULT NULL,
	`deactivated` BOOL NOT NULL DEFAULT 0,
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

CREATE TABLE `Lease` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`landlordFirstName` varchar(255) NOT NULL,
	`landlordLastName` varchar(255) NOT NULL,
	`landlordPhoneNumber` varchar(25) DEFAULT NULL,
	`landlordEmail` varchar(255) DEFAULT NULL,
	`rentCost` DECIMAL(13, 2) NOT NULL DEFAULT 0,
	`startDT` DATETIME NOT NULL,
	`endDT` DATETIME NOT NULL,
	`rentDueDate` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Rental` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`roommates` bigint(20) NOT NULL,
	`lease` bigint(20) DEFAULT NULL,
	`board` bigint(20) DEFAULT NULL,
	`address` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Board` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Note` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`title` varchar(50) NOT NULL,
	`description` varchar(500) NOT NULL,
	`board` bigint(20) NOT NULL,
	`isDeleted` BOOL NOT NULL DEFAULT 0,
	`category` varchar(25) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ContactInfo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`phoneNumber` varchar(25) NOT NULL,
	`email` varchar(255),
	`associatedUser` bigint(20) NOT NULL,
	`relationship` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `CalendarEvent` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`eventName` varchar(255) NOT NULL,
	`eventStartDT` DATETIME NOT NULL,
	`eventEndDT` DATETIME NOT NULL,
	`eventDescription` varchar(255) DEFAULT NULL,
	`rental` bigint(20) NOT NULL,
	`isDeleted` BOOL NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`currentRental`) REFERENCES `Rental`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk1` FOREIGN KEY (`pastRental`) REFERENCES `Rental`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk0` FOREIGN KEY (`roommate1`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk1` FOREIGN KEY (`roommate2`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk2` FOREIGN KEY (`roommate3`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk3` FOREIGN KEY (`roommate4`) REFERENCES `Users`(`id`);

ALTER TABLE `Roommates` ADD CONSTRAINT `Roommates_fk4` FOREIGN KEY (`roommate5`) REFERENCES `Users`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk0` FOREIGN KEY (`roommates`) REFERENCES `Roommates`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk2` FOREIGN KEY (`lease`) REFERENCES `Lease`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk4` FOREIGN KEY (`board`) REFERENCES `Board`(`id`);

ALTER TABLE `ContactInfo` ADD CONSTRAINT `ContactInfo_fk0` FOREIGN KEY (`associatedUser`) REFERENCES `Users`(`id`);

ALTER TABLE `Note` ADD CONSTRAINT `Note_fk0` FOREIGN KEY (`board`) REFERENCES `Board`(`id`);

ALTER TABLE `CalendarEvent` ADD CONSTRAINT `CalendarEvent_fk0` FOREIGN KEY (`rental`) REFERENCES `Rental`(`id`);
