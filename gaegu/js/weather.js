const weather = document.getElementById("weather");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    weather.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  console.info("Latitude: " + position.coords.latitude);
  console.info("Latitude: " + position.coords.longitude);
}