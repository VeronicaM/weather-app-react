# Weather Forecast 

OpenWeather based app that displays weather information for every 3 hours across 5 days for London.  
The app is hosted [here](https://open-weather-react-app.herokuapp.com/). 
## Requirements

To configure locally you will need to have installed on your machine:
* node *v8.12* or higher 
* npm  *v5.3.0* or higher or yarn *v1.0* or higher

## Installation
1. git clone this repository 
2. cd into the root folder 
3. run `npm install` or `yarn` to install all dependencies

## Run the project
* Run `yarn start` or `npm start` in the root of your project. This should open the project in your default browser at http://localhost:3000/ 

## Test
* Run `npm run test` or `yarn test` 

## Technical choices and Tradeoffs 
* **Create React App** to generate the initial structure of the app. 
  - I have made this choice for the ease of setup of React with Babel 7 config as well as all the other plugins like class-properties. 
  - It also sets up Jest, Sass and Webpack.
  ##### Tradeoffs
  - This is very fast and convinient setup for prototyping but it has a lot of unnecessary complexity 
  - If I had enough time I would do a proper setup from scratch and I would include only what it's necessary for the project.
* **Material UI** for fast and easy styling. 
   ##### Tradeoffs
  - I wouldn't use it in a production app because it creates a very deeply nested hierarchy of wrapped components 
    making it very difficult to debug the app by inspecting the DOM.  
  - Because of this deep hierarchy additional customized styling or passing of props is a lot more difficult as well.
* **Enzyme** in additional to the JEST setup made available by create-react-app. 
  - I've chosen to use Enzyme thanks to 
    - the ease of testing components
    - I was already familiar with it. 
  ##### Tradeoffs
  - In a production app I would maybe investigate different testing libraries like `react-testing-library` as:
    - it is more light-weight
    - it allows you to focus more on testing the user interaction with the app instead of components implementation details. 
* **OpenWeather API Key** in a config file that I have added in the source code on github. 
  ##### Tradeoffs
  - In a production environment I would have probably used a backend endpoint that received the key from a process.env variable 
   to prevent it from being exposed on the client side or stored in the source code. 
* Other things I would have liked to focus more on are design and responsiveness.  