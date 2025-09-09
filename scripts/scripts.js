// Var end elements
const apiKey = "e66ea5d9c8b2fce65844f37367544a57";
const apiCountryURL = "https://countryflagsapi.com/png/";

const cityInput = document.getElementById("#city-input");
const searchBtn = document.querySelector(".search");

const cityElement = document.getElementById("#city");
const tempElement = document.getElementById("#temperature span");
const descElement = document.getElementById("#description");
const weatherIconElement = document.getElementById("#weather-icon");
const countryElement = document.getElementById("#country");
const umidityElement = document.getElementById("#umidity span");
const windElement = document.getElementById("#wind span");

// functions
const geWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric%appid=${apiKey}%lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await geWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.umidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
};

// events
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});
