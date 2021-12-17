from flask import Flask, request, jsonify, make_response
from flask_mysqldb import MySQL
from flask_cors import CORS
import yaml
import jwt, datetime

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Whicket1'
app.config['MYSQL_DB'] = 'sweseek'
app.config['SECRET_KEY'] = 'MySecretKey'

CORS(app)
mysql = MySQL(app)

@app.errorhandler(404)
def handle_404_error(_error):
    return make_response(jsonify({'error': 'Not Found!'}), 404)

@app.errorhandler(500)
def handle_404_error(_error):
    return make_response(jsonify({'error': 'Internal Server Error Occured'}), 500)

@app.route('/api/signup', methods=['POST'])
def signup(): # correct

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
                return jsonify({'error':'user already exists.'}), 500

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO USERCREDENTIALS(email,firstName,lastName,phoneNumber,username,password) VALUES(%s,%s,%s,%s,%s,%s)""", (email,firstName,lastName,phoneNumber,username,password))
    mysql.connection.commit()
    cur.close()
    token=username+":"+password
    return jsonify({'token':token}), 201


@app.route('/api/login', methods=['GET'])
def login(): #correct

    email = request.args.get('email')
    password = request.args.get('password')

    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM USERCREDENTIALS")

    if(result>0):

        userDetails = cur.fetchall()
        for user in userDetails:
            if(user[0]==email and user[5]==password):
                token = user[4] + ":" + password
                return jsonify({'token':token}), 200

    return jsonify({'error':'No valid account found!'}), 401



@app.route('/api/getLists', methods=['GET'])
def getLists(): # correct

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

        return jsonify(lists), 200

    return jsonify({'Error':'No lists available'}), 500



@app.route('/api/getTrackingList', methods=['GET'])
def getTrackingList(): #correct

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

        return jsonify(lists), 200

    return jsonify({'Error':'No lists available'}), 500


@app.route('/api/putTrackingList', methods=['PUT'])
def putTrackingList():  # jobId is Id of MyJob Table

    token = request.json['token']
    username = token.split(':')[0]  # gives username
    listName = request.json['listName']
    listId = request.json['listId']
    jobId = request.json['jobId']
    applicationStatus = request.json['applicationStatus']

    cur = mysql.connection.cursor()
    cur.execute(
        """UPDATE TRACKINGLIST AS T, MYJOBS AS M
        SET applicationStatus = %s
        WHERE listName = %s AND T.listId= %s AND M.Id =%s AND T.listId=M.ListId AND M.userName = %s""",
        (applicationStatus,listName,listId,jobId,username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200





@app.route('/api/addList', methods=['POST'])
def addList(): #correct

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
            return jsonify(temp), 200

    return jsonify({'Message':'No suitable listID found'}), 500


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

    return jsonify({'Status':'Request Successful'}), 200



@app.route('/api/removeJobFromList', methods=['DELETE'])
def removeJobFromList(): # correct

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username
    listId = request.args.get('listId')

    cur = mysql.connection.cursor()
    cur.execute("""DELETE FROM MYJOBS WHERE listId=%s AND userName=%s""", (listId,username))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/addJobPosting', methods=['POST'])
def addJobPosting(): # correct

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
    
    return jsonify({"jobID":result}), 200


@app.route('/api/jobPostings', methods=['GET'])
def jobPostings():  #  correct

    cur = mysql.connection.cursor()
    cur.execute("SELECT J.companyId,companyName,position,size,industry,link,description FROM JOBS AS J, COMPANYCREDENTIALS AS C WHERE J.companyId = C.companyId")
    rows = cur.fetchall()

    list=[]
    for row in rows:
        list.append({"id":row[0], "company": row[1],"position": row[2], "companySize":row[3],"industry":row[4],"link":row[5], "description":row[6]})
    return jsonify(list), 200


@app.route('/api/summarizedPopularSalaryInfo', methods=['GET'])
def summarizedPopularSalaryInfo(): #  correct

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT company,companySize,industry
    FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId""")

    if (result > 0):

        temp = cur.fetchall()
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT role,totalComp
            FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId AND C.companyName = %s""",(row[0],))
            temp["company"] = row[0]
            temp["companySize"] = row[1]
            temp["industry"] = row[2]

            allJob = cur1.fetchall()

            temp["payInfo"] = []

            for singleJob in allJob:
                temp["payInfo"].append({"position": singleJob[0], "totalComp": singleJob[1]})

            lists.append(temp)

        return jsonify(lists), 200

    return jsonify({'Message':'No suitable records found'}), 500



@app.route('/api/summerizedSalaryInfo', methods=['GET'])
def summerizedSalaryInfo(): #  correct

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT company,companySize,industry
        FROM SALARY AS S, COMPANYCREDENTIALS AS C WHERE S.companyId = C.companyId """)

    if (result > 0):

        temp = cur.fetchall()
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT role,avg(totalComp) 
            FROM SALARY AS S, COMPANYCREDENTIALS AS C 
            WHERE S.companyId = C.companyId AND C.companyName = %s
            GROUP BY role; """,(row[0],))
            temp["company"] = row[0]
            temp["companySize"] = row[1]
            temp["industry"] = row[2]

            allJob = cur1.fetchall()

            temp["payInfo"] = []

            for singleJob in allJob:
                temp["payInfo"].append({"position": singleJob[0], "averageTotalComp": singleJob[1]})

            lists.append(temp)

        return jsonify(lists), 200

    return jsonify({'Message':'No suitable records found'}), 500

@app.route('/api/addSalary', methods=['POST'])
def addSalary():  ## correct

    company = request.json['company']
    companySize = request.json['companySize']
    role = request.json['role']
    totalComp = request.json['totalComp']

    cur0 = mysql.connection.cursor()
    cur0.execute("""SELECT companyId FROM COMPANYCREDENTIALS WHERE companyName = %s""", (company,))

    companyId = cur0.fetchall()[0][0]

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute(
        """INSERT INTO SALARY (company, companySize, role, totalComp, companyId) VALUES(%s,%s,%s,%s,%s)""",
        (company, companySize, role, totalComp, companyId))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/learningResources', methods=['GET'])
def learningResources(): #correct

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT tags,topic,link FROM LEARNINGRESOURCES""")

    if (result > 0):

        temp = cur.fetchall()
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT tags,value FROM RESOURCESTAG WHERE tags = %s""",(row[0],))

            temp["tags"] = []
            temp["topic"] = row[1]
            temp["link"] = row[2]

            all_tags = cur1.fetchall()

            for singleTag in all_tags:
                temp["tags"].append(singleTag[1])

            lists.append(temp)

        return jsonify(lists), 200

    return jsonify({'Message':'No suitable record found'}), 500


@app.route('/api/exampleQuestionResources', methods=['GET'])
def exampleQuestionResources():

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT M.id,Q.tags,Q.qPrompt,Q.questionNum,Q.link,Q.description
        FROM MYQUESTIONRESOURCES AS M, QUESTIONRESOURCES AS Q
        WHERE M.id = Q.Id""")

    if (result > 0):

        temp = cur.fetchall()
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT tags,value FROM QUESTIONTAGS WHERE tags = %s""", (row[1],))

            temp["tags"] = []
            temp["id"] = row[0]
            temp["qPrompt"] = row[2]
            temp["questionNum"] = row[3]
            temp["solutionVideo"] = {"link": row[4], "description": row[5]}

            all_tags = cur1.fetchall()

            for singleTag in all_tags:
                temp["tags"].append(singleTag[1])

            lists.append(temp)

        return jsonify(lists)

    return jsonify({'Message': 'No suitable record found'}), 500

@app.route('/api/companyreviews', methods=['GET'])
def companyreviews(): #correct

    companyName = request.args.get('companyName')

    cur = mysql.connection.cursor()
    cur.execute("""SELECT companyName,title,review, month, day, year
            FROM REVIEWS WHERE companyName = %s""",(companyName,))

    rows = cur.fetchall()

    list = []
    for row in rows:
        list.append({"companyName": row[0], "title": row[1], "review": row[2], "month": row[3], "day": row[4],
                     "year": row[5]})
    return jsonify(list), 200


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
def savedResources(): #correct

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT M.username,L.tags,L.topic,L.link
    FROM LEARNINGRESOURCES AS L, MYLEARNINGRESOURCES AS M
    WHERE M.learningId = L.Id AND M.username =%s""", (username,))

    if (result > 0):

        temp = cur.fetchall()
        print(temp)
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT tags,value FROM RESOURCESTAG WHERE tags = %s""", (row[1],))

            temp["tags"] = []
            temp["topic"] = row[2]
            temp["link"] = row[3]

            all_tags = cur1.fetchall()

            for singleTag in all_tags:
                temp["tags"].append(singleTag[1])

            lists.append(temp)

        return jsonify(lists), 200

    return jsonify({'Message': 'No suitable record found'}), 500


@app.route('/api/setSavedLearningResources', methods=['POST'])
def setSavedLearningResources():

    token = request.json['token']
    username = token.split(':')[0]  # gives username
    id = request.json['id']

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO MYLEARNINGRESOURCES (username, learningId) VALUES (%s,%s)""", (username, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/deleteSavedResources', methods=['DELETE'])
def deleteSavedResources():

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username
    id = request.args.get('id')

    cur = mysql.connection.cursor()
    cur.execute("""DELETE FROM MYLEARNINGRESOURCES WHERE username =%s AND learningId =%s""", (username, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/savedPracticeResources', methods=['GET'])
def savedPracticeResources():

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT M.id,Q.tags,Q.qPrompt,Q.questionNum,Q.link,Q.description
    FROM MYQUESTIONRESOURCES AS M, QUESTIONRESOURCES AS Q
    WHERE username = %s AND M.id = Q.Id;""", (username,))

    if (result > 0):

        temp = cur.fetchall()
        rows = [t for t in (set(tuple(i) for i in temp))]
        lists = []

        for row in rows:

            temp = {}
            cur1 = mysql.connection.cursor()
            cur1.execute("""SELECT tags,value FROM QUESTIONTAGS WHERE tags = %s""", (row[1],))

            temp["tags"] = []
            temp["id"] = row[0]
            temp["qPrompt"] = row[2]
            temp["questionNum"] = row[3]
            temp["solutionVideo"] = {"link": row[4], "description": row[5]}


            all_tags = cur1.fetchall()

            for singleTag in all_tags:
                temp["tags"].append(singleTag[1])

            lists.append(temp)

        return jsonify(lists)

    return jsonify({'Message':'No suitable record found'}), 500




@app.route('/api/setSavedPracticeResources', methods=['PUT'])
def setSavedPracticeResources():

    token = request.json['token']
    username = token.split(':')[0]  # gives username
    id = request.json['id']

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO MYQUESTIONRESOURCES (username, id) VALUES (%s,%s)""", (username, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/deleteSavedPracticeResources', methods=['DELETE'])
def deleteSavedPracticeResources():

    token = request.args.get('token')
    username = token.split(':')[0]  # gives username
    id = request.args.get('id')

    cur = mysql.connection.cursor()
    cur.execute("""DELETE FROM MYQUESTIONRESOURCES WHERE username =%s AND id =%s""", (username, id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


@app.route('/api/deleteJob', methods=['DELETE'])
def deleteJob(): #correct

    companyName = request.args.get('companyName')
    position = request.args.get('position')

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT JobId FROM JOBS WHERE company =%s AND position =%s""",(companyName,position))

    if(result>0):

        jobID = cur.fetchall()[0][0]
        print(jobID)
        cur1 = mysql.connection.cursor()
        cur1.execute("""DELETE FROM JOBS WHERE JobId=%s""", (jobID,))
        mysql.connection.commit()
        cur1.close()
        return jsonify({'Status':'Request Successful'}), 200

    return jsonify({'Message':'No suitable record found'}), 500

@app.route('/api/editJob', methods=['PUT'])
def editJob():

    companyName = request.json['companyName']
    JobID = request.json['JobID']
    startdate = request.json['startdate']
    position = request.json['position']
    description = request.json['description']
    jobURL = request.json['jobURL']

    cur = mysql.connection.cursor()
    cur.execute("""UPDATE JOBS
    SET startdate = %s ,description= %s, link = %s
    WHERE company = %s AND JobId= %s AND position= %s """, (startdate, description, jobURL, companyName, JobID, position))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status': 'Request Successful'}), 200


@app.route('/api/getCompanyJobs', methods=['GET'])
def getCompanyJobs(): #correct

    companyName = request.args.get('token')

    cur = mysql.connection.cursor()
    result = cur.execute("""SELECT JobId,position,startDate,link,description
    FROM JOBS WHERE company =%s""",(companyName,))

    if (result > 0):

        rows = cur.fetchall()
        lists = []

        for row in rows:
           lists.append({"JobID": row[0],
                        "position": row[1],
                        "startDate": row[2],
                        "link" : row[3],
                        "description": row[4]})

        return jsonify(lists), 200

    return jsonify({'Message':'No suitable record found'}), 500



@app.route('/api/removeUserDocuments', methods=['DELETE'])
def removeUserDocuments():

    pass


@app.route('/api/signupcompany', methods=['POST'])
def signupcompany(): #correct

    companyName = request.json['companyName']
    username = request.json['username']
    industry = request.json['industry']
    size = request.json['size']
    password = request.json['password']

    cur = mysql.connection.cursor()
    cur.execute(
        """INSERT INTO COMPANYCREDENTIALS(companyName, username, industry, size, password) VALUES(%s,%s,%s,%s,%s)""",
        (companyName, username, industry, size,password))
    mysql.connection.commit()
    cur.close()

    return jsonify({'Status':'Request Successful'}), 200


if __name__ == "__main__":
    app.run(debug=True)
