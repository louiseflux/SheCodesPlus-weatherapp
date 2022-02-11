function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature-main").innerHTML = Math.round(
    response.data.main.temp
  );

  // document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  //document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  //document.querySelector("#description").innerHTML = response.data.weather[0].main;
}
function searchCity(city) {
  let apiKey = "62c00bf0fdddae09d7d91e0626bc9b7a";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "62c00bf0fdddae09d7d91e0626bc9b7a";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiURL = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-main");
  //let temperature = temperatureElement.innerHTML;
  //temperature = Number(temperature);
  //temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-main");
  //let temperature = temperatureElement.innerHTML;
  //temperature = Number(temperature);
  //temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  temperatureElement.innerHTML = 19;
}

//challenge 1
let dateELement = document.querySelector("#date");
let currentTime = new Date();
dateELement.innerHTML = formatDate(currentTime);

//challenge 2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//challenge - bonus feature
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
