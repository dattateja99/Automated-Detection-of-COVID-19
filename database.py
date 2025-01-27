import pymysql
host = 'localhost'
user = 'root'
password = 'system'
database = 'covid'


def get_connection():
 conn = pymysql.connect(host=host,
       user=user,
       password=password,
       database=database)
 return conn


def add_doctor(user, password, name, email, dob, gender, mob, q1, answer1, q2, answer2):

    status=False

    conn=get_connection()
    c=conn.cursor()
    try:
        c.execute("insert into doctor (username,password,dname,email,dob,gender,mobile,q1,answer1,q2,answer2) values (%s,password(%s),%s,%s,%s,%s,%s,%s,%s,%s,%s)",(user,password,name,email,dob,gender,mob,q1,answer1,q2,answer2))
        conn.commit()
        status=True
    except:
        status=False
    conn.close()
    return status

# def add_patient(pname,pmob,pgender,pdob):
#     conn=get_connection()
#     c=conn.cursor()
#     c.execute("insert into patient (pname,mob,gender,dob) values (%s,%s,%s,%s)",(pname,pmob,pgender,pdob))
#     conn.commit()
#     conn.close()

# def get_patient(patientid:int):
#     conn=get_connection()
#     c=conn.cursor()
#     c.execute("select * from patient where patientid="+str(patientid))
#     results=c.fetchall()
#     conn.close()

#     results=[list(r) for r in results]
#     for r in results:
#       r[4]=r[4].strftime("%Y-%m-%d")

#     return results

def get_doctor(username, password):
    conn=get_connection()
    c=conn.cursor()
    print("Cursor",c)
    c.execute("select * from doctor where username=%s and password=password(%s)",(username,password))
    results=c.fetchall()
    conn.close()

    if results is None or len(results)==0:
        return {"found":False}

    doctor={}
    doctor['dname']=results[0][3]
    doctor['dob']=results[0][5].strftime("%Y-%m-%d")
    doctor['mobile']=results[0][7]
    doctor['found']=True

    return doctor

def get_patient_history(patientid:int):
    conn=get_connection()
    c=conn.cursor()
    c.execute("select * from pat_history where patid="+str(patientid))
    results=c.fetchall()
    conn.close()

    results=[list(r) for r in results]
    for r in results:
      r[3]=r[3].strftime("%Y-%m-%d")

    return results

def show_patient():
    conn=get_connection()
    c=conn.cursor()
    c.execute("select * from patient")
    conn.commit()
    conn.close()

def get_security_questions(username):
    conn=get_connection()
    c=conn.cursor()
    c.execute("select q1,q2 from doctor where username=%s",(username))
    results=c.fetchall()
    c.close()
    conn.close();

    if results is None or len(results)==0:
        return {"found":False}

    questions={}
    questions['q1']=results[0][0]
    questions['q2']=results[0][1]
    questions['found']=True

    return questions

def update_password(username, answer1, answer2, password):
    conn=get_connection()
    c=conn.cursor()
    rows=c.execute("update doctor set password=password(%s) where username=%s and answer1=%s and answer2=%s",(password,username,answer1,answer2))
    c.close()
    conn.commit()
    conn.close()
    return rows>0

# def get_doctor(username,passw):
#     conn=get_connection()
#     c=conn.cursor
#     c.execute("select doctorID,dname from doctor where username="+str(username)+" and password= "+str(password(passw)))
#     results=c.fetchall()
#     results=[list(r) for r in results]
#     conn.commit()
#     conn.close()