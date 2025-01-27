from imageclassifier import img
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import database as db


app = Flask(__name__)
# cors = CORS(app, resources={r"/*": {"origins": "*"}})

# @app.route("/api/v1/users")
# def list_users():
#   return "user example"

app = Flask(__name__)
api = Api(app)

print(dir(api))

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  return response

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        print("Got Detect Request")
        print(request.files['file1'])
        print("Hello World")
        request.files['file1'].save('input.jpg')
        c,perc=img('input.jpg')
        print(dir(request.files['file1']))
        classname='Non Covid'
        if c==1:
            classname='Covid'

        return {'class':classname, "perc":perc}

class AddDoctor(Resource):

    def post(self):
        print("hello")
        print('request',request)
        print('formdata',request.form)
        user=request.form['username']
        passw=request.form['password']
        name=request.form['dname']
        email=request.form['email']
        dob=request.form['dob']
        gen=request.form['gender']
        mob=request.form['mobile']
        ques1=request.form['q1']
        ans1=request.form['answer1']
        ques2=request.form['q2']
        ans2=request.form['answer2']        
        status=db.add_doctor(user,passw,name,email,dob,gen,mob,ques1,ans1,ques2,ans2)
        print('status',status)
        return {"status":status}


class LoginDoctor(Resource):

    def post(self):
        print("Login Doctor")
        print('request',request)
        print('formdata',request.form)
        user=request.form['username']
        passw=request.form['password']

        doctor=db.get_doctor(user,passw)
        if doctor['found']:
            doctor.update( {"status":True})
            return doctor

        else:
            return {"status":False}

class GetSecurityQuestions(Resource):

    def post(self):
        user=request.form['username']

        questions=db.get_security_questions(user)
        if questions['found']:
            questions.update( {"status":True})
            return questions

        else:
            return {"status":False}

class UpdatePassword(Resource):
    def post(self):
        username=request.form["username"]
        answer1=request.form["answer1"]
        answer2=request.form["answer2"]
        password=request.form["password"]

        if(db.update_password(username,answer1,answer2,password)):
            return {"status":True}
        else:
            return {"status":False}
'''
class AddPatient(Resource):
    def post(self):
        pname=request.form['pname']
        pmob=request.form['mobile']
        pgen=request.form['gender']
        pdob=request.form['dob']
        db.add_patient(pname,pmob,pgen,pdob)
        return {"status":True}

class GetPatient(Resource):
    def get(self):
        print('Get Patient')
        patientid=request.args['patientid']
        print('patientid'+str(patientid))
        results=db.get_patient(patientid)

        for r in results:
            r.append(db.get_patient_history(patientid))

        print(results)

        return results
'''
api.add_resource(HelloWorld, '/detect')
api.add_resource(AddDoctor, '/adddoctor')
api.add_resource(LoginDoctor, '/logindoctor')
api.add_resource(GetSecurityQuestions, '/getsecurityquestions')
api.add_resource(UpdatePassword, '/updatepassword')
# api.add_resource(AddPatient,'/addpatient')
# api.add_resource(GetPatient,'/getpatient')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
