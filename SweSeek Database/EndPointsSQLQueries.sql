Endpoint 3: #wrong
SELECT T.ListId, T.ListName
FROM TRACKINGLIST AS T
WHERE T.userName='CUSTOM'; 

SELECT M.listId,J.company,J.Position,J.link,M.applicationDate,M.applicationStatus,J.startDate,J.description
FROM TRACKINGLIST AS T ,MYJOBS AS M, JOBS AS J
WHERE T.listId=CUSTOM AND J.JobId = M.JobId AND M.ListId = T.listId; 

Endpoint 4: #wrong
SELECT Serial,companyName,position,link,applicationDate,applicationStatus,startDate,description FROM TRACKINGLIST;

Endpoint 4.1: 
UPDATE TRACKINGLIST AS T, MYJOBS AS M
SET applicationStatus = 'Offer Recieved'
WHERE listName = 'N/A'AND listId='N/A'AND T.Id =3 AND T.Id=M.Id; 

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
