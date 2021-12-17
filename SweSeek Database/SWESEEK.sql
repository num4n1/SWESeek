DROP DATABASE IF EXISTS SWESEEK;
CREATE DATABASE SWESEEK; 
USE SWESEEK;

DROP TABLE IF EXISTS USERCREDENTIALS;
CREATE TABLE USERCREDENTIALS (
    email				varchar(255) not null,
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

DROP TABLE IF EXISTS TRACKINGLIST;
CREATE TABLE TRACKINGLIST (
	listId			integer not null AUTO_INCREMENT,
    userName		varchar(25) not null,
    listName		varchar(25) not null,
	primary key (listId),
        foreign key (userName) references USERCREDENTIALS(userName) ON UPDATE CASCADE
);

INSERT INTO TRACKINGLIST (userName,listName)
VALUES
('nick_knapton','Back-End'),
('num4n','Front-End'),
('zeeshansalim','Back-End'),
('zeeshansalim','Front-End');

DROP TABLE IF EXISTS JOBS;
CREATE TABLE JOBS (
	JobId				integer not null AUTO_INCREMENT,
    company				varchar(25) not null,
    position			varchar(25) not null,
    startDate			varchar(10) ,
    link				char(25) not null,
    description			char(255) ,
    CompanyId			char(3) not null,
    primary key (JobId),
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
VALUES
('001','Amazon',	  'Back-End',			'15-01-2022',	'amazoncareers.ca', 'N/A'),
('002','Google',	  'Front-End',			'11-04-2022',	'careersgoogle.com','N/A'),
('003','IBM',		  'Devops',				'21-07-2022',	'ibmrecruitment.ca','N/A'),
('004','Tesla',       'Machine Learning',	'15-01-2023', 	'teslahires.com',	'N/A'),
('005','Microsoft',   'Back-End',			'19-06-2022',	'microsoftjobs.com','N/A'),
('005','Microsoft',   'Front-End',			'21-05-2022',	'microsoftjobs.com','N/A'),
('005','Microsoft',   'Full-Stack',			'04-07-2022',	'microsoftjobs.com','N/A'),
('005','Microsoft',   'Back-End',			'01-02-2022',	'microsoftjobs.com','N/A');

DROP TABLE IF EXISTS MYJOBS;
CREATE TABLE MYJOBS (
	Id			integer not null AUTO_INCREMENT,
	userName		varchar(25) not null,
	ApplicationStatus	char(25) not null,
    ListId				integer not null,
	ApplicationDate		char(25) ,
    companyName		varchar(25) not null,
    position		varchar(25) not null,
    startDate		varchar(25) not null,
    link			varchar(25) not null,
    description		varchar(25) not null,
    CompanyId		char(3) not null,
	primary key (Id),
		foreign key (ListId) references TRACKINGLIST(listId) ON UPDATE CASCADE,
        foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE,
        foreign key (userName) references USERCREDENTIALS(UserName) ON UPDATE CASCADE
);

INSERT INTO MYJOBS (userName,ApplicationStatus,ListId,ApplicationDate,companyName,position,startDate,CompanyId,link,description)
VALUES
('nick_knapton',	'Offer Recieved', 1	,'01-01-2022','Amazon','Back-End','01-01-2021','001','amazoncareers.ca','N/A'),
('num4n',			'Under-Review',	2	,'01-02-2022','IBM','Devops','01-01-2021','003','ibmrecruitment.ca','N/A'),
('zeeshansalim',	'Under-Review',	3	,'02-01-2022','Tesla','Back-End','01-01-2021','004','teslahires.com','N/A'),
('zeeshansalim',	'Under-Review',3,'12-01-2022','IBM','DevOps','01-01-2021','003','ibmrecruitment.ca','N/A'),
('zeeshansalim',	'Under-Review',4,'12-04-2022','Google','Front-End','01-01-2021','002','careersgoogle.com','N/A');

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
    CompanyId		char(3),
    primary key (company,role),
    foreign key (companyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO SALARY (company, companySize, role, totalComp, companyId)
VALUES
('Amazon',	'Large',	'Back-End',		115000.0, '001'),
('IBM',		'Large',	'Devops',		70000.0,  '003'),
('Tesla',     	'Large',	'Machine Learning',	100000.0, '004'),
('Google',     	'Large',	'Front-End',		120000.0, '002'),
('Microsoft',   'Large',	'Back-End',		111000.0, '005'),
('Microsoft',   'Large',	'Front-End',		89800.0, '005');

DROP TABLE IF EXISTS JOBSAPPLIED;
CREATE TABLE JOBSAPPLIED (
	Id			integer not null,
	userName		varchar(25) not null,
    jobId			varchar(25) not null,
    dNo				int not null,
    primary key (jobId)
);

INSERT INTO JOBSAPPLIED (Id, username,jobId, dNo)
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

DROP TABLE IF EXISTS REVIEWS;
CREATE TABLE REVIEWS (
    companyName		varchar(25) not null,
	title			varchar(25) not null,
    review			varchar(25) not null,
    month			varchar(25) not null,
	day				varchar(3) not null,
    year			varchar(25) not null,
    primary key (companyName,title)
);
INSERT INTO REVIEWS (companyName, title,review, month,day,year)
VALUES
('Amazon','Product Review','Satisfactory','January','3','2021'),
('IBM','Interview Review','Very Tough',	'March','5','2020'),
('Tesla','Electrical','Chip glitches',  'June','11','2021');
