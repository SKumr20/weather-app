import './style.css';
import sunnyIcon from './assets/images/sunny-day-svgrepo-com.png';
import cloudyIcon from './assets/images/clouds.png';
import mistIcon from './assets/images/mist.png';
import drizzleIcon from './assets/images/drizzle.png';
import rainIcon from './assets/images/rain.png';


const weatherIcon = document.querySelector('.weather-icon');
weatherIcon.src = sunnyIcon;


import backgroundImage from './assets/images/jinen-shah-TwZb_z0Cf88-unsplash.jpg';


document.body.style.backgroundImage = `url(${backgroundImage})`;


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

    if (id >= 200 && id < 300) {
        weatherIcon.src = drizzleIcon; // Thunderstorm
    } else if (id >= 300 && id < 500) {
        weatherIcon.src = drizzleIcon; // Drizzle
    } else if (id >= 500 && id < 600) {
        weatherIcon.src = rainIcon; // Rain
    } else if (id >= 600 && id < 700) {
        weatherIcon.src = mistIcon; // Snow
    } else if (id === 800) {
        weatherIcon.src = sunnyIcon; // Clear
    } else if (id > 800) {
        weatherIcon.src = cloudyIcon; // Clouds
    }
    

}

function displayError(message) {
    alert(message);
}