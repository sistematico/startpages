const weather = document.getElementById("weather");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    weather.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=3dedab9a1e2b6e1cb120ae2f421b477d`).then(function (response) {
    //console.log(response)
    return response.json();
  }).then(function (json) {
    document.getElementById('weather').innerHTML = json.main.temp + '°C';
  });
  
  //console.info("Latitude: " + position.coords.latitude);
  //console.info("Latitude: " + position.coords.longitude);
}

getLocation();