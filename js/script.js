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
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
console.log(response.data);
  let forecastElement = document.getElementById("forecast");
  let forecastHtml = `<div class="row">`
  days.forEach( function (day) {
      forecastHtml = forecastHtml + `
      <div class="weekday">
      <b>${day}</b>
      </div>
      <div class="weather-icon">
      <img 
         src="https://th.bing.com/th/id/R.bb277892fc034fac5191968584aa8ead?rik=hbASBK6hDwFGNw&riu=http%3a%2f%2fclipartmag.com%2fimages%2fcloud-icon-png-22.png&ehk=ozP7LioKT%2bAGB2RU2A%2ffxoGRjbHsiryW3oxDcrG1HF8%3d&risl=&pid=ImgRaw&r=0"
         alt="weather description icon"
         width="30"
         />   
         </div>
         <div class="temp">
         <i class="fa-solid fa-temperature-full"></i> 20°C
         </div> 
         </br>
         </div>
         `;
        });
  forecastElement.innerHTML = forecastHtml;
}  