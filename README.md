# AutoFlow Front End Demo
AutoFlow is a demo single page web application designed and programmed solely by me (Kyle Walters). It is not meant for production, but to illustrate a basic business solution to a common problem faced by used vehicle dealerships. The entire app is coded in React 17 using 100% Function Components and Hooks. No ugly Class Components!

The main purpose of this web app is to help Inventory Managers organize and track their vehicles as they move through the reconditioning process, from the time they are purchased, to the time they are on the lot 'for sale'. AutoFlow (theoretically) empowers decision making by allowing managers to identify bottlenecks and analyze statistics based on given stages/people/places. All screens are responsive and just as beautiful on a mobile device.

Though AutoFlow is not a production level application, it is not far from one. The UI is capable of handling production level data through it's optimizations and pagination of results. This demo application falls short of production level because it does not have an authentication mechanism, or a notion of seperate users. The Analytics feature is also not optimized for massive amounts of data, or multiple users/dealerships. However it works great in the context of this demo with one dealership and 10,000 vehicles. Furthermore, some Demo specific features included in this project would not translate to a production application.

## Front End Tech Stack
-  React 17
-  Typescript 4
-  Material-UI 5
-  D3
-  React Router
-  React Beautiful Dnd
-  React Cookie

## Running The App
**Note: In order to run this application, [autoflow-back-end-demo] Selection Server must be listening on http://localhost:7001.**
- Clone this Repo onto your local machine
- install dependencies
  
  ```npm i```
- Install serve (if not already installed)
  
  ```npm install -g serve```
- Deploy AutoFlow build locally

  ```serve -s build```
- Open [http://localhost:3000](http://localhost:3000) to view AutoFlow in the browser


## Demo Actions
If this is the first time running the application, there will be no data for the app to work with (boring). Though you can add things like vehicles, makes, models, stages, people and places manually, you can make things interesting a lot faster by going to the menu (top left) and selecting `Demo Actions`. The following bulk actions are available:
- Clear the given database
- Add Vehicle Descriptors (sample collection of years, makes, models and trims)
- Add Stages and People/Places (another sample collection)
- Generate Demo Vehicles (capped at 10,000 vehices, three years back)
  - Generating vehicles not only generates the vehicles themselves, but also a complete history of demo stage assignments being assigned and completed on each vehicle. This works by using JavaScript generator functions to 'step through' each vehicle and simulate as if an actual user were completing each action manually. MongoDB performs faster at this, MySQL can be slow (don't fret, MySQL seems to be slightly faster at analytics). Be patient if you want to generate large volumes of vehicles

## Demo Settings
By going to the menu (top left) and selecting `Demo Settings` the following actions can be performed:
  - switch which database the back end communicates with (MongoDB or MySQL)
    - MongoDB is selected by default when the App first loads
  - adjust the simulated load time for asynchronous network calls

## Available Scripts
This project was created with [Create React App](https://facebook.github.io/create-react-app/docs/getting-started). 
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
