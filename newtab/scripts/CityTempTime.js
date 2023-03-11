// Set your API keys
const geocodeAPIKey = "365929922291685754637x11122";
const OpenWeatherAPIKey = "db414e034946bc0b13e3baf78888ecea";

// Get user's location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://geocode.xyz/${latitude},${longitude}?json=1&auth=${geocodeAPIKey}`;

    // Get nearest major city info
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const city = data.city;
        const timezone = data.timezone;
        const temperatureUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OpenWeatherAPIKey}&units=metric`;
        const timeUrl = `https://worldtimeapi.org/api/timezone/${timezone}`;

        // Update city
        document.getElementById("city").textContent = city;

        // Get temperature
        fetch(temperatureUrl)
          .then(response => response.json())
          .then(data => {
            const temperature = data.main.temp;
            const celsiusLogo = '\u2103'; // Celsius logo unicode character
            const temperatureString = `${temperature} ${celsiusLogo}`;
            document.getElementById("temp").textContent = temperatureString;
          });

        // Get time
        setInterval(() => {
          fetch(timeUrl)
            .then(response => response.json())
            .then(data => {
              const time = new Date(data.datetime);
              const hours = time.getHours() % 12 || 12;
              const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
              const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
              const ampm = time.getHours() < 12 ? "AM" : "PM";
              const currentTimeString = `${hours}:${minutes}:${seconds} ${ampm}`;
              document.getElementById("time").textContent = currentTimeString;
            });
        }, 1000);
      });
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
