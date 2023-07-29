# Angular Weather App

This is a simple and responsive web application built with Angular that allows users to search for the weather of a city and save their favorite cities. The app utilizes the AccuWeather API to fetch weather data, including current weather and a 5-day daily forecast.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/your-username/angular-weather-app.git
cd angular-weather-app


2. Install the dependencies:

npm install


3. Get your API key from [AccuWeather API](https://developer.accuweather.com/apis) and replace `'YOUR_API_KEY'` in the `src/environments/environment.ts` file.

4. Start the development server:


The app will be accessible at `http://localhost:4200/` in your browser.

## Features

The Angular Weather App has the following features:

- **Weather Page**: Displays the weather details for a city, including the current weather and a 5-day forecast. The user can search for a city using the search field.
- **Favorites Page**: Lists the user's favorite locations. Clicking on a favorite location will navigate back to the Weather Page with the details of that location.
- **Navigation**: The app has a header with navigation icons/links/buttons for easy access to the main and favorites screens.
- **Default Location**: The default weather displayed on the main screen is for Tel Aviv.
- **Favorite Locations**: Each location in the Weather Page indicates whether it's already saved in favorites, and users can add/remove locations to/from favorites.
- **Searching**: Searching for locations can be done using English letters only.
- **Responsive Design**: The app is designed to be responsive, adapting to different screen sizes using flexbox/grid.
- **Error Handling**: The app includes error handling using toast or modal to display error messages to users.

## Bonus Features

1. **Geolocation API**: The app utilizes the Geolocation API to automatically set the default location based on the user's current latitude and longitude.
2. **Celsius/Fahrenheit Toggle**: The app has a toggle button to switch between Celsius and Fahrenheit units for temperature display.
## Notes

- Make sure to replace `'YOUR_API_KEY'` in the `src/environments/environment.ts` file with your actual AccuWeather API key.
- The app saves the user's favorite locations locally on their browser. No server-side storage is implemented.
- The app uses local storage to store favorites and caches API responses to minimize requests during development.
- The app is built with a focus on readability and maintainability. Logical project structure and code separation are followed.

## Authors

- Eden Amaram
- Email: amram167@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
