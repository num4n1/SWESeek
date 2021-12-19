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
('Facebook',  	'FACE',		'Technology', 		'Large',	'Password'),
('Apple',  	'APPL',		'Technology', 		'Large',	'Password'),
('Netflix',  	'NTFL',		'Streaming', 		'Medium',	'Password'),
('Twitch',  	'TWCH',		'Technology', 		'Large',	'Password'),
('General Motors',  'GENM',		'Vehicle Manufacturer', 'Large', 'Password'),
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
(1,'Amazon',	  'Back-End',			'15-01-2022',	'https://www.amazoncareers.ca', 'Excited by High Scale Distributed Systems and Personalization? Interested in working on complex problems and high impact projects?'),
(2,'Google',	  'Front-End',			'11-04-2022',	'https://www.careersgoogle.com','As a Software Developer in Augmented Reality (AR) Experience Fundamentals, you will build user-facing AR experiences for phones and next-generation devices. You will work closely with other engineers and in cross-functional teams including UX.'),
(3,'IBM',         'Devops',			'21-07-2022',	'https://www.ibmrecruitment.ca','DevOps speeds delivery of higher quality software by combining and automating the work of software development and IT operations teams.'),
(4,'Tesla',       'Machine Learning',		'15-01-2023', 	'https://www.teslahires.com',   'Teslas Autopilot Machine Learning team is currently seeking a software engineer to design and build an internal web service and database for command and control of a custom ML training accelerator (DOJO).'),
(5,'Microsoft',   'Back-End',			'19-06-2022',	'https://www.microsoftjobs.com','Our backend engineers develop the core Yammer services that power all our experiences. As a social networking product, Yammer has tons of interesting engineering challenges.'),
(5,'Microsoft',   'Front-End',			'21-05-2022',	'https://www.microsoftjobs.com','The Microsoft Start team is looking for self-motivated and experienced Frontend Engineers to build the best personalized content feed system to connect 1B+ users with the most engaging, informative, and inspiring content they care about.'),
(5,'Microsoft',   'Full-Stack',			'04-07-2022',	'https://www.microsoftjobs.com','Microsoft 365 Modern Workplace Transformation Insight (M365 MWT-Insight or Viva Insight) helps people and businesses thrive with insights, recommendations and solutions that are integrated into Microsoft Teams and Outlook to improve productivity.'),
(6,'Facebook',   'Full-Stack',			'04-07-2022',	'https://www.facebookjobs.com','We are the teams who create all of Facebooks products used by billions of people around the world. Want to build new features and improve existing products like Messenger, Video, Groups, News Feed, Search and more.'),
(7,'Apple',   'Product Designer',			'04-07-2022',	'https://www.applejobs.com','App Store Connect is looking for a hardworking UI Engineer that is responsible for implementing and maintaining online tools. Candidates must be able to build web pages from design comps to pixel perfect pages.'),
(8,'Netflix',   'Back End',			'04-07-2022',	'https://www.netflixjobs.com','The Platform Engineering  team at Netflix is aimed at improving various aspects of our business.  The team is dedicated to providing information and tools to our colleagues so that we can make decisions on how to bring the most joy to our subscribers.'),
(9,'Twitch',   'API Development',			'04-07-2022',	'https://www.twitchjobs.com','As part of the Interactivity team, reporting to the Director of Software Engineering, you will support a product roadmap of new features that help connect live broadcasters and audiences. You will be developing client libraries and SDKs for AWS.');

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
    description		varchar(255) not null,
    CompanyId		integer not null,
    primary key (Id),
    foreign key (ListId) references TRACKINGLIST(listId) ON UPDATE CASCADE,
    foreign key (CompanyId) references COMPANYCREDENTIALS(CompanyId) ON UPDATE CASCADE,
    foreign key (userName) references USERCREDENTIALS(UserName) ON UPDATE CASCADE
);

INSERT INTO MYJOBS (userName,ApplicationStatus,ListId,ApplicationDate,companyName,position,startDate,CompanyId,link,description)
VALUES
('nick_knapton',	'Offer', 	1,	'01-01-2022','Amazon','Back-End',  '01-01-2021',1,'amazoncareers.ca', 'Excited by High Scale Distributed Systems and Personalization? Interested in working on complex problems and high impact projects?'),
('num4n',		'Applied',	2,	'01-02-2022','IBM',   'Devops',    '01-01-2021',3,'ibmrecruitment.ca','DevOps speeds delivery of higher quality software by combining and automating the work of software development and IT operations teams.'),
('zeeshansalim',	'Interview',	3,	'02-01-2022','Tesla', 'AI',  '01-01-2021',4,'teslahires.com',   'Teslas Autopilot Machine Learning team is currently seeking a software engineer to design and build an internal web service and database for command and control of a custom ML training accelerator (DOJO).'),
('zeeshansalim',	'Rejected',     3,	'12-01-2022','IBM',   'DevOps',    '01-01-2021',3,'ibmrecruitment.ca','DevOps speeds delivery of higher quality software by combining and automating the work of software development and IT operations teams.'),
('zeeshansalim',	'Wishlist',	4,	'12-04-2022','Google','Front-End', '01-01-2021',2,'careersgoogle.com','As a Software Developer in Augmented Reality (AR), you will build user-facing AR experiences for phones and next-gen devices. You will work in cross-functional teams including UX, product management (PM), program management (PgM).');

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
('Amazon',	'Large', 'Back-End', 115000.0, 1),
('Amazon', 'Large',	'Back-End',	140000.0, 1),
('IBM',		'Large',	'Devops',		70000.0,  3),
('Tesla',     	'Large',	'Machine Learning',	100000.0, 4),
('Google',     	'Large',	'Front-End',		120000.0, 2),
('Microsoft',   'Large',	'Back-End',		111000.0,5),
('Microsoft',   'Large',	'Front-End',		89800.0, 5),
('Netflix',   'Medium',	'Front-End',		200000, 8),
('Apple',   'Large',	'AI',		112000, 7),
('Twitch',   'Large',	'API Dev',		89800.0, 9),
('Facebook',   'Large',	'Front-End',		98000.0, 6),
('General Motors',   'Large',	'UI',		67000, 5);

DROP TABLE IF EXISTS REVIEWS;
CREATE TABLE REVIEWS (
	companyId		integer not null ,
    companyName		varchar(25) not null,
    title		    varchar(25) not null,
    review		    varchar(25) not null,
    month		    varchar(25) not null,
    day			    varchar(3) not null,
    year		    varchar(25) not null,
    primary key (companyName,title),
	foreign key (companyId) references COMPANYCREDENTIALS(companyId) ON UPDATE CASCADE
);

INSERT INTO REVIEWS (companyId,companyName, title,review, month,day,year)
VALUES
(1,'Amazon', 'Product Review',  'Satisfactory',   'January','3',  '2021'),
(3,'IBM',    'Interview Review','Very Tough',	    'March',  '5',  '2020'),
(2,'Google',  'Ads',            'Inconsistant Ad showing',  'April',   '9', '2021'),
(4,'Tesla',  'Electrical',      'Chip glitches',  'June',   '11', '2021');

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
(1,'#leetcode easy'),
(1,'#LinkedList'),
(2,'#leetcode mediun'),
(2,'#Graphs'),
(4,'#leetcode easy'),
(4,'#Arrays'),
(3,'#leetcode medium'),
(3,'#Strings');

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
(4,'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.','Two Sum', 'https://www.youtube.com/watch?v=BoHO04xVeU0','How to solve Two Sum'),
(1,'Given the head of a singly linked list, reverse the list, and return the reversed list.','Reverse Linked List', 'https://www.youtube.com/watch?v=NhapasNIKuQ&t=76s','How to Reverse a Linked List'),
(2,'Given an m x n 2D binary grid grid which represents a map of 1s [land] and 0s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.','Number of Islands', 'https://www.youtube.com/watch?v=U6-X_QOwPcs','Learn to solve Number of Islands'),
(3,'Given a string s, find the length of the longest substring without repeating characters.','Longest Substring w/o Repeating Characters', 'https://www.youtube.com/watch?v=3IETreEybaA','Learn to solve longest Substring');


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

