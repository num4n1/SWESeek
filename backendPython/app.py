from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Zeemaan1234@'
app.config['MYSQL_DB'] = 'flaskapp'

mysql = MySQL(app)

@app.route('/api/signup', methods=['POST'])
def signup():

    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    username = request.json['username']
    password = request.json['password']

    cur0 = mysql.connection.cursor()
    result = cur0.execute("Select * FROM accounts")

    if (result > 0):
        userDetails = cur0.fetchall()
        for user in userDetails:
            if (user[0] == email or user[4] == username):
                return jsonify({'token':'failed'})

    mysql.connection.commit()
    cur0.close()

    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO accounts(email,firstName,lastName,phoneNumber,username,password) VALUES(%s,%s,%s,%s,%s,%s)""", (email,firstName,lastName,phoneNumber,username,password))
    mysql.connection.commit()
    cur.close()
    token=username+":"+password
    return jsonify({'token':token})

@app.route('/api/login', methods=['GET'])
def login():

    email = request.args.get('email')
    password = request.args.get('password')
    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM accounts")

    if(result>0):
        userDetails = cur.fetchall()
        for user in userDetails:
            if(user[0]==email and user[5]==password):
                token = user[4] + ":" + password
                return jsonify({'token':token})

    return jsonify({'token':'failure'})

@app.route('/api/getLists', methods=['GET'])
def getLists():  ## numan's table is wrong

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
            cur1.execute("""SELECT t.listId,M.CompanyName,M.Position,J.link,M.applicationDate,M.applicationStatus,J.startDate,J.description
            FROM TRACKINGLIST AS T ,MYJOBS AS M, JOBS AS J WHERE J.JobId = M.Id AND T.myJobId = M.Id AND T.listId= %s""", (row[0],))
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
    pass

@app.route('/api/putTrackingList', methods=['PUT'])
def putTrackingList():
    pass

@app.route('/api/addList', methods=['POST'])
def addList():
    pass

@app.route('/api/addJobToTrack', methods=['POST'])
def addJobToTrack():
    pass

@app.route('/api/removeJobFromList', methods=['DELETE'])
def removeJobFromList():
    pass

@app.route('/api/jobPostings', methods=['GET'])
def jobPostings():
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
def addSalary():
    pass

@app.route('/api/learningResources', methods=['GET'])
def learningResources():
    pass

@app.route('/api/exampleQuestionResources', methods=['GET'])
def exampleQuestionResources():
    pass

@app.route('/api/companyreviews', methods=['GET'])
def companyreviews():
    pass

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

if __name__ == "__main__":
    app.run(debug=True)


