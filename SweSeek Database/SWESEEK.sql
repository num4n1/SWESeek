DROP DATABASE IF EXISTS SWESEEK;
CREATE DATABASE SWESEEK; 
USE SWESEEK;

DROP TABLE IF EXISTS USERCREDENTIALS;
CREATE TABLE USERCREDENTIALS (
    email			varchar(255) not null,
	firstName			char(25) not null,
    lastName			char(25) not null,
    phoneNumber			varchar(13) not null,
    userName			varchar(25) not null,
    password			varchar(25) not null,
    primary key (username)
);

INSERT INTO USERCREDENTIALS (email, firstName, lastName, phoneNumber, userName, password)
VALUES
('numan@gmail.com',			'Mohamed', 	'Numan',	'236-145-2542',	'num4n',		'Numan1234'),
('nicholas@yahoo.com',		'Nicholas', 'Knapton',	'587-890-4387',	'nick_knapton',	'software1234'),
('zeeshan@outlook.com',		'Zeeshan', 	'Chougle',	'705-667-9481',	'zeeshansalim',	'code3211'),
('elon@tesla.com',			'Elon', 	'Musk',		'306-512-5508',	'elon',			'spacex4life'),
('jeff@amazon.com',			'Jeff', 	'Bezos',	'403-980-9876',	'bezos_1',		'amazonisgreat32');

DROP TABLE IF EXISTS COMPANYCREDENTIALS;
CREATE TABLE COMPANYCREDENTIALS (
    companyId			char(3) not null,
    companyName			varchar(25) not null,
    username		varchar(25) not null,
    industry			varchar(25) not null,
    size			varchar(25) not null,
    password			varchar(25) not null,
    primary key (companyId)
);

INSERT INTO COMPANYCREDENTIALS (companyId, companyName, username, industry, size, password)
VALUES
('001', 'Amazon',     'AMZN',	'E-commerce', 			'Large',	'Jeff1969'),
('002', 'Google',     'GOOGL',	'Technology', 			'Large',	'ELGOOG321'),
('003', 'IBM',	      'IBMC',	'Computer-Hardware', 	'Large',	'AK642020'),
('004', 'Tesla',      'TSLA',	'Vehicle Manufacturer', 'Large',	'EMUSK420'),
('005',	'Microsoft',  'MSFT',	'Technology', 			'Large',	'UEOQ234@');

DROP TABLE IF EXISTS JOBS;
CREATE TABLE JOBS (
	JobId			integer not null,
    company			varchar(25) not null,
    position			varchar(25) not null,
    startDate			varchar(10) ,
    link			char(25) not null,
    description			char(255) ,
    CompanyId			char(3) not null,
    primary key (JobId),
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO JOBS (JobId, CompanyId, Company, Position, StartDate, Link, Description)
VALUES
(1,'001','Amazon',	  'Back-End',			'15-01-2022','amazoncareers.ca',	'N/A'),
(2,'002','Google',	  'Front-End',			'11-04-2022',		'careersgoogle.com',	'N/A'),
(3,'003','IBM',		  'Devops',			'21-07-2022',		'ibmrecruitment.ca',	'N/A'),
(4,'004','Tesla',           'Machine Learning',	  	'15-01-2023', 		'teslahires.com',	'N/A'),
(5,'005','Microsoft',       'Back-End',			'09-06-2022',	'microsoftjobs.com',	'N/A');

DROP TABLE IF EXISTS MYJOBS;
CREATE TABLE MYJOBS (
	Serial			integer not null,
	userName		varchar(25) not null,
	CompanyName		varchar(25) not null,
	Position		varchar(25) not null,
	ApplicationStatus	char(25) not null,
        ApplicationDate		char(25) ,
        CompanyId		char(3) not null,
	primary key (Serial),
        foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE,
        foreign key (Serial) references JOBS(JobId) ON UPDATE CASCADE,
        foreign key (userName) references USERCREDENTIALS(UserName) ON UPDATE CASCADE
);

INSERT INTO MYJOBS (Serial,userName,CompanyName, Position, ApplicationStatus, ApplicationDate,CompanyId)
VALUES
(1,'nick_knapton','Amazon',    'Back-End',		'Offer Recieved',	'01-01-2022','001'),
(2,'num4n','IBM',	      'Devops',			'Under-Review',		'01-02-2022','003'),
(3,'zeeshansalim','Tesla',     'Machine Learning',	'Under-Review',		'02-01-2022','004'),
(4,'zeeshansalim','IBM',     'Devops',	'Under-Review',		'12-01-2022','003');

DROP TABLE IF EXISTS TRACKINGLIST;
CREATE TABLE TRACKINGLIST (
	Serial			integer not null,
    userName		varchar(25) not null,
	companyName		varchar(25) not null,
    position		varchar(25) not null,
    startDate		varchar(25) not null,
	link			varchar(25) not null,
    description		varchar(25) not null,
    listName		varchar(25) not null,
    listId			varchar(25) not null,
	applicationStatus	char(25) not null,
	applicationDate		char(25) ,
	CompanyId		char(3) not null,
	primary key (Serial),
        foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE,
        foreign key (Serial) references JOBS(JobId) ON UPDATE CASCADE,
        foreign key (userName) references USERCREDENTIALS(userName) ON UPDATE CASCADE
);

INSERT INTO TRACKINGLIST (Serial,userName,companyName,position,startDate,link,description,listName,listId,applicationStatus,applicationDate,CompanyId)
VALUES
(1,'nick_knapton','Amazon',    'Back-End',			'12-01-2022', 	'amazoncareers.ca','N/A' ,'N/A','N/A','Offer Recieved',	'01-01-2022','001'),
(2,'num4n','IBM',	    'Devops',			'12-01-2022',	'ibmrecruitment.ca','N/A','N/A','N/A','Under-Review',		'01-02-2022','003'),
(3,'zeeshansalim','Tesla',     'Machine Learning',	'12-01-2022',	'teslahires.com','N/A','N/A','N/A','Under-Review',		'02-01-2022','004'),
(4,'zeeshansalim','IBM',     'Devops',	'12-01-2022',	'teslahires.com','N/A','N/A','N/A','Under-Review',		'12-01-2022','003');
DROP TABLE IF EXISTS TRACKING;
CREATE TABLE TRACKING (
	listName			varchar(25) not null,
    CompanyId			char(3) not null,	
	primary key (CompanyId),
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO TRACKING (listName,CompanyId)
VALUES
('Amazon','001'),
('IBM','003'),
('Tesla','004');

DROP TABLE IF EXISTS SALARY;
CREATE TABLE SALARY (
    company		varchar(25) not null,
    companySize		varchar(25) not null,
    role		varchar(25) not null,
    totalComp		double not null,
    CompanyId		char(3) not null,
    primary key (company),
    foreign key (companyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO SALARY (company, companySize, role, totalComp, companyId)
VALUES
('Amazon',	'Large',	'Back-End',		115000.0, '001'),
('IBM',		'Large',	'Devops',		70000.0,  '003'),
('Tesla',     	'Large',	'Machine Learning',	100000.0, '004'),
('Google',     	'Large',	'Front-End',		120000.0, '002'),
('Microsoft',   'Large',	'Back-End',		111000.0, '005');

DROP TABLE IF EXISTS JOBSAPPLIED;
CREATE TABLE JOBSAPPLIED (
	Serial			integer not null,
	userName		varchar(25) not null,
    jobId			varchar(25) not null,
    dNo				int not null,
    primary key (jobId)
);

INSERT INTO JOBSAPPLIED (Serial, username,jobId, dNo)
VALUES
(1,'nick_knapton','001',	112),
(2,'num4n','002',	324),
(3,'zeeshansalim','003',  123);



DROP TABLE IF EXISTS JOBPOSTING;
CREATE TABLE JOBPOSTING (
    Year			varchar(25) not null,
    Month			varchar(25) not null,
    Day				varchar(3) not null,
    Title			varchar(25) not null,
    Description			varchar(25) not null,
    JobUrl			varchar(25) not null,
    primary key (JobUrl)
);
