import './style.css';

const weatherForm = document.querySelector(".weatherForm");

const searchCity = document.querySelector(".searchCity");

const apiKey = "a46b8dcdf451c74b84546e01890217b3";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = searchCity.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Enter a valid city");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    console.log(response);

    if (!response.ok) {
        throw new Error("Unable to fetch Weather Data");
    }

    return await response.json();
}

function displayWeatherinfo(data) {

    console.log(data);
    const {name: city,
           main: {temp},
           weather: [{description, id}]} = data;

    const cityDisplay = document.getElementById("cityName");
    cityDisplay.textContent = city;

    const temperatureDisplay = document.getElementById("temperature");
    temperatureDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;

    const skiesDisplay = document.getElementById("skies");
    skiesDisplay.textContent = description;
}

function displayError(message) {
    alert(message);
}