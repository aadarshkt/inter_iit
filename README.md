# Index of contents

1. [Code deployment instructions for web application](#code-deployment-for-web-application)
2. [Instruction to use web application](#instruction-to-use-web-application)
3. [File structure explanation for web application](#file-structure-for-web-application)
4. [Code deployment instructions for desktop application](#code-deployment-for-desktop-application)
5. [ML-model explanation](#code-explantion-for-ml-model)

# Specifications for code deployment

1. Node.js version >= 16.3.2
2. Terminal -> Git bash
3. Code editor -> VS code
4. Python version >= 3.9.10


# Code Deployment for web application

1. Check version of Node.
```
node -v
```
2. If Node is not available download it for here https://nodejs.org/en/download/ for linux.
3. In the terminal clone the project.
 ```  
git clone https://github.com/aadarsh-kt/inter_iit.git  
``` 
4. Navigate to client folder.
 ```
 cd web_application/inter_iit/client
 ```
5. Install node modules in the client.
``` 
npm install
```
6. Start local development server
```
npm start
```
7. New tab in browser will open.
8. In another terminal navigate to web_application -> server
```
cd web_application/server
```
9. Create a virtual environment for flask server.
```
python -m venv .venv
```
10. Select python interpreter path (In vscode press ctrl + shift + p) and select interpreter by going to .venv/Scripts/python.exe

11. Activate .venv/Scripts/activate.bat for cmd and .venv/Scripts/activate.ps1 for ps1
```
.venv/Scripts/activate.ps1
```

12. Install the required python packages.
```
pip install -r requirements.txt
```
13. To run the server. Navigate to server.
```
python -m flask run
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

![Folder Structure](https://user-images.githubusercontent.com/72285744/159033412-0fe0c7fd-3b9d-41e8-b5a3-69392a439a32.PNG)

1. src folder all the source code.
2. api folder contains backend api.
3. assets folder contains static images.
4. components folder all react components.

# Code Deployment for desktop application

1. Navigate to standalone_application
```
cd standalone_application
```
2. Install node modules.
```
npm install
npm run watch
```
3. In another terminal
```
npm start
```
4. The desktop app will start.

# Code explantion for ml-model


1. The lc file is read using astropy table which is then converted to pandas dataframe
2. The dataframe is then convolved using gaussian kernal with width size 60
3. The scipy find_peaks() function is then called to get the index of the peaks in a light curve
4. The peak width function is then called to get a portion of the curve around the peak required to fit the curve
5. The background flux is then calculated by calling bgdata() function which returns two output
  i) Returns the light curve after  removing the peak width 
  ii) Returns the median calculated on light curve after removing the median
6. The standard deviation is then calculated for rates after removing peak width from the light curve
7. User defined peak fitter function is called 
  i) We scale the rate using mix max scaler which is required for better fit
  ii) We fit the portion around the peak to our light curve function  and get the parameters of the function
  iii) Using the parameters we got we extend the function to both side of the peakwidth 
  iv) we reverse scale rate to original value using rev_scaler()
  v) The time and rate for the extended curve corresponding to each peak is stored in newcurve 
  vi) Scaled curve contains the fitted rate for peak width
8. Startidx() function is then called to get start and end index corresponding to start and end time of a burst
  i) The start and end time are calculated as the point where the background flux+standard deviation meet the newcurve (i.e.Extended fitted curve)
  ii) Unfit peaks are also eliminated in this function where the peak flux is lower than background flux +(115% of standard deviation) and the extended fitted curve cuts the background+standard deviation just once
9. Params function is called which then converts all the obtained information for all the peaks in a curve in a dataframe and classifies the peak on the basis of flux
10. Stitcher function is then called which stiches the scaled curve(i.E. Fitted curve for peak width) for multiple peaks and background data.

# Limitations of ml-model


1. In order to display the fitted curve over the convolved data without discontinuities we have implemented a stitch function, this function uses the median in place of the unavailable fit for portion between 2 peaks and because of that in certain parts the gradient of the fitted curve appears to large and distorts the fitted curve.
2. Incase of a very large rise or decay time where the start and end time extend beyond the duration of measurement, the curve is not able to fit optimally due to lack of information.


 
