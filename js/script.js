// Current Time
const now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getMilliseconds();
now.getDay();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

if (hour < 10) {
  hour = "0" + hour;
}

if (minutes < 10) {
  minutes = "0" + minutes;
}

document.getElementById("timeDay").innerHTML = `${day} @ ${hour}:${minutes}`;

/* In your project, when a user searches for a city 
(example: New York), it should display the name of the city on 
the result page and the current temperature of the city. */

function tempCity(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.getElementById("temperature");
  tempElement.innerHTML = `${temp}°C`;
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
}

function searchCity(event) {
  console.log("triggered");
  event.preventDefault();
  let cityElement = document.querySelector("h1");
  let cityInput = document.querySelector("input");
  cityElement.innerHTML = cityInput.value;
  let units = "metric";
  let apiKey = "96e1b7384a3ea207c6c443d025e59895";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(tempCity);
}

let submitInput = document.getElementById("searchBar");
submitInput.addEventListener("submit", searchCity);

/*Add a Current Location button. When clicking on it, 
  it uses the Geolocation API  to get your GPS coordinates 
  and display and the city and current temperature 
  using the OpenWeather API. */

function getUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    let apiKey = "96e1b7384a3ea207c6c443d025e59895";
    let units = "metric";
    let lat = latitude;
    let lon = longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(getInfo);
  });
}

function getInfo(response) {
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.getElementById("temperature");
  tempElement.innerHTML = `${temp}°C`;
  let cityElement = document.getElementById("city");
  cityElement.innerHTML = response.data.name;
}

function showLocation(event) {
  event.preventDefault();
}

let button = document.querySelector("#locationButton");
button.addEventListener("click", getUserLocation);

window.onload = getUserLocation;
