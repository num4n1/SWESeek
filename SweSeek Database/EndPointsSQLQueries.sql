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
INSERT INTO TRACKINGLIST (username, listName)
VALUES('num4n','Machine Learning');

SELECT companyId FROM COMPANYCREDENTIALS WHERE companyName='IBM';

INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
VALUES('003','IBM','Back-End','01-01-2021','ibmrecruitment.ca','N/A');

SELECT JobId FROM JOBS WHERE CompanyId='003' AND position='Back-End';
SELECT ListId FROM TRACKINGLIST WHERE Username='num4n' AND listName='Machine Learning';

INSERT INTO MYJOBS (JobId,userName,ApplicationStatus,ListId,ApplicationDate,CompanyId)
VALUES('9','num4n','Offer Recieved',5,'09-09-2021','003');

Endpoint 7: #corrected
DELETE FROM TRACKINGLIST WHERE listId=%s AND myJobId=%s AND userName=%s

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
