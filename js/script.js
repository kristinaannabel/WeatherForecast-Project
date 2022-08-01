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

// Search engine
function tempCity(response) {
   let tempElement = document.getElementById("temperature");
   let windElement = document.getElementById("windSpeed");
   let humidityElement = document.getElementById("humidityPercent");
   let cloudsElement = document.querySelector("#cloud");
   let cloudIconElement = document.getElementById("weatherIcon");
   let cityElement = document.querySelector("h1");

   let temp = Math.round(response.data.main.temp);
   let wind = Math.round(response.data.wind.speed);
   let humidity = response.data.main.humidity;
   let clouds = response.data.weather[0].description;

   cityElement.innerHTML = response.data.name;
   tempElement.innerHTML = `${temp}°C`;
   humidityElement.innerHTML = `${humidity}%`;
   windElement.innerHTML = `${wind} km/h`;
   cloudsElement.innerHTML = `${clouds}`;
   cloudIconElement.setAttribute(
     "src",
     `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
   );
}

function searchCity(event, err) {
  event.preventDefault();
  let cityElement = document.querySelector("h1");
  let cityInput = document.querySelector("input");
  cityElement.innerHTML = cityInput.value;
  let units = "metric";
  let apiKey = "96e1b7384a3ea207c6c443d025e59895";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios
    .get(apiUrl)
    .then((response) => tempCity(response))
}

let submitInput = document.getElementById("searchBar");
submitInput.addEventListener("submit", searchCity);

// Current location
function getInfo(response) {
  let tempElement = document.getElementById("temperature");
  let windElement = document.getElementById("windSpeed");
  let humidityElement = document.getElementById("humidityPercent");
  let cloudsElement = document.querySelector("#cloud");
  let cloudIconElement = document.getElementById("weatherIcon");
  let cityElement = document.querySelector("h1");
    
  let temp = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let humidity = response.data.main.humidity;
  let clouds = response.data.weather[0].description;
    
  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = `${temp}°C`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
  cloudsElement.innerHTML = `${clouds}`;
  cloudIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  
  }

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

function showLocation(event) {
  event.preventDefault();
}

let geolocationBtn = document.getElementById("currentLocation");
geolocationBtn.addEventListener("click", getUserLocation);

window.onload = getUserLocation;
