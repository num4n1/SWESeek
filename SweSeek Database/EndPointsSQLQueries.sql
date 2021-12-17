Endpoint 3: #correct
SELECT T.ListId, T.ListName
FROM TRACKINGLIST AS T
WHERE T.userName='CUSTOM'; 

SELECT M.Id,M.companyName,M.Position,M.link,M.applicationDate,M.applicationStatus,M.startDate,M.description
FROM TRACKINGLIST AS T ,MYJOBS AS M
WHERE M.ListId = T.listId; 

Endpoint 4: #correct
SELECT T.ListId, T.ListName
FROM TRACKINGLIST AS T
WHERE T.userName='CUSTOM' AND T.listName = 'CUSTOM'; 

SELECT M.Id,M.companyName,M.Position,M.link,M.applicationDate,M.applicationStatus,M.startDate,M.description
FROM TRACKINGLIST AS T ,MYJOBS AS M
WHERE T.listId=CUSTOM AND M.ListId = T.listId;  

Endpoint 4.1: 
UPDATE TRACKINGLIST AS T, MYJOBS AS M
SET applicationStatus = 'Offer Recieved'
WHERE listName = 'N/A'AND listId='N/A'AND T.Id =3 AND T.Id=M.Id; 

Endpoint 5:
INSERT INTO TRACKINGLIST (username, listName)
VALUES ('num4n', 'DataScience');

Endpoint 6:
INSERT INTO MYJOBS (JobId,userName,ApplicationStatus,ListId,ApplicationDate,companyName,position,startDate,CompanyId,link,description)
VALUES (1,'nick_knapton',	'Offer Recieved', 1	,'01-01-2022','Google','Back-End','01-01-2021','002','amazoncareers.ca','N/A')

Endpoint 7: #corrected
DELETE FROM MYJOBS WHERE listId=%s AND myJobId=%s AND userName=%s

Endpoint 8:
INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
VALUES ('003','IBM','Front-End','01-01-2022','ibmrecruitment.ca','N/A')

SELECT JobId FROM JOBS WHERE company = 'IBM' AND position = 'Front-End';

Endpoint 9: #correct
SELECT J.companyId,position,size,industry,link,description FROM JOBS AS J, COMPANYCREDENTIALS AS C WHERE J.companyId = C.companyId;

Endpoint 10: #correct
SELECT company,companySize,industry
FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId;

SELECT company,role,totalComp
FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId

Endpoint 11: #correct
SELECT company,companySize,industry
FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId;

SELECT company,role,avg(totalComp) 
FROM SALARY AS S, COMPANYCREDENTIALS AS C 
WHERE S.companyId = C.companyId 
GROUP BY company; 

Endpoint 12:  #correct
INSERT INTO SALARY (company, companySize, role, totalComp)
VALUES ('CUSTOM', 'CUSTOM', 'CUSTOM', 9999);

Endpoint 13:

Endpoint 14:

Endpoint 15:  #correct
SELECT * FROM REVIEWS WHERE companyName ='CUSTOM';

Endpoint 21.1: First get CompanyId using companyName, then use that CompanyId to add to JOBS along with the provided data.
SELECT CompanyId FROM COMPANYCREDENTIALS WHERE companyName = 'Blizzard';
INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
VALUES ('006','Blizzard',	'Back-End','11-02-2020','blizzardhiring.ca','N/A');

Endpoint 21.2: First get the JobId using the companyName and position, then delete the row in JOBS using the JobId
SELECT JobId FROM JOBS WHERE company ='Amazon' AND position ='Back-End';
DELETE FROM JOBS WHERE JobId=1;

Endpoint 21.3: considering that we know the JobId from before.
UPDATE JOBS
SET startdate = '09-09-2029',description='very long', link = 'newmicro.com'
WHERE company = 'Microsoft'AND JobId=7 AND position='Full-Stack';

Endpoint 22:
SELECT JobId,position,startDate,link,description
FROM JOBS
WHERE company ='Microsoft'; 

Endpoint 24:
INSERT INTO COMPANYCREDENTIALS(companyName, username, industry, size, password)
VALUES ('DoorDash','DDSH','food delivery','doordashjobs.ca','HDWO2347');
