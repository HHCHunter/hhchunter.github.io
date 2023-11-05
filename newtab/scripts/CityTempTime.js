// Insert your OpenWeather API key here
const apiKey = 'db414e034946bc0b13e3baf78888ecea';

// Function to fetch weather data from OpenWeather API using coordinates
function updateWeatherByCoordinates(lat, lon) {
  // OpenWeather API endpoint for current weather with latitude and longitude
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

// Get the user's location, update the weather, and start the clock
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Use coordinates to fetch and update weather
    updateWeatherByCoordinates(latitude, longitude);
    
    // Update the clock every second
    setInterval(() => {
      const time = new Date();
      const hours = time.getHours() % 12 || 12;
      const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      const ampm = time.getHours() < 12 ? 'AM' : 'PM';
      document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }, 1000);

  }, error => {
    console.error("Error occurred: " + error.message);
    // Handle location errors here, maybe update the UI to inform the user
  });
} else {
  console.log("Geolocation is not supported by this browser.");
  // Possibly inform the user that geolocation is not available
}
