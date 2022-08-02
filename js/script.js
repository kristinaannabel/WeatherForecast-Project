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

window.onload = getUserLocation;

//Initial Values
let temp;
let wind;
let humidity;
let clouds;
let farenheitToggle = false;
const units = "metric";

//Document values
let toggleBtn = document.getElementById("convertTemp");
let submitInput = document.getElementById("searchBar");

const tempElement = document.getElementById("temperature");
const windElement = document.getElementById("windSpeed");
const humidityElement = document.getElementById("humidityPercent");
const cloudsElement = document.querySelector("#cloud");
const cloudIconElement = document.getElementById("weatherIcon");
const cityElement = document.querySelector("h1");
const geolocationBtn = document.getElementById("currentLocation");
const cityInput = document.querySelector("input");

//Api Keys
const apiKey = "96e1b7384a3ea207c6c443d025e59895";

// Current location
function getInfo(response) {
  temp = Math.round(response.data.main.temp);
  wind = Math.round(response.data.wind.speed);
  humidity = response.data.main.humidity;
  clouds = response.data.weather[0].description;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = `${temp} C° `;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
  cloudsElement.innerHTML = `${clouds}`;
  cloudIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  cityElement.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then((response) => getInfo(response));
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(getInfo);
  });
}

// Toggle celsius-farenheit
function toggleMeasure() {
  let farenheit = Math.round((temp * 9) / 5 + 32);
  farenheitToggle = !farenheitToggle;
  tempElement.innerHTML = farenheitToggle ? `${farenheit} F° ` : `${temp} C° `;
  toggleBtn.innerHTML = farenheitToggle ? "C°" : "F°";
}

geolocationBtn.addEventListener("click", getUserLocation);
toggleBtn.addEventListener("click", toggleMeasure);

submitInput.addEventListener("submit", searchCity);
