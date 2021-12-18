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
('numan@gmail.com',		'Mohamed', 	'Numan',	'236-145-2542',	'num4n',		'Numan1234'),
('nicholas@yahoo.com',		'Nicholas', 	'Knapton',	'587-890-4387',	'nick_knapton',		'software1234'),
('zeeshan@outlook.com',		'Zeeshan', 	'Chougle',	'705-667-9481',	'zeeshansalim',		'code3211'),
('elon@tesla.com',		'Elon', 	'Musk',		'306-512-5508',	'elon',			'spacex4life'),
('jeff@amazon.com',		'Jeff', 	'Bezos',	'403-980-9876',	'bezos_1',		'amazonisgreat32');

DROP TABLE IF EXISTS COMPANYCREDENTIALS;
CREATE TABLE COMPANYCREDENTIALS (
    companyId			integer not null AUTO_INCREMENT,
    companyName			varchar(25) not null,
    username			varchar(25) not null,
    industry			varchar(25) not null,
    size			varchar(25) not null,
    password			varchar(25) not null,
    primary key (companyId)
);

INSERT INTO COMPANYCREDENTIALS (companyName, username, industry, size, password)
VALUES
('Amazon',     	'AMZN',		'E-commerce', 		'Large',	'Jeff1969'),
('Google',     	'GOOGL',    	'Technology', 		'Large',	'ELGOOG321'),
('IBM',	      	'IBMC',		'Computer-Hardware', 	'Large',	'AK642020'),
('Tesla',      	'TSLA',		'Vehicle Manufacturer', 'Large',	'EMUSK420'),
('Microsoft',  	'MSFT',		'Technology', 		'Large',	'UEOQ234@'),
('Blizzard',  	'BLZD',		'Technology', 		'Large',	'HDI29721');

DROP TABLE IF EXISTS TRACKINGLIST;
CREATE TABLE TRACKINGLIST (
    listId		integer not null AUTO_INCREMENT,
    userName		varchar(25) not null,
    listName		varchar(25) not null,
    primary key (listId),
    foreign key (userName) references USERCREDENTIALS(userName) ON UPDATE CASCADE
);

INSERT INTO TRACKINGLIST (userName,listName)
VALUES
('nick_knapton','Back-End'),
('num4n',	'Front-End'),
('zeeshansalim','Back-End'),
('zeeshansalim','Front-End');

DROP TABLE IF EXISTS JOBS;
CREATE TABLE JOBS (
    JobId			integer not null AUTO_INCREMENT,
    company			varchar(25) not null,
    position			varchar(25) not null,
    startDate			varchar(10) ,
    link			char(100) not null,
    description			char(255) ,
    CompanyId			integer not null,
    primary key (JobId),
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
VALUES
(1,'Amazon',	  'Back-End',			'15-01-2022',	'amazoncareers.ca', 'N/A'),
(2,'Google',	  'Front-End',			'11-04-2022',	'careersgoogle.com','N/A'),
(3,'IBM',         'Devops',			'21-07-2022',	'ibmrecruitment.ca','N/A'),
(4,'Tesla',       'Machine Learning',		'15-01-2023', 	'teslahires.com',   'N/A'),
(5,'Microsoft',   'Back-End',			'19-06-2022',	'microsoftjobs.com','N/A'),
(5,'Microsoft',   'Front-End',			'21-05-2022',	'microsoftjobs.com','N/A'),
(5,'Microsoft',   'Full-Stack',			'04-07-2022',	'microsoftjobs.com','N/A'),
(5,'Microsoft',   'Back-End',			'01-02-2022',	'microsoftjobs.com','N/A');

DROP TABLE IF EXISTS MYJOBS;
CREATE TABLE MYJOBS (
    Id			integer not null AUTO_INCREMENT,
    userName		varchar(25) not null,
    ApplicationStatus	char(25) not null,
    ListId		integer not null,
    ApplicationDate	char(25) ,
    companyName		varchar(25) not null,
    position		varchar(25) not null,
    startDate		varchar(25) not null,
    link		varchar(25) not null,
    description		varchar(25) not null,
    CompanyId		integer not null,
    primary key (Id),
    foreign key (ListId) references TRACKINGLIST(listId) ON UPDATE CASCADE,
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE,
    foreign key (userName) references USERCREDENTIALS(UserName) ON UPDATE CASCADE
);

INSERT INTO MYJOBS (userName,ApplicationStatus,ListId,ApplicationDate,companyName,position,startDate,CompanyId,link,description)
VALUES
('nick_knapton',	'Offer', 	1,	'01-01-2022','Amazon','Back-End',  '01-01-2021',1,'amazoncareers.ca', 'N/A'),
('num4n',		'Applied',	2,	'01-02-2022','IBM',   'Devops',    '01-01-2021',3,'ibmrecruitment.ca','N/A'),
('zeeshansalim',	'Interview',	3,	'02-01-2022','Tesla', 'Back-End',  '01-01-2021',4,'teslahires.com',   'N/A'),
('zeeshansalim',	'Rejected',     3,	'12-01-2022','IBM',   'DevOps',    '01-01-2021',3,'ibmrecruitment.ca','N/A'),
('zeeshansalim',	'Wishlist',	4,	'12-04-2022','Google','Front-End', '01-01-2021',2,'careersgoogle.com','N/A');

DROP TABLE IF EXISTS TRACKING;
CREATE TABLE TRACKING (
    listName			varchar(25) not null,
    CompanyId			integer not null,	
    primary key (CompanyId),
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO TRACKING (listName,CompanyId)
VALUES
('Amazon',1),
('IBM',3),
('Tesla',4);

DROP TABLE IF EXISTS SALARY;
CREATE TABLE SALARY (
    serialno		integer not null auto_increment,
    company		varchar(25) not null,
    companySize		varchar(25) not null,
    role		varchar(25) not null,
    totalComp		double not null,
    CompanyId		integer,
    primary key (serialno),
    foreign key (companyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE
);

INSERT INTO SALARY (company, companySize, role, totalComp, companyId)
VALUES
('Amazon',	'Large',	'Back-End',		115000.0, 1),
('IBM',		'Large',	'Devops',		70000.0,  3),
('Tesla',     	'Large',	'Machine Learning',	100000.0, 4),
('Google',     	'Large',	'Front-End',		120000.0, 2),
('Microsoft',   'Large',	'Back-End',		111000.0,5),
('Microsoft',   'Large',	'Front-End',		89800.0, 5);

DROP TABLE IF EXISTS JOBSAPPLIED;
CREATE TABLE JOBSAPPLIED (
    Id			integer not null,
    userName		varchar(25) not null,
    jobId		varchar(25) not null,
    dNo			int not null,
    primary key (jobId)
);

INSERT INTO JOBSAPPLIED (Id, username,jobId, dNo)
VALUES
(1,'nick_knapton','001',	112),
(2,'num4n',	  '002',	324),
(3,'zeeshansalim','003',  	123);


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
    title		varchar(25) not null,
    review		varchar(25) not null,
    month		varchar(25) not null,
    day			varchar(3) not null,
    year		varchar(25) not null,
    primary key (companyName,title)
);
INSERT INTO REVIEWS (companyName, title,review, month,day,year)
VALUES
('Amazon', 'Product Review',  'Satisfactory',   'January','3',  '2021'),
('IBM',    'Interview Review','Very Tough',	'March',  '5',  '2020'),
('Tesla',  'Electrical',      'Chip glitches',  'June',   '11', '2021');

DROP TABLE IF EXISTS RESOURCESTAG;
CREATE TABLE RESOURCESTAG (
    tags			integer not null,
    value			varchar(50) not null,
    primary key(tags,value)
);

INSERT INTO RESOURCESTAG (tags,value)
VALUES
(1,'#coding'),
(1,'#compsci'),
(2,'#java'),
(3,'#c++'),
(3,'#coding'),
(4,'#frontend'),
(3,'#challenge');

DROP TABLE IF EXISTS LEARNINGRESOURCES;
CREATE TABLE LEARNINGRESOURCES (
    Id				integer not null auto_increment,
    tags			integer not null,
    topic			varchar(50) not null,
    link			varchar(255) not null,
    primary key (Id),
    foreign key (tags) references RESOURCESTAG(tags) ON UPDATE CASCADE
);

INSERT INTO LEARNINGRESOURCES (tags,topic,link)
VALUES
(1,'Python Beginner Crash Course',	'https://www.youtube.com/watch?v=JJmcL1N2KQs&t=284s'),
(1,'MySQL tutorial',			'https://www.youtube.com/watch?v=7S_tz1z_5bA'),
(2,'Java Springboot',  			'https://www.youtube.com/watch?v=vtPkZShrvXQ&t=5650s'),
(3,'C++ coding challenge',  		'https://www.youtube.com/watch?v=vtPkZShrvXQ&t=5650s'),
(2,'Basics of coding',  		'https://www.youtube.com/watch?v=I-k-iTUMQAY'),
(4,'HTML crash course',  		'https://www.youtube.com/watch?v=UB1O30fR-EE');

DROP TABLE IF EXISTS MYLEARNINGRESOURCES;
CREATE TABLE MYLEARNINGRESOURCES (
    username			varchar(25) not null,
    learningId			integer not null,
    primary key(username,learningId),
    foreign key (learningId) references LEARNINGRESOURCES(Id) ON UPDATE CASCADE
);

INSERT INTO MYLEARNINGRESOURCES (username,learningId)
VALUES
('num4n',1),
('num4n',2),
('nick_knapton',2),
('zeeshansalim',3),
('nick_knapton',1),
('nick_knapton',4),
('num4n',4);

DROP TABLE IF EXISTS QUESTIONTAGS;
CREATE TABLE QUESTIONTAGS (
    tags			integer not null,
    value			varchar(50) not null,
    primary key(tags,value)
);

INSERT INTO QUESTIONTAGS (tags,value)
VALUES
(1,'#leetcode hard'),
(1,'#challenging'),
(2,'#leetcode mediun'),
(3,'#leetcode easy');

DROP TABLE IF EXISTS QUESTIONRESOURCES;
CREATE TABLE QUESTIONRESOURCES (
    Id				integer not null auto_increment,
    tags			integer not null,
    qPrompt			varchar(255) not null,
    questionNum			varchar(50) not null,
    link			varchar(255) not null,
    description			varchar(50) not null,
    primary key (Id),
    foreign key (tags) references QUESTIONTAGS(tags) ON UPDATE CASCADE
);

INSERT INTO QUESTIONRESOURCES (tags,qPrompt,questionNum,link,description)
VALUES
(1,'What’s an algorithm?','Q1',				'https://www.youtube.com/watch?v=JJmcL1N2KQs&t=284s','N/A'),
(2,'How to check if two String are Anagram?','Q2',	'https://www.youtube.com/watch?v=7S_tz1z_5bA','N/A'),
(3,'How to convert numeric String to int in Java','Q3', 'https://www.youtube.com/watch?v=vtPkZShrvXQ&t=5650s','N/A');

DROP TABLE IF EXISTS MYQUESTIONRESOURCES;
CREATE TABLE MYQUESTIONRESOURCES (
    username		varchar(25) not null,
    id			integer not null,
    primary key(username,id),
    foreign key (id) references QUESTIONRESOURCES(Id) ON UPDATE CASCADE
);

INSERT INTO MYQUESTIONRESOURCES (username,id)
VALUES
('num4n',1),
('num4n',2),
('nick_knapton',2),
('zeeshansalim',3);

DROP TABLE IF EXISTS USERDOCUMENTS;
CREATE TABLE USERDOCUMENTS (
    dNo					integer not null auto_increment,
    userName				varchar(25) not null,
    fileName				varchar(25) not null,
    type				varchar(25) not null,
    primary key(dNo),
    foreign key (username) references USERCREDENTIALS(userName) ON UPDATE CASCADE
);

INSERT INTO USERDOCUMENTS (userName,fileName,type)
VALUES
('num4n','file1','pdf'),
('nick_knapton','file2', 'pdf'),
('num4n','file3','png'),
('zeeshansalim','file4','pdf'),
('nick_knapton','file5','pdf');

DROP TABLE IF EXISTS APPLIED;
CREATE TABLE APPLIED (
    username			varchar(25) not null,
    JobId			integer not null,
    dNo				integer not null,
    primary key(username,JobId,dNo),
    foreign key (JobId) references JOBS(JobId) ON UPDATE CASCADE,
    foreign key (username) references USERCREDENTIALS(userName) ON UPDATE CASCADE,
    foreign key (dNo) references USERDOCUMENTS(dNo) ON UPDATE CASCADE
);
INSERT INTO APPLIED (username,JobId,dNo)
VALUES
('num4n',3,1),
('zeeshansalim',4,4),
('nick_knapton',1,2),
('nick_knapton',2,5);



