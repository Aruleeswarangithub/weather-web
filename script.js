const apiKey = "6d74691bf20c3ef5915cff1223650b13"; // Replace with your OpenWeatherMap API key

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDisplay = document.getElementById("weatherDisplay");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp.toFixed(1)}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDisplay.style.display = "block";
  } catch (error) {
    cityName.textContent = error.message;
    temperature.textContent = "";
    description.textContent = "";
    weatherIcon.src = "";
    weatherDisplay.style.display = "block";
  }
});
