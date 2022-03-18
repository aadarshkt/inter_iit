# Index of contents

1. [Web Application Deployment Instructions](#code-deployment-for-web-application)
2. [Instruction to use web application](#instruction-to-use-web-application)
3. [File structure for web application](#file-structure-for-web-application)
4. [Desktop Application Deployment Instructions](#code-deployment-for-desktop-application)

# Specifications for code deployment

1. Node.js version >= 16.3.2
2. Terminal -> Git bash
3. Code editor -> VS code
4. Python version >= 3.9.10


# Code Deployment for web application

1. In the terminal clone the project.
 ```  
git clone https://github.com/aadarsh-kt/inter_iit.git  
``` 
2. Navigate to client folder.
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
6. In another terminal navigate to web_application -> server
```
cd web_application
cd server
```
7. Install the required python packages.
```
pip install -r requirements.txt
```
8. Create a virtual environment for flask server.
```
source server/Scripts/activate
```
9. To run the server.
```
$ cd server
$ export FLASK_ENV=development
$ flask run
```

# Instruction to use web application

1. On the home page click Input data button to open sidebar.

![Home](https://user-images.githubusercontent.com/72285744/158997361-e8454837-2044-4e1e-b565-7da0c5f39f2c.PNG)

2. In the Upload file section and upload a file in .lc format. Ensure that lc file has two columns labelled TIME and RATE.

![Upload](https://user-images.githubusercontent.com/72285744/158997991-453d4984-2606-4b77-af4a-4aed216baa35.PNG)

3. Click on the submit button to get results.
4. Loading of chart usually takes 30 seconds.
5. Results appear as below.

![Results](https://user-images.githubusercontent.com/72285744/158998671-f3dac57c-6097-4bc1-9a22-63094c98cf2e.PNG)

6. Click on the top arrow to enlarge the chart.
7. Chart has two options raw and convolved. Buttons are disabled in raw option.
8. Chart can be zoomed in, zoomed out and reset with button on the below-right.

![Zoom](https://user-images.githubusercontent.com/72285744/159000145-fef799ab-8335-437b-83a2-1b66c7ae729b.PNG)

9. In convolved section click on the toggle peak curve button to show peaks. Click on the toggle peak button again to remove peaks.

![Peak](https://user-images.githubusercontent.com/72285744/159000650-a9d29462-9501-4834-8ff6-47efe4b66c10.PNG)

10. Click on the toggle fit curve buttons to show fit curve. To remove fit curve click the button again.

![Fit](https://user-images.githubusercontent.com/72285744/159001831-1b65f01a-0e4f-401e-93b4-54ac6857a96d.PNG)

11. On the right, click on the arrow to show table.

![table](https://user-images.githubusercontent.com/72285744/159002538-7e4dd6d4-cba1-4d77-b24e-9abf6e693dbf.PNG)

12. Table is visible which shows category of solar bursts, decay time, rise time, peak flux, peak time, start time, end time. Table could be scrolled horizontally to see other parameters.

![Table Parameters](https://user-images.githubusercontent.com/72285744/159014271-56125d6c-d432-4fac-9ae7-e7a6ea93b106.PNG)

# File structure for web application

.
 * [client](./client)
 * [server](./dir2)
   * [file21.ext](./dir2/file21.ext)
   * [file22.ext](./dir2/file22.ext)
   * [file23.ext](./dir2/file23.ext)
 * [dir1](./dir1)
   * [file11.ext](./dir1/file11.ext)
   * [file12.ext](./dir1/file12.ext)
 * [file_in_root.ext](./file_in_root.ext)
 * [README.md](./README.md)
 * [dir3](./dir3)

# Code Deployment for desktop application

1. 
