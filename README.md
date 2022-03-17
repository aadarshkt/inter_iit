# Specifications for code deployment

1. Node.js version -> 16.3.2
2. Terminal -> Git bash
3. Code editor -> VS code
4. Python version -> 3.9.10


# Code Deployment for web application

1. In the terminal clone the project using the below command 
 ```  
git clone https://github.com/aadarsh-kt/inter_iit.git  
``` 
2. Navigate to client folder
 ```
 cd web_application
 cd client
 ```
3. Install node modules.
``` 
npm install
```
4. Start local development server
```
npm start
```
5. New tab in browser will open.
6. In another terminal navigate to web_application.
```
cd web_application
```
7. Create a virtual environment for flask server.
```
source server/Scripts/activate
```
8. Flask server gets started.
9. To run the server.
```
$ cd server
$ export FLASK_ENV=development
$ flask run
```

# Instruction to use web application

1. On the home page click Input data button to open sidebar.
2. Go to Upload file section and upload a file .lc format.
3. Click on the submit button to get results.

# Code Deployment for desktop application

1. 
