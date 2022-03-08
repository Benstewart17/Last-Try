function changeNumber(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let farenheit = document.querySelector("#f");
farenheit.addEventListener("click", changeNumber);

//

let dateElement = document.querySelector("#date");
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

dateElement.innerHTML = ` ${day} ${hour}:${minute}`;

//

function displayWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function update(weatherHere) {
  document.querySelector("#city").innerHTML = weatherHere.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    weatherHere.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    weatherHere.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    weatherHere.data.wind.speed
  );
}

function changeCity(event) {
  event.preventDefault();
  let apiKey = "6d4930ecd867865d55c0918006618aca";
  let city = document.querySelector("#type-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function currentLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "6d4930ecd867865d55c0918006618aca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(update);
}

function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

document.querySelector("#search-form").addEventListener("submit", changeCity);
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", findCurrentLocation);
