# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


# Financial Data Dashboard

## Overview
This React application provides a visual representation of historical quarterly financial data for publicly traded companies. It fetches data from the Alpha Vantage API and displays key financial metrics on a chart.

## Features
- **React Framework**: Utilizes React for building the user interface.
- **Alpha Vantage API**: Fetches historical quarterly financial data for a specified stock symbol.
- **Data Visualization**: Plots quarterly net income, total revenue, and shareholder equity from financial statements.
- **Responsive Design**: Ensures the chart is displayed in a visually appealing manner across different devices.
- **Search Functionality**: Allows users to search for different stock symbols or companies via an input field or other UI elements.
- **Error Handling**: Implements robust error handling for failed API requests.
- **Additional Enhancements**: Add a general search to display the data associated with the selected symbol in a list.

## Installation
1. Clone the repository: `git clone https://github.com/jorendon/First.git`
2. `cd First`
3. Install dependencies: `npm install`

## Usage
To run the application locally:
1. Start the development server: `npm run dev`
2. Open the browser and navigate to `http://127.0.0.1:5173/`
3. To test all the functionality with a symbol other than IBM, you must comment the line API_KEY='demo' and uncomment API_KEY= import.meta.env.VITE_API_KEY
     which is located in the src/utils/constants.js file.

This has to be done because the API does not allow me to make more than 25 requests per day if I am not in demo mode.

![image](https://github.com/jorendon/First/assets/49385111/4f3c1d92-93e8-45fc-9332-bc1287b0143e)

![image](https://github.com/jorendon/First/assets/49385111/ceebeb6e-fa71-42e8-9851-ecf55f708ad1)





## Contributing
Contributions to enhance the application are welcome. Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Commit message'`.
4. Push to the original branch: `git push origin feature-branch-name`.
5. Create the pull request.


## Contact
For any queries or further assistance, please contact [Jonathan.rendon@gmail.com].

   

   
