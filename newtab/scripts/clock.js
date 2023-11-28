// Update the clock every second
setInterval(() => {
    const time = new Date();
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    const ampm = time.getHours() < 12 ? 'AM' : 'PM';

    // Update the DOM elements for hours, minutes, seconds, and AM/PM
    document.getElementById("hours").textContent = `${hours}:`;
    document.getElementById("minutes").textContent = `${minutes}:`;
    document.getElementById("seconds").textContent = seconds;
    document.getElementById("ampm").textContent = ampm;
}, 1000);
