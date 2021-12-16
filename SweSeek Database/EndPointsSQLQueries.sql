Endpoint 3:
SELECT U.Username,J.ListId, J.ListName,M.Serial, M.CompanyName, J.Position, J.Link, M.ApplicationDate, M.ApplicationStatus, J.StartDate, J.Description 
FROM JOBS AS J, MYJOBS AS M, USERCREDENTIALS AS U, COMPANYCREDENTIALS AS C
WHERE J.CompanyId = C.CompanyId AND M.CompanyId = C.CompanyId AND U.UserName = M.userName;

Endpoint 4:
SELECT Serial,companyName,position,link,applicationDate,applicationStatus,startDate,description FROM TRACKINGLIST;

Endpoint 4.1:
UPDATE TRACKINGLIST
SET applicationStatus = 'Offer Recieved'
WHERE listName = 'N/A'AND listId='N/A'AND serial =3; 
