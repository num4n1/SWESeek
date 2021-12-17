from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import yaml
import jwt, datetime

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Zeemaan1234@'
app.config['MYSQL_DB'] = 'SWESEEK'
app.config['SECRET_KEY'] = 'MySecretKey'

CORS(app)
mysql = MySQL(app)

@app.route('/api/signup', methods=['POST'])
def signup():
    print(request.json['email'])
    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    username = request.json['username']
    password = request.json['password']

    cur0 = mysql.connection.cursor()
    result = cur0.execute("Select * FROM USERCREDENTIALS")

    if (result > 0):
        userDetails = cur0.fetchall()
        for user in userDetails:
            if (user[0] == email or user[4] == username):
                print(email)
                print(user[0])
                return jsonify({'token':'failed'})

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO USERCREDENTIALS(email,firstName,lastName,phoneNumber,username,password) VALUES(%s,%s,%s,%s,%s,%s)""", (email,firstName,lastName,phoneNumber,username,password))
    mysql.connection.commit()
    cur.close()
    token=username+":"+password
    return jsonify({'token':token})


@app.route('/api/login', methods=['GET'])
def login():

    email = request.args.get('email')
    password = request.args.get('password')

    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM USERCREDENTIALS")


    if(result>0):

        userDetails = cur.fetchall()
        for user in userDetails:
            if(user[0]==email and user[5]==password):
                token = user[4] + ":" + password
                return jsonify({'token':token})

    return jsonify({'token':'failure'})


@app.route('/api/getLists', methods=['GET'])
def getLists():

    token = request.args.get('token')
    username = token.split(':')[0] # gives username

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT T.ListId, T.ListName FROM TRACKINGLIST AS T WHERE T.userName= %s""",(username,))

    if (result > 0):

        rows = cur.fetchall()

        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT M.Id,M.companyName,M.Position,M.link,M.applicationDate,M.applicationStatus,M.startDate,M.description
            FROM TRACKINGLIST AS T ,MYJOBS AS M WHERE M.ListId = T.listId and t.listId=%s""", (row[0],))
            temp["listID"] = row[0]
            temp["listName"] = row[1]


            allJob = cur1.fetchall()

            temp["jobs"]=[]

            for singleJob in allJob:

                temp["jobs"].append(
                    {"id": singleJob[0], "companyName": singleJob[1], "position": singleJob[2], "link": singleJob[3],
                     "applicationDate": singleJob[4], "applicationStatus": singleJob[5], "startDate": singleJob[6],
                     "description": singleJob[7]})


            lists.append(temp)

        return jsonify(lists)

    return jsonify({'token':'failure'})




@app.route('/api/getTrackingList', methods=['GET'])
def getTrackingList():

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username
    listName = request.args.get('listName')


    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT T.ListId, T.ListName FROM TRACKINGLIST AS T WHERE T.userName= %s AND T.ListName=%s""", (username,listName,))

    if (result > 0):

        rows = cur.fetchall()

        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT M.Id,M.companyName,M.Position,M.link,M.applicationDate,M.applicationStatus,M.startDate,M.description
                        FROM TRACKINGLIST AS T ,MYJOBS AS M WHERE M.ListId = T.listId and t.listId=%s""", (row[0],))
            temp["listID"] = row[0]
            temp["listName"] = row[1]

            allJob = cur1.fetchall()

            temp["jobs"] = []

            for singleJob in allJob:
                temp["jobs"].append(
                    {"id": singleJob[0], "companyName": singleJob[1], "position": singleJob[2], "link": singleJob[3],
                     "applicationDate": singleJob[4], "applicationStatus": singleJob[5], "startDate": singleJob[6],
                     "description": singleJob[7]})

            lists.append(temp)

        return jsonify(lists)

    return jsonify({'token': 'failure'})

@app.route('/api/putTrackingList', methods=['PUT'])
def putTrackingList():
    pass



@app.route('/api/addList', methods=['POST'])
def addList():

    token = request.json['token']
    username = token.split(':')[0]  # gives username
    listName = request.json['listName']

    cur = mysql.connection.cursor()
    cur.execute(
        """INSERT INTO TRACKINGLIST (username, listName) VALUES (%s, %s)""",
        (username, listName,))
    mysql.connection.commit()
    cur.close()

    cur1 = mysql.connection.cursor()
    result = cur1.execute(
        """SELECT listID FROM TRACKINGLIST WHERE listName = %s""",(listName,))


    if(result>0):

        answers = cur1.fetchall()
        temp={}
        for answer in answers:
            temp['listID']=answer[0]
            return jsonify(temp)

    return "failure"



@app.route('/api/addJobToTrack', methods=['POST'])
def addJobToTrack():

    token = request.json['token']
    username = token.split(':')[0]  # gives username
    companyName = request.json['companyName']
    position = request.json['position']
    startDate = request.json['startDate']
    link = request.json['link']
    description = request.json['description']
    listName = request.json['listName']
    listId = request.json['listId']
    applicationStatus = request.json['applicationStatus']
    applicationDate = request.json['applicationDate']

    cur0 = mysql.connection.cursor()
    cur0.execute("""SELECT companyId FROM COMPANYCREDENTIALS WHERE companyName = %s""", (companyName,))

    companyID = cur0.fetchall()[0][0]

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO MYJOBS(userName,ApplicationStatus,ListId,ApplicationDate,companyName,position,startDate, link,description, CompanyId) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)""",(username, applicationStatus,listId
                                                                         ,applicationDate,companyName,position,startDate,link,description, companyID))
    mysql.connection.commit()
    cur.close()

    return "success"

@app.route('/api/removeJobFromList', methods=['DELETE'])
def removeJobFromList():

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username
    listId = request.args.get('listId')
    jobId = request.args.get('jobId')

    cur = mysql.connection.cursor()
    cur.execute("""DELETE FROM TRACKINGLIST WHERE listId=%s AND myJobId=%s AND userName=%s""", (listId,jobId,username))
    mysql.connection.commit()
    cur.close()

    return "deleted sucessfully"


@app.route('/api/addJobPosting', methods=['POST'])
def addJobPosting():

    token = request.json['token']
    company = request.json['company']
    position = request.json['position']
    startDate = request.json['startDate']
    link = request.json['link']
    description = request.json['description']

    cur0 = mysql.connection.cursor()
    cur0.execute("""SELECT companyId FROM COMPANYCREDENTIALS WHERE companyName = %s""", (company,))

    companyID = cur0.fetchall()[0][0]

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO JOBS (CompanyId, company, position, StartDate, link, Description)
    VALUES (%s,%s,%s,%s,%s,%s)""",(companyID, company, position,startDate,link,description))
    mysql.connection.commit()
    cur.close()

    cur1 = mysql.connection.cursor()
    cur1.execute("""SELECT JobId FROM JOBS WHERE company = %s AND position = %s""", (company, position,))
    result = cur1.fetchall()[0][0]
    return jsonify({"jobID":result})


@app.route('/api/jobPostings', methods=['GET'])
def jobPostings():  # check again

    cur = mysql.connection.cursor()
    cur.execute("SELECT J.companyId,companyName,position,size,industry,link,description FROM JOBS AS J, COMPANYCREDENTIALS AS C WHERE J.companyId = C.companyId")
    rows = cur.fetchall()

    list=[]
    for row in rows:
        list.append({"id":row[0], "company": row[1],"position": row[2], "companySize":row[3],"industry":row[4],"link":row[5], "description":row[6]})
    return jsonify(list)


@app.route('/api/summarizedPopularSalaryInfo', methods=['GET'])
def summarizedPopularSalaryInfo():

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT company,companySize,industry
    FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId""")

    if (result > 0):

        rows = cur.fetchall()
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT role,totalComp
            FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId""")
            temp["company"] = row[0]
            temp["companySize"] = row[1]
            temp["industry"] = row[2]

            allJob = cur1.fetchall()

            temp["payInfo"] = []

            for singleJob in allJob:
                temp["payInfo"].append({"position": singleJob[0], "totalComp": singleJob[1]})

            lists.append(temp)

        return jsonify(lists)

    return jsonify({'token': 'failure'})



@app.route('/api/summerizedSalaryInfo', methods=['GET'])
def summerizedSalaryInfo():

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT company,companySize,industry
        FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId""")

    if (result > 0):

        rows = cur.fetchall()
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT role,avg(totalComp) 
            FROM SALARY AS S, COMPANYCREDENTIALS AS C 
            WHERE S.companyId = C.companyId 
            GROUP BY company; """)
            temp["company"] = row[0]
            temp["companySize"] = row[1]
            temp["industry"] = row[2]

            allJob = cur1.fetchall()

            temp["payInfo"] = []

            for singleJob in allJob:
                temp["payInfo"].append({"position": singleJob[0], "averageTotalComp": singleJob[1]})

            lists.append(temp)

        return jsonify(lists)

    return jsonify({'token': 'failure'})

@app.route('/api/addSalary', methods=['POST'])
def addSalary():  ## auto increment needs to be added

    company = request.json['company']
    companySize = request.json['companySize']
    role = request.json['role']
    totalComp = request.json['totalComp']

    cur = mysql.connection.cursor()
    cur.execute(
        """INSERT INTO SALARY (company, companySize, role, totalComp) VALUES(%s,%s,%s,%s)""",
        (company, companySize, role, totalComp))
    mysql.connection.commit()
    cur.close()

    return "success"



@app.route('/api/learningResources', methods=['GET'])
def learningResources():
    pass

@app.route('/api/exampleQuestionResources', methods=['GET'])
def exampleQuestionResources():
    pass

@app.route('/api/companyreviews', methods=['GET'])
def companyreviews():

    companyName = request.args.get('companyName')

    cur = mysql.connection.cursor()
    cur.execute("""SELECT companyName,title,review, month, day, year
            FROM REVIEWS WHERE companyName = %s""",(companyName,))

    rows = cur.fetchall()

    list = []
    for row in rows:
        list.append({"companyName": row[0], "title": row[1], "review": row[2], "month": row[3], "day": row[4],
                     "year": row[5]})
    return jsonify(list)




@app.route('/api/addUserDocument', methods=['POST'])
def addUserDocument():
    pass



@app.route('/api/getUserDocuments', methods=['GET'])
def getUserDocuments():
    pass

@app.route('/api/getUsersWhoApplied', methods=['GET'])
def getUsersWhoApplied():
    pass

@app.route('/api/apply', methods=['POST'])
def apply():
    pass

@app.route('/api/savedResources', methods=['GET'])
def savedResources():
    pass

@app.route('/api/setSavedLearningResources', methods=['PUT'])
def setSavedLearningResources():
    pass

@app.route('/api/deleteSavedResources', methods=['DELETE'])
def deleteSavedResources():
    pass

@app.route('/api/savedPracticeResources', methods=['GET'])
def savedPracticeResources():
    pass

@app.route('/api/setSavedPracticeResources', methods=['PUT'])
def setSavedPracticeResources():
    pass

@app.route('/api/deleteSavedPracticeResources', methods=['DELETE'])
def deleteSavedPracticeResources():
    pass

@app.route('/api/postJob', methods=['POST'])
def postJob():
    pass


"""

@app.route('/api/deleteJob', methods=['DELETE'])
def deleteJob():
    pass

@app.route('/api/editJob', methods=['PUT'])
def editJob():
    pass


@app.route('/api/getCompanyJobs', methods=['GET'])
def getCompanyJobs():
    pass


@app.route('/api/removeUserDocuments', methods=['DELETE'])
def removeUserDocuments():
    pass


@app.route('/api/signupcompany', methods=['POST'])
def signupcompany():
    pass

"""
if __name__ == "__main__":
    app.run(debug=True)


