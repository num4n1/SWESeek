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
def getLists():
    pass

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

@app.route('/api/addJobPosting', methods=['POST'])
def addJobPosting():
    pass

@app.route('/api/jobPostings', methods=['GET'])
def jobPostings():
    pass

@app.route('/api/summarizedPopularSalaryInfo', methods=['POST'])
def summarizedPopularSalaryInfo():
    pass

@app.route('/api/summerizedSalaryInfo', methods=['GET'])
def summerizedSalaryInfo():
    pass

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


