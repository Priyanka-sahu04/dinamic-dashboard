# Dynamic Dashboard

This project implements a dynamic dashboard using HTML, CSS, and JavaScript. It fetches data from a JSON file, displays it in an interactive bar chart, and allows users to filter the data by date, age group, and gender. Clicking on a bar in the chart generates a line chart showing the trend of the selected category over time.  The dashboard also integrates Firebase for user authentication.

## Features

### HTML

*   **Input Elements:** Uses `<input type="date">` for date selection, `<select>` for dropdown filters (age and gender), and `<button>` for triggering filter actions.
*   **Canvas Element:**  `<canvas>` elements are used to render the bar chart and line chart.

### CSS

*   **Responsive Design:**  Media queries are used to ensure the dashboard adapts to different screen sizes.
*   **Styling:** Styles are applied to elements for better visual presentation, including filters, buttons, and the chart container.

### JavaScript

*   **Data Fetching:** Fetches data from `data.json` using `fetch` API.
*   **Data Filtering:** Filters data based on user-selected criteria (date range, age, gender).
*   **Chart.js Integration:** Uses Chart.js library to create interactive bar and line charts.
*   **Dynamic Chart Updates:** Updates the charts based on filtered data.
*   **Event Handling:**  Handles click events on the filter button and chart elements.
*   **Papa Parse (Optional):** Although included in the HTML, Papa Parse is not actually used in the provided `script.js`. If you intend to use CSV data, uncomment the relevant code and ensure the CSV file is accessible.
*   **Firebase Authentication:** Uses Firebase for user sign-up and login, handled in separate `auth.js` and `auth.css` files. The dashboard (`dashboard.html`) is accessed after successful authentication.


## Functionality

1.  **Data Loading:** On page load, the dashboard fetches data from the `data.json` file.
2.  **Initial Chart Rendering:** A bar chart is rendered displaying the total counts for each category (A-F) based on the initial data.
3.  **Filtering:** Users can filter the data using the provided filters (start date, end date, age group, gender).
4.  **Chart Update on Filter:** Clicking the "Filter" button updates the bar chart based on the filtered data.
5.  **Line Chart Generation:** Clicking on a bar in the bar chart dynamically generates a line chart showing the trend of the selected category over the filtered time period.
6.  **Authentication:** Users must sign up or log in using the Firebase authentication integrated in `index.html`. Successful authentication redirects users to the dashboard. Logout functionality is also provided.


## File Structure

*   `index.html`: The main authentication page.
*   `auth.css`: Styles for the authentication forms.
*   `auth.js`: JavaScript for Firebase authentication logic.
*   `dashboard.html`: The dynamic dashboard page.
*   `style.css`: Styles for the dashboard elements.
*   `script.js`: JavaScript for data handling, filtering, and chart rendering.
*   `data.json`: The data source for the dashboard.

## How to Run

1. Deploy the `index.html`, `auth.css`, `auth.js` files to your Firebase hosting. Replace the placeholder Firebase configuration in `auth.js` with your own.
2. Deploy the `dashboard.html`, `style.css`, `script.js`, `data.json` to any web server or hosting platform.
3. Access the `index.html` URL in your web browser. Create an account or log in to be redirected to the dashboard. 

## Future Improvements

*   **Data Visualization Enhancements:**  Explore additional chart types or data representation methods to enhance data visualization.
*   **Real-time Data Integration:** Integrate real-time data updates for a more dynamic experience.
*   **User Interface/User Experience Improvements:** Improve the user interface for better usability and aesthetics.
*   **More robust error handling**: Add more detailed error messages and fallback mechanisms for data fetching and processing.