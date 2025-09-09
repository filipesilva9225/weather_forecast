// Variáveis e elementos
const apiKey = "e66ea5d9c8b2fce65844f37367544a57";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const weatherDataContainer = document.querySelector("#weather-data");

// Funções
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  // Tratamento de erro simples caso a cidade não seja encontrada
  if (data.cod === "404") {
    alert("Cidade não encontrada.");
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  // CORREÇÃO: Usando a nova API de bandeiras
  countryElement.setAttribute(
    "src",
    `https://flagsapi.com/${data.sys.country}/flat/64.png`
  );
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Exibe o container de clima após carregar os dados
  weatherDataContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

// Opcional: Permitir busca com a tecla Enter
cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
