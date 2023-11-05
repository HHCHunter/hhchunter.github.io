if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const city = 'Your City'; // Static value, as we cannot get the city name without an API
    const timezoneOffset = new Date().getTimezoneOffset();

    document.getElementById("city").textContent = city;

    // Dummy weather update function (static values)
    const updateWeather = () => {
      let temperature = 20; // Static value
      temperature = Math.round(temperature); // Round to nearest integer
      const celsiusLogo = '\u2103';
      const temperatureString = `${temperature}${celsiusLogo}`;
      document.getElementById("temp").textContent = temperatureString;

      let windSpeed = 5; // Static value
      windSpeed = Math.round(windSpeed); // Round to nearest integer
      const windDirectionInDegrees = 90; // Static value

      const cardinalDirections=['N','NE','E','SE','S','SW','W','NW'];
      const index=Math.round(windDirectionInDegrees/45)%8;
      const cardinalDirection=cardinalDirections[index];

      const windString=`W: ${windSpeed}m/s ${cardinalDirection}`;
      document.getElementById("wind").textContent=windString;
    };

    updateWeather(); // Call the function initially
    // If you want to periodically update the weather with new static values
    // setInterval(updateWeather, 60000); // Update weather every 60 seconds with the static values

    // Update the clock every second
    setInterval(() => {
      const time = new Date();
      const hours = time.getHours() % 12 || 12;
      const minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
      const seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
      const ampm = time.getHours() < 12 ? "AM" : "PM";
      const currentTimeString = `${hours}:${minutes}:${seconds} ${ampm}`;
      document.getElementById("clock").textContent = currentTimeString;
    }, 1000);
  });
} else {
  // Handle the case where the browser doesn't support geolocation
  console.log("Geolocation is not supported by this browser.");
}
