# DALI_Dashboard
A iOS/Android based dashboard for DALI members at Dartmouth College. 
## Usage
### Prerequisites
This app is developed with React Native. To install React Native, visit: https://facebook.github.io/react-native/.
You also need a iOS/Android simulator on your computer to run the app. 
### Installing Dependencies
Once you have cloned the repository, you need to install all the dependencies that the app uses. Use your command line tool to navigate to the repository, and the run
```
npm install
```
These dependencies can be viewed in the package.json file in the repository.
If you do not have npm installed on your computer, visit: https://www.npmjs.com/.
### Running the App
If you have all the prerequisites and dependencies ready, to start the program, you just need to run
```
npm start
```
This should automatically launch your iOS/Android simulator, and display the app.
## What is it?
This project is a code challenge for the DALI Lab application. This is an app that displays real data, including avatar photos, from the DALI Lab website, of its members. It also has a dynamic search bar that allows you to search the members by name. It decodes the location of each member's address using the Google Maps API. Under the current API key, only one access per day is allowed. This could be easily changed by upgrading the Google Cloud Platform services.
