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
('num4n',		'Numan1234',		'236-145-2542',	'numan@gmail.com', 	'Mohamed',  'Numan'),
('nick_knapton',	'software1234',		'587-890-4387',	'nicholas@yahoo.com', 	'Nicholas', 'Knapton'),
('zeeshansalim',	'code3211',		'705-667-9481',	'zeeshan@outlook.com',	'Zeeshan',  'Chougle'),
('elon',		'spacex4life',		'306-512-5508',	'elon@tesla.com', 	'Elon',     'Musk'),
('bezos_1',		'amazonisgreat32',	'403-980-9876',	'jeff@amazon.com', 	'Jeff',     'Bezos');

DROP TABLE IF EXISTS JOBS;
CREATE TABLE JOBS (
	CompanyName			varchar(25) not null,
	Position			varchar(25) not null,
	StartDate			varchar(10) ,
    	EndDate				varchar(255),
   	Link				char(25) not null,
    	Description			char(255) ,
	ListName			char(25) ,
    	ListId				char(25) ,
	primary key (CompanyName)
);

INSERT INTO JOBS (CompanyName, Position, StartDate, EndDate, Link, Description, ListName, ListId)
VALUES
('Amazon',	'Back-End',		'15-01-2022',	'15-04-2022', 		'amazoncareers.ca', 	'N/A',	'N/A',	'N/A'),
('Google',	'Front-End',		'11-04-2022',	'11-04-2023', 		'careersgoogle.com', 	'N/A',	'N/A',	'N/A'),
('IBM',		'Devops',		'21-07-2022',	'21-01-2023',		'ibmrecruitment.ca', 	'N/A',	'N/A',	'N/A'),
('Tesla',     	'Machine Learning',	'28-04-2022',	'15-01-2023', 		'teslahires.com', 	'N/A',	'N/A',	'N/A'),
('Microsoft', 	'Back-End',		'09-06-2022',	'09-10-2022', 		'microsoftjobs.com', 	'N/A',	'N/A',	'N/A');

DROP TABLE IF EXISTS MYJOBS;
CREATE TABLE MYJOBS (
	CompanyName			varchar(25) not null,
	Position			varchar(25) not null,
	ApplicationStatus		char(25) not null,
    	ApplicationDate			char(25),
	primary key (CompanyName)
);

INSERT INTO MYJOBS (CompanyName, Position, ApplicationStatus, ApplicationDate)
VALUES
('Amazon',	'Back-End',		'Offer Recieved',	'01-01-2022'),
('IBM',		'Devops',		'Under-Review',		'01-02-2022'),
('Tesla',     	'Machine Learning',	'Under-Review',		'02-01-2022');

DROP TABLE IF EXISTS TRACKING;
CREATE TABLE TRACKING (
	ListName			varchar(25) not null,
	primary key (ListName)
);

INSERT INTO TRACKING (ListName)
VALUES
('Amazon'),
('IBM'),
('Tesla');

DROP TABLE IF EXISTS COMPANY;
CREATE TABLE COMPANY (
	Company			varchar(25) not null,
    	CompanySize		varchar(25) not null,
    	Role			varchar(25) not null,
    	TotalComp		double not null,
	primary key (Company)
);

INSERT INTO COMPANY (Company, CompanySize, Role, TotalComp)
VALUES
('Amazon',	 'Large',	'Back-End',		115000.0),
('IBM',		'Large',	'Devops',		70000.0),
('Tesla',     	'Large',	'Machine Learning',	100000.0),
('Google',     	'Large',	'Front-End',		120000.0),
('Microsoft',   'Large',	'Back-End',		111000.0);

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
    Size			varchar(25) not null,
    Passwprd			varchar(25) not null,
	primary key (CompanyUsername)
);


INSERT INTO COMPANYCREDENTIALS (CompanyName, CompanyUsername, Passwprd, Industry, Size, Link)
VALUES
('Amazon',    'AMZN',	'Jeff1969',	'E-commerce', 		'Large', 	'amazoncareers.ca'),
('Google',    'GOOGL',	'ELGOOG321',	'Technology', 		'Large',	'careersgoogle.com'),
('IBM',	      'IBMC',	'AK642020',	'Computer-Hardware', 	'Large',	'ibmrecruitment.ca'),
('Tesla',     'TSLA',	'EMUSK420',	'Vehicle Manufacturer', 'Large',	'teslahires.com'),
('Microsoft', 'MSFT',	'UEOQ234@',	'Technology', 		'Large',	'microsoftjobs.com');
