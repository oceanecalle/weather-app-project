// let fahrenheit = Math.round((temperature*1.8)+32);

function formattedDate(date) {
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentWeekday = weekdays[date.getDay()];

  let currentDate = date.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[date.getMonth()];

  return `${currentWeekday}, ${currentDate} ${currentMonth} ${currentHours}:${currentMinutes}`;
}

let celsiusTemperature = null;

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  document.querySelector(
    "#city"
  ).innerHTML = `<i class="fa-solid fa-map-pin"></i> ${response.data.name}`;
  document.querySelector("#wed-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  if (response.data.rain) {
    document.querySelector("#precipitation").innerHTML =
      response.data.rain * 100;
  } else {
    document.querySelector("#precipitation").innerHTML = 0;
  }
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#wed-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature * 1.8 + 32);
}

function celsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#wed-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusTemp);

let wedDate = document.querySelector(".wed-date");
let currentTime = new Date();
wedDate.innerHTML = formattedDate(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Toronto");
