// Insert your OpenWeather API key here
const apiKey = 'db414e034946bc0b13e3baf78888ecea';

// Function to fetch weather data from OpenWeather API using coordinates
function updateWeatherByCoordinates(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Update the DOM with the new city and weather data
            document.getElementById("city").textContent = data.name;
            document.getElementById("temp").textContent = `${data.main.temp}\u2103`;
            document.getElementById("wind").textContent = `Wind: ${data.wind.speed}m/s`;
        })
        .catch(error => {
            console.log('Error fetching and parsing data', error);
            // Inform the user that the weather data could not be retrieved
        });
}

// Get the user's location and update the weather
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Fetch and update weather immediately, and then every 90 seconds
        updateWeatherByCoordinates(latitude, longitude);
        setInterval(() => updateWeatherByCoordinates(latitude, longitude), 90000); // 90 seconds
    }, error => {
        console.error("Error occurred: " + error.message);
        // Handle location errors here
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
