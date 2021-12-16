Endpoint 3:
SELECT T.ListId, T.ListName
FROM TRACKINGLIST AS T
WHERE T.userName='CUSTOM'; 

SELECT M.Position,M.CompanyName
FROM TRACKINGLIST AS T ,MYJOBS AS M
WHERE T.listId='CUSTOM'; 

Endpoint 4:
SELECT Serial,companyName,position,link,applicationDate,applicationStatus,startDate,description FROM TRACKINGLIST;

Endpoint 4.1:
UPDATE TRACKINGLIST AS T, MYJOBS AS M
SET applicationStatus = 'Offer Recieved'
WHERE listName = 'N/A'AND listId='N/A'AND T.Id =3 AND T.Id=M.Id; 

Endpoint 7:
DELETE FROM TRACKINGLIST WHERE listId='N/A' AND Id=2;

Endpoint 9:
SELECT J.companyId,position,size,industry,link,description FROM JOBS AS J, COMPANYCREDENTIALS AS C WHERE J.companyId = C.companyId;

Endpoint 10:
SELECT company,companySize,industry,role,totalComp FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId;

Endpoint 11:
SELECT company,companySize,industry,role,avg(totalComp) FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId GROUP BY company; 

Endpoint 12:
INSERT INTO SALARY (company, companySize, role, totalComp)
VALUES ('CUSTOM', 'CUSTOM', 'CUSTOM', 9999);

Endpoint 13:

Endpoint 14:

Endpoint 15:
SELECT * FROM REVIEWS;
