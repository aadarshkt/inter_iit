# Specifications for code deployment

1. Node.js version >= 16.3.2
2. Terminal -> Git bash
3. Code editor -> VS code
4. Python version >= 3.9.10


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

![Home](https://user-images.githubusercontent.com/72285744/158997361-e8454837-2044-4e1e-b565-7da0c5f39f2c.PNG)

2. In the Upload file section and upload a file .lc format.Ensure that .....

![Upload](https://user-images.githubusercontent.com/72285744/158997991-453d4984-2606-4b77-af4a-4aed216baa35.PNG)

3. Click on the submit button to get results.
4. Loading of chart usually takes 30 seconds.

![Results](https://user-images.githubusercontent.com/72285744/158998671-f3dac57c-6097-4bc1-9a22-63094c98cf2e.PNG)

5. Click on the top arrow to enlarge the chart.
6. Chart has two options raw and convolved. Buttons are disabled in raw option.
7. Chart can be zoomed in, zoomed out and reset with button on the below-right.

![Zoom](https://user-images.githubusercontent.com/72285744/159000145-fef799ab-8335-437b-83a2-1b66c7ae729b.PNG)

8. In convolved section click on the toggle peak curve button to show peaks. Click on the toggle peak curve to remove fit curve.

![Peak](https://user-images.githubusercontent.com/72285744/159000650-a9d29462-9501-4834-8ff6-47efe4b66c10.PNG)

9. Click on the toggle fit curve buttons to show fit curve.

![Fit](https://user-images.githubusercontent.com/72285744/159001831-1b65f01a-0e4f-401e-93b4-54ac6857a96d.PNG)

10. On the right click on the arrow to show table.

![table](https://user-images.githubusercontent.com/72285744/159002538-7e4dd6d4-cba1-4d77-b24e-9abf6e693dbf.PNG)

# Code Deployment for desktop application

1. 
