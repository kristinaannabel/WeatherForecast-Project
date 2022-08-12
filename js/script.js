/* I am blocked from the API for 2,5 days so I couldnt implement the 
icons on the forecast. But the rest was working because I was blocked*/


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

//Initial values
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

  getSearchForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  cityElement.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios
    .get(apiUrl)
    .then((response) => {
      getInfo(response);
    })
    .catch((e) => {
      cityElement.innerHTML = e.response.data.message;
    });
}

// Current location
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

// Forecast
function getSearchForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,windspeed_10m_max&timezone=Europe%2FBerlin`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  days.forEach((day, index) => {
    const myDay = document.createElement("row");
    myDay.innerHTML = `
    <div class="row">
      <div class="weekday">
        <b>${day}</b>
      </div>
      <div class="weather-icon">
        <img 
          src="https://cdn4.iconfinder.com/data/icons/biticon-weather-line/24/weather_sun_sunny_day-512.png"
          alt="weather description icon"
          width="30"
        />   
      </div>
      <div class="temp">
        <i class="fa-solid fa-temperature-full"></i> ${Math.round(
          forecast.temperature_2m_max[index]
        )}°C
      </div> 
      </br>
    </div>
    `;
    document.querySelector("#forecast").appendChild(myDay);
  });
}
