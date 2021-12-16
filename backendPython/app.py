from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Zeemaan1234@'
app.config['MYSQL_DB'] = 'flaskapp'

mysql = MySQL(app)

"""
@app.route('/', methods=['GET','POST'])
def index():
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO users(name, email) VALUES(%s,%s)", (name,email))
    mysql.connection.commit()
    cur.close()
    return 'success'

@app.route('/users')
def users():
    cur = mysql.connection.cursor()
    result = cur.execute("Select * FROM users")
    if result>0:
        userDetails = cur.fetchall()

        temp={}
        i=0
        for user in userDetails:
            temp[i] = user
            i+=1

        return temp


for i in range(2):
    name = "name "+str(i+2)
    email = "email"+" "+str(i+2)

"""
@app.route('/api/signup', methods=['POST'])
def signup():

    email = request.json['email']
    firstName = request.json['firstName']
    lastName = request.json['lastName']
    phoneNumber = request.json['phoneNumber']
    username = request.json['username']
    password = request.json['password']
    cur = mysql.connection.cursor()
    cur.execute("""INSERT INTO accounts(email,firstName,lastName,phoneNumber,username,password) VALUES(%s,%s,%s,%s,%s,%s)""", (email,firstName,lastName,phoneNumber,username,password))
    mysql.connection.commit()
    cur.close()
    return jsonify({'token':'success'})

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
                
                return jsonify({'token':'success'})
            
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




if __name__ == "__main__":
    app.run(debug=True)


