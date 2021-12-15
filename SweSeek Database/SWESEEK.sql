DROP DATABASE IF EXISTS SWESEEK;
CREATE DATABASE SWESEEK; 
USE SWESEEK;

DROP TABLE IF EXISTS USERCREDENTIALS;
CREATE TABLE USERCREDENTIALS (
	Username			varchar(25) not null,
	Password			varchar(25) not null,
	PhoneNumber			varchar(13) not null,
    email				varchar(255) not null,
    FirstName			char(25) not null,
    LastName			char(25) not null,
	primary key (Username)
);

INSERT INTO USERCREDENTIALS (Username, Password, PhoneNumber, email, FirstName, LastName)
VALUES
('num4n',			'Numan1234',		'236-145-2542',	'numan@gmail.com', 		'Mohamed', 	'Numan'),
('nick_knapton',	'software1234',		'587-890-4387',	'nicholas@yahoo.com', 	'Nicholas', 'Knapton'),
('zeeshansalim',	'code3211',			'705-667-9481',	'zeeshan@outlook.com',	'Zeeshan', 	'Chougle'),
('elon',			'spacex4life',		'306-512-5508',	'elon@tesla.com', 		'Elon', 	'Musk'),
('bezos_1',			'amazonisgreat32',	'403-980-9876',	'jeff@amazon.com', 		'Jeff', 	'Bezos');

DROP TABLE IF EXISTS JOBS;
CREATE TABLE JOBS (
	CompanyName			varchar(25) not null,
	Position			varchar(25) not null,
	StartDate			varchar(10) ,
    EndDate				varchar(255),
    Link				char(25) not null,
    Description			char(25) not null,
	ListName			char(25) ,
    ListId				char(25) ,
	ApplicationStatus	char(25) not null,
    ApplicationDate		char(25) ,
	primary key (CompanyName)
);


DROP TABLE IF EXISTS TRACKING;
CREATE TABLE TRACKING (
	ListName			varchar(25) not null,
	primary key (ListName)
);

DROP TABLE IF EXISTS COMPANY;
CREATE TABLE COMPANY (
	Company			varchar(25) not null,
    CompanySize		varchar(25) not null,
    Role			varchar(25) not null,
    TotalComp		double not null,
	primary key (Company)
);

DROP TABLE IF EXISTS JOBSAPPLIED;
CREATE TABLE JOBSAPPLIED (
	JobId			varchar(25) not null,
    DNo				int not null,
	primary key (JobId)
);

DROP TABLE IF EXISTS JOBPOSTING;
CREATE TABLE JOBPOSTING (
	Year			varchar(25) not null,
    Month			varchar(25) not null,
    Day				varchar(25) not null,
    Title			varchar(25) not null,
    Description		varchar(25) not null,
    JobUrl			varchar(25) not null,
	primary key (JobUrl)
);

DROP TABLE IF EXISTS COMPANYCREDENTIALS;
CREATE TABLE COMPANYCREDENTIALS (
	CompanyName			varchar(25) not null,
    CompanyUsername		varchar(25) not null,
    Industry			varchar(25) not null,
    Size				varchar(25) not null,
    Passwprd			varchar(25) not null,
	primary key (CompanyUsername)
);
