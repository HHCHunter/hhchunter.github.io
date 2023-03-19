const geocodeAPIKey = "365929922291685754637x11122";
const OpenWeatherAPIKey = "db414e034946bc0b13e3baf78888ecea";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://geocode.xyz/${latitude},${longitude}?json=1&auth=${geocodeAPIKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const city = data.city;
        const timezone = data.timezone;
        const temperatureUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OpenWeatherAPIKey}&units=metric`;
        const timeUrl = `https://worldtimeapi.org/api/timezone/${timezone}`;

        document.getElementById("city").textContent = city;

        const updateTemperature = () => {
          fetch(temperatureUrl)
            .then(response => response.json())
            .then(data => {
              const temperature = data.main.temp;
              const celsiusLogo = '\u2103';
              const temperatureString = `${temperature} ${celsiusLogo}`;
              document.getElementById("temp").textContent = temperatureString;
            });
        };
        updateTemperature();
        setInterval(updateTemperature, 60000);

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
              document.getElementById("clock").textContent = currentTimeString;
            });
        }, 1000);
      });
  });
}