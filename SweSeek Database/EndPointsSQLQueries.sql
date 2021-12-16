Endpoint 3:
SELECT U.Username,J.ListId, J.ListName,M.Serial, M.CompanyName, J.Position, J.Link, M.ApplicationDate, M.ApplicationStatus, J.StartDate, J.Description 
FROM JOBS AS J, MYJOBS AS M, USERCREDENTIALS AS U, COMPANYCREDENTIALS AS C
WHERE J.CompanyId = C.CompanyId AND M.CompanyId = C.CompanyId AND U.UserName = M.userName;

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
