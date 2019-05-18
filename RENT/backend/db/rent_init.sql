DROP DATABASE IF EXISTS rent;
CREATE DATABASE IF NOT EXISTS rent character set utf8;
USE rent;

CREATE TABLE `Users` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`email` varchar(255) NOT NULL UNIQUE,
	`phoneNumber` varchar(10),
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`currentRental` bigint(20) DEFAULT NULL,
	`pastRental` bigint(20) DEFAULT NULL,
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

CREATE TABLE `Lease` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`landlordFirstName` varchar(255) NOT NULL,
	`landlordLastName` varchar(255) NOT NULL,
	`landlordPhoneNumber` varchar(10),
	`landlordEmail` varchar(255),
	`rentCost` DECIMAL(13, 2) NOT NULL DEFAULT 0,
	`startDate` DATE NOT NULL,
	`endDate` DATE NOT NULL,
	`rentDueDate` varchar(50) NOT NULL,
	`document` bigint(20) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Rental` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`roommates` bigint(20) NOT NULL,
	`contactInfoList` bigint(20) NOT NULL,
	`lease` bigint(20) NOT NULL,
	`insurance` bigint(20) NOT NULL,
	`board` bigint(20) NOT NULL,
	`address` varchar(255) NOT NULL,
	`photo` varchar(255),
	PRIMARY KEY (`id`)
);

CREATE TABLE `Board` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Note` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL,
	`value` varchar(500) NOT NULL,
	`board` bigint(20) NOT NULL,
	`isDeleted` BOOL NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ContactInfoList` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`contact1` bigint(20) DEFAULT NULL,
	`contact2` bigint(20) DEFAULT NULL,
	`contact3` bigint(20) DEFAULT NULL,
	`contact4` bigint(20) DEFAULT NULL,
	`contact5` bigint(20) DEFAULT NULL,
	`contact6` bigint(20) DEFAULT NULL,
	`contact7` bigint(20) DEFAULT NULL,
	`contact8` bigint(20) DEFAULT NULL,
	`contact9` bigint(20) DEFAULT NULL,
	`contact10` bigint(20) DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ContactInfo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`firstName` varchar(255) NOT NULL,
	`lastName` varchar(255) NOT NULL,
	`phoneNumber` varchar(10) NOT NULL,
	`email` varchar(255),
	`associatedUser` bigint(20) NOT NULL,
	`relationship` varchar(255) NOT NULL,
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

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk1` FOREIGN KEY (`contactInfoList`) REFERENCES `ContactInfoList`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk2` FOREIGN KEY (`lease`) REFERENCES `Lease`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk3` FOREIGN KEY (`insurance`) REFERENCES `PropertyDocument`(`id`);

ALTER TABLE `Rental` ADD CONSTRAINT `Rental_fk4` FOREIGN KEY (`board`) REFERENCES `Board`(`id`);

ALTER TABLE `Lease` ADD CONSTRAINT `Lease_fk0` FOREIGN KEY (`document`) REFERENCES `PropertyDocument`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk0` FOREIGN KEY (`contact1`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk1` FOREIGN KEY (`contact2`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk2` FOREIGN KEY (`contact3`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk3` FOREIGN KEY (`contact4`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk4` FOREIGN KEY (`contact5`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk5` FOREIGN KEY (`contact6`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk6` FOREIGN KEY (`contact7`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk7` FOREIGN KEY (`contact8`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk8` FOREIGN KEY (`contact9`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `ContactInfoList` ADD CONSTRAINT `ContactInfoList_fk9` FOREIGN KEY (`contact10`) REFERENCES `ContactInfo`(`id`);

ALTER TABLE `Note` ADD CONSTRAINT `Note_fk0` FOREIGN KEY (`board`) REFERENCES `Board`(`id`);
