// Example cities and their coordinates, including Perth
const cities = [
  { name: "New York", latitude: 40.7128, longitude: -74.0060 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "Perth", latitude: -31.9505, longitude: 115.8605 }
];

// Calculate the distance between two points on Earth (simplified calculation)
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Find the closest city to the user's location
function findClosestCity(lat, lon) {
  let closestCity = cities[0];
  let smallestDistance = calculateDistance(lat, lon, closestCity.latitude, closestCity.longitude);

  for (let i = 1; i < cities.length; i++) {
    let city = cities[i];
    let distance = calculateDistance(lat, lon, city.latitude, city.longitude);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestCity = city;
    }
  }

  return closestCity.name;
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const city = findClosestCity(latitude, longitude);

    document.getElementById("city").textContent = city;

    // The rest of your code here

    // Update the temperature and wind data
    const updateWeather = () => {
      // Static or dummy values for demonstration as you no longer use an API for weather
      const temperature = 20; // Example static temperature
      document.getElementById("temp").textContent = `${temperature}\u2103`;

      const windSpeed = 5; // Example static wind speed
      document.getElementById("wind").textContent = `W: ${windSpeed}m/s`;
    };

    updateWeather(); // Update weather on page load
    // If needed, you can set an interval to update weather periodically
    // setInterval(updateWeather, 60000); // Update weather every 60 seconds with the static values

    // Update the clock every second
    setInterval(() => {
      const time = new Date();
      const hours = time.getHours() % 12 || 12;
      const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      const ampm = time.getHours() < 12 ? 'AM' : 'PM';
      document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }, 1000);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
