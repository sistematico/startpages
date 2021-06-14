const weather = document.getElementById("weather")
weather.innerHTML = '<a href="index.html?c=1">Clima</a>'

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    weather.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const showPosition = (position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3dedab9a1e2b6e1cb120ae2f421b477d`).then(function (response) {
    return response.json();
  }).then(function (json) {
    document.getElementById('weather').innerHTML = '<a href="index.html">' + json.main.temp + '°C</a>';
  });
  
  //console.info("Latitude: " + position.coords.latitude);
  //console.info("Latitude: " + position.coords.longitude);
}

let c = new URL(window.location.href).searchParams.get("c")
if (c !== null && c == 1) {
  getLocation()
}