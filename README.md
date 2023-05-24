# Getting Started - Equal Experts Tech Challenge - Calculator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The Challenge

This challenge follows version 5b8d0fd276b6d288905ed2f63a934e057e8feca2 of [these Equal Experts guidelines](https://equalexperts.github.io/ee-tech-interviews-uk/calculator-problem.html).

## Installation

Please ensure you are running the version of node specified by the `.nvmrc` file in the root of this project.

Run `npm install` to install dependencies, and then one of the commands below to either start the application or run the tests.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Limits

Due to time restrictions the app has the following limited functionality:

- The minimum (I think) buttons a calculator could have
- Input is limited in length
- Results are limited in length
- The number of decimal places in results is limited
- Accessibility could be improved
- It's not easy to spot when the calculator errors. It resets rather than displaying, for example, 'ERROR'. An example of an error: having a result that has a length longer than the limit.
- Accuracy. I'd want to explore in more depth the accuracy of various javascript features, for example .toFixed(). Also, limiting the number of decimal places will affect accuracy.
- Browser compatibility. Currently tested on latest Chrome and Safari on a mac.

With more time, I'd also like to improve the clarity of the code.
