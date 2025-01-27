import pymysql
conn=pymysql.connect(host='localhost',
                             user='root',
                             password='system',
                             database='covid',)
c=conn.cursor()
task=1
while(task!=0):
    print ("==============================================")
    print ("0. Exit")
    print ("1. Insert Data")
    print ("2. Show Data")
    print ("3. Delete Data")
    print ("4. Update Data")
    print ("==============================================")
    task=int(input("Enter your choice : "))
    print ("==============================================")
    if(task==1):
        # Insert Data Into table
        user=input("Enter user name :")
        password=input("Enter password :")
        name=input("Enter name :")
        qual=input("Enter qual :")
        email=input("Enter mail :")
        dob=input("Enter DOB : ")
        gender = input("Enter Gender :")
        mob=input("Enter Mobile :")
        c.execute("insert into doctor (username,password,dname,qualification,email,dob,gender,mobile) values (%s,%s,%s,%s,%s,%s,%s,%s)",(user,password,name,qual,email,dob,gender,mob))
        conn.commit()
        # Select Data from Table
        print ("===========After Inserting data records are===========")
        c.execute("select * from doctor")
        rows=c.fetchall()
        for row in rows:
            print (row)
        print ("==============================================")
    elif(task==2):
        # Select Data from Table
        print ("===========All Data from table=================")
        c.execute("select * from doctor")
        rows=c.fetchall()
        for row in rows:
            print (row)
        print ("==============================================")
    elif(task==3):
        # Select Data from Table
        c.execute("select * from doctor")
        rows=c.fetchall()
        for row in rows:
            print (row)
        # Delete Data
        print ("======Check The data you want to delete===========")
        dno=input("Enter id you want to delete :")
        c.execute("delete from doctor where doctorID='%s'",(dno))
        conn.commit()
        # Select Data from Table
        c.execute("select * from doctor")
        rows=c.fetchall()
        for row in rows:
            print (row)
        print ("=========After deleted Data=====================")
    elif(task==4):
        # Select Data from Table
        c.execute("select * from doctor")
        rows=c.fetchall()
        for row in rows:
            print (row)
        print ("=======Check The data you want to update=========")
    elif(task>4):
        print ("Your choice is wrong!! Please Enter right choice")
        print ("")
    elif(task<0):
        print ("Your choice is wrong!! Please Enter right choice")
        print ("")
conn.commit()
conn.close()
print ("You have exit the program!!!!")
print ("")