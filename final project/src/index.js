function formatDateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function updateTime() {
  let now = new Date();
  let detailsElement = document.querySelector(".details");
  detailsElement.innerHTML = `${formatDateTime(now)}, moderate rain`;
}

updateTime();
setInterval(updateTime, 60000);

// SEARCH FORM EVENT LISTENER
let form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = input.value.trim();

  if (city.length === 0) {
    alert("Please enter a city name.");
    return;
  }

  let apiKey = "3a11b3476t0f974a384f37o114bf3e40";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      // Update city name
      let cityElement = document.querySelector("h1");
      cityElement.innerHTML = response.data.city;

      // Update temperature
      let temperatureElement = document.querySelector(".degrees");
      temperatureElement.innerHTML = Math.round(response.data.temperature.current);

      // Update humidity
      let humidityElement = document.querySelector(".humidity");
      humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

      // Update wind
      let windElement = document.querySelector(".wind");
      windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    })
    .catch(function (error) {
      alert("City not found. Please try another one.");
    });
});

