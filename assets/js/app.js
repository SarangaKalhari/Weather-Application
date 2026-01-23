let api_key = "4b08e55e58a345ee98c193641261801&q";

// -----Calculate Date format-------
let date = new Date();
formatDate = {
    "weekday": `long`,
    "month": `long`,
    "year": `numeric`,
    "day": `numeric`
}
let currentDate = date.toLocaleDateString("en-US", formatDate);

// ---------Calculate Time -----------
let now = new Date();
formatTime = {
    "hour": `2-digit`,
    "minute": `2-digit`,
    "hour12": `false`
}
let currentTime = now.toLocaleTimeString("en-US", formatTime);

let currentHour = now.getHours();

let timeStatus = detectTimeStatus(currentHour);

function detectTimeStatus(currentHour) {

    let timeStatus;
    if (currentHour >= 6 && currentHour < 18) {
        timeStatus = "day";

    } else {
        timeStatus = "night";

    }
    return timeStatus;
}




// --------Get ID & Set Current Data----------

function setCurrentDetails(currentDetails) {

    let temp = document.getElementById("temp_id");
    let mainStatusImage = document.getElementById("weather_icon");

    let current = document.getElementById("current_weather");
    let cityName = document.getElementById("current_location");

    let date = document.getElementById("date");
    let sunrise = document.getElementById("sunrise");
    let sunset = document.getElementById("sunset");
    let moonrise = document.getElementById("moonrise");
    let moonset = document.getElementById("moonset");

    let uv = document.getElementById("uv_index");
    let uvStatus = document.getElementById("uv_status");

    let pressure = document.getElementById("pressure");
    let airQuality = document.getElementById("cloud");
    let cloudStatus = document.getElementById("text_cloud");

    let humidity = document.getElementById("humidity_per");
    let humidityStatus = document.getElementById("humidity_text");

    let windSpeed = document.getElementById("wind_speed");
    let feelLike = document.getElementById("feel_like");
    let heat = document.getElementById("heat_index");
    let dew = document.getElementById("dew_point");
    let vis = document.getElementById("visibility");
    let visStatus = document.getElementById("visibility_status");

    let precep = document.getElementById("precep");
    let direction = document.getElementById("wind_direction");
    let chil = document.getElementById("wind_chil");

    temp.innerText = currentDetails.current.temp_c;
    mainStatusImage.src = setWeatherImage(timeStatus, currentDetails.current.condition.text);
    current.innerText = currentDetails.current.condition.text;

    cityName.innerText = currentDetails.location.name + ", " + currentDetails.location.country;

    date.innerText = currentDate;
    sunrise.innerText = currentDetails.forecast.forecastday[0].astro.sunrise;
    sunset.innerText = currentDetails.forecast.forecastday[0].astro.sunset;
    moonrise.innerText = currentDetails.forecast.forecastday[0].astro.moonrise;
    moonset.innerText = currentDetails.forecast.forecastday[0].astro.moonset;

    uv.innerText = currentDetails.current.uv;
    uvStatus.innerText = checkUVLevel(currentDetails.current.uv);

    pressure.innerText = currentDetails.current.pressure_mb;
    airQuality.innerText = currentDetails.current.cloud;
    cloudStatus.innerText = checkAirQuality(currentDetails.current.cloud);

    humidity.innerText = currentDetails.current.humidity;
    humidityStatus.innerText = checkHumidityLevel(currentDetails.current.humidity);

    windSpeed.innerText = currentDetails.current.wind_kph;
    feelLike.innerText = currentDetails.current.feelslike_c + " " + "°C";
    heat.innerText = currentDetails.current.heatindex_c + " °C";
    dew.innerText = currentDetails.current.dewpoint_c + " °C";

    vis.innerText = currentDetails.current.vis_km + " " + "km";
    visStatus.innerText = checkVisibility(currentDetails.current.vis_km);

    precep.innerText = currentDetails.current.precip_mm + " " + "mm";
    direction.innerText = currentDetails.current.wind_dir;
    chil.innerText = currentDetails.current.windchill_c + " °C";

}


// --------Check UV level------
checkUVLevel = (uvIndex) => {

    if (uvIndex >= 0 && uvIndex <= 2) {
        return "Low";
    } else if (uvIndex > 2 && uvIndex < 6) {
        return "Moderate";
    } else if (uvIndex >= 6 && uvIndex < 8) {
        return "High";
    } else if (uvIndex >= 8 && uvIndex < 11) {
        return "Very High";
    } else if (uvIndex > 11) {
        return "Extreme";
    }
}


// ------Check Air Quality----
checkAirQuality = (cloud) => {

    if (cloud >= 0 && cloud <= 50) {
        return "Good";
    } else if (cloud >= 51 && cloud <= 100) {
        return "Moderate";
    } else if (cloud >= 101 && cloud <= 150) {
        return "Unhealthy for Sensitive Groups";
    } else if (cloud >= 151 && cloud <= 200) {
        return "Unhealthy";
    } else if (cloud >= 201 && cloud <= 300) {
        return "Very Unhealthy";
    } else if (cloud >= 301) {
        return "Hazardous";
    }

}


// ------ Check humidity levels----

checkHumidityLevel = (humidity) => {

    if (humidity <= 30) {
        return "Dry";
    } else if (humidity >= 31 && humidity <= 50) {
        return "Normal";
    } else if (humidity >= 51 && humidity <= 70) {
        return "Humid";
    } else if (humidity >= 71 && humidity <= 85) {
        return "Very Humid";
    } else if (humidity >= 86) {
        return "Extreme";
    }

}


// ------Check Visibility Status --------

checkVisibility = (visibility) => {

    if (visibility <= 1) {
        return "Very Poor";
    } else if (visibility > 1 && visibility <= 3) {
        return "Poor";
    } else if (visibility > 3 && visibility <= 6) {
        return "Moderate";
    } else if (visibility > 6 && visibility <= 10) {
        return "Good";
    } else if (visibility >= 10) {
        return "Excellent";
    }

}


// ---------Set Hourly Data 24h---------

function setHourlyForecast(forecast) {

    const container = document.getElementById("hourly_container");
    container.innerHTML = ""; // clear old cards


    // ---merge today & tomorrow hourly data in array----
    let todayHours = forecast[0].hour;
    let tomorrowHours = forecast[1].hour;
    let hourlyDataArray = [...todayHours, ...tomorrowHours];
    
    let nowHour = currentHour;

    let nextHours = hourlyDataArray.slice(nowHour, nowHour + 24);

    nextHours.forEach(hour => {

        // Format time → "02 PM"
        let time = new Date(hour.time).toLocaleTimeString([], {
            "hour": '2-digit',
            "minute": '2-digit',
            "hour12": `false`
        });

        let dateObj = new Date(hour.time);

        // Detect day/night
        let timeStat = detectTimeStatus(dateObj.getHours());

        // Create card
        const card = document.createElement("div");
        card.className = "min-w-[90px] bg-[#0b1220] rounded-xl p-3 text-center";

        card.innerHTML = `
        <p class="text-sm text-gray-400">${time}</p>
        <img src="${setWeatherImage(timeStat, hour.condition.text)}" class="w-10 h-10 mx-auto my-2">
        <p class="font-semibold">${hour.temp_c}°C</p>
        <p class="text-xs text-gray-400">${hour.condition.text}</p>
    `;

        container.appendChild(card);
    });


}

// ---------Set Weekly Data -----------

function setWeeklyForecast(weekly_forecast) {
    const weeklyContainer = document.getElementById("weekly_forecast");
    weeklyContainer.innerHTML = ""; // clear old cards

    weekly_forecast.forecastday.forEach(day => {
        const card = document.createElement("div");
        card.className = "min-w-[200px] min-h-[250px] bg-[#0b1220] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform";

        card.innerHTML = `
      <p class="text-xl text-gray-400 mb-2">${day.date}</p>
      <img src="${setWeatherImage("day", day.day.condition.text)}" class="w-20 h-20 my-3 mx-auto" alt="${day.day.condition.text}">
      <p class="text-white font-medium mb-1">${day.day.condition.text}</p>
      <span class="text-gray-300">
        ${day.day.maxtemp_c}° / ${day.day.mintemp_c}°
      </span>
    `;

        weeklyContainer.appendChild(card);
    });
}


async function callApi(city) {
    await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${api_key}=${city}&days=7&aqi=no&alerts=no`
    )
        .then(responce => responce.json())
        .then(data => {

            setCurrentDetails(data);
            setHourlyForecast(data.forecast.forecastday);
            setWeeklyForecast(data.forecast);

        })
}



// ----------Searching Location--------
searchCity.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let city = searchCity.value;
        callApi(city);
    }
});

searchBtn.addEventListener("click", () => {
    let city = searchCity.value;
    callApi(city);
});



// -------Set Weather Images--------
function setWeatherImage(timeStatus, weatherStatus) {

    let weatherText = weatherStatus.trim();
    let weather = weatherText.toLowerCase();

    // -------set day images------
    if (timeStatus === "day" && weather === "sunny") {
        return "assets/image/day/sunny.png";

    } else if (timeStatus === "day" && weather === "partly cloudy") {
        return "assets/image/day/partly cloud.png";

    } else if (timeStatus === "day" && weather === "cloudy" || timeStatus === "day" && weather === "clear") {
        return "assets/image/day/cloudy.png";

    } else if (timeStatus === "day" && weather === "overcast") {
        return "assets/image/day/overcast.png";

    } else if (timeStatus === "day" && weather === "mist") {
        return "assets/image/day/mist.png";

    } else if (timeStatus === "day" && weather === "patchy rain nearby") {
        return "assets/image/day/Patchy rain possible.png";

    } else if (timeStatus === "day" && weather === "patchy snow possible") {
        return "assets/image/day/patchy snow possible.png";

    } else if (timeStatus === "day" && weather === "patchy sleet possible") {
        return "assets/image/day/patchy sleet possible.png";

    } else if (timeStatus === "day" && weather === "patchy freezing drizzle possible") {
        return "assets/image/day/drizzless.png";

    } else if (timeStatus === "day" && weather === "thundery outbreaks possible") {
        return "assets/image/day/thunder.png";

    } else if (timeStatus === "day" && weather === "blowing snow") {
        return "assets/image/day/blooming snow.png";

    } else if (timeStatus === "day" && weather === "blizzard") {
        return "assets/image/day/Blizzard.png";

    } else if (timeStatus === "day" && weather === "fog") {
        return "assets/image/day/mist.png";

    } else if (timeStatus === "day" && weather === "freezing fog") {
        return "assets/image/day/mist.png";

    } else if (timeStatus === "day" && weather === "patchy light drizzle") {
        return "assets/image/day/drizzless.png";

    } else if (timeStatus === "day" && weather === "light drizzle") {
        return "assets/image/day/freeze drizzle.png";

    } else if (timeStatus === "day" && weather === "freezing drizzle") {
        return "assets/image/day/freeze drizzle.png";

    } else if (timeStatus === "day" && weather === "heavy freezing drizzle") {
        return "assets/image/day/freeze drizzle.png";

    } else if (timeStatus === "day" && weather === "patchy light rain") {
        return "assets/image/day/light rain.png";

    } else if (timeStatus === "day" && weather === "light rain") {
        return "assets/image/day/light rain.png";

    } else if (timeStatus === "day" && weather === "moderate rain at times") {
        return "assets/image/day/moderate rain.png";

    } else if (timeStatus === "day" && weather === "moderate rain") {
        return "assets/image/day/moderate rain.png";

    } else if (timeStatus === "day" && weather === "heavy rain at times") {
        return "assets/image/day/heavy rain.png";

    } else if (timeStatus === "day" && weather === "heavy rain") {
        return "assets/image/day/heavy rain.png";

    } else if (timeStatus === "day" && weather === "light freezing rain") {
        return "assets/image/day/light rain.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy freezing rain") {
        return "assets/image/day/heavy rain.png";

    } else if (timeStatus === "day" && weather === "light sleet") {
        return "assets/image/day/patchy sleet possible.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy sleet") {
        return "assets/image/day/sleet shower.png";

    } else if (timeStatus === "day" && weather === "patchy light snow") {
        return "assets/image/day/patchy snow possible.png";

    } else if (timeStatus === "day" && weather === "light snow") {
        return "assets/image/day/patchy snow possible.png";

    } else if (timeStatus === "day" && weather === "patchy moderate snow") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "moderate snow") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "patchy heavy snow") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "heavy snow") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "ice pellets") {
        return "assets/image/day/ice pleete.png";

    } else if (timeStatus === "day" && weather === "light rain shower") {
        return "assets/image/day/light rain.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy rain shower") {
        return "assets/image/day/heavy rain.png";

    } else if (timeStatus === "day" && weather === "torrential rain shower") {
        return "assets/image/day/moderate rain.png";

    } else if (timeStatus === "day" && weather === "light sleet showers") {
        return "assets/image/day/sleet shower.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy sleet showers") {
        return "assets/image/day/sleet shower.png";

    } else if (timeStatus === "day" && weather === "light snow showers") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy snow showers") {
        return "assets/image/day/modarate & heavy snow.png";

    } else if (timeStatus === "day" && weather === "light showers of ice pellets") {
        return "assets/image/day/ice pleete.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy showers of ice pellets") {
        return "assets/image/day/ice pleete.png";

    } else if (timeStatus === "day" && weather === "patchy light rain with thunder") {
        return "assets/image/day/light rain with thunder.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy rain with thunder") {
        return "assets/image/day/heavy rain with thunder.png";

    } else if (timeStatus === "day" && weather === "patchy light snow with thunder") {
        return "assets/image/day/light snow with thunder.png";

    } else if (timeStatus === "day" && weather === "moderate or heavy snow with thunder") {
        return "assets/image/day/light snow with thunder.png";
    }



    // ----set night images-------

    if (timeStatus === "night" && weather === "clear") {
        return "assets/image/night/moon.png";

    } else if (timeStatus === "night" && weather === "partly cloudy") {
        return "assets/image/night/partly cloud.png";

    } else if (timeStatus === "night" && weather === "cloudy") {
        return "assets/image/night/cloudy.png";

    } else if (timeStatus === "night" && weather === "overcast") {
        return "assets/image/night/overcast.png";

    } else if (timeStatus === "night" && weather === "mist") {
        return "assets/image/night/mist.png";

    } else if (timeStatus === "night" && weather === "patchy rain nearby") {
        return "assets/image/night/patchy rain possible.png";

    } else if (timeStatus === "night" && weather === "patchy snow possible") {
        return "assets/image/night/patchy snow possible.png";

    } else if (timeStatus === "night" && weather === "patchy sleet possible") {
        return "assets/image/night/patchy sleet possible.png";

    } else if (timeStatus === "night" && weather === "patchy freezing drizzle possible") {
        return "assets/image/night/light drezzless.png";

    } else if (timeStatus === "night" && weather === "thundery outbreaks possible") {
        return "assets/image/night/thunder.png";

    } else if (timeStatus === "night" && weather === "blowing snow") {
        return "assets/image/night/blooming snow1.png";

    } else if (timeStatus === "night" && weather === "blizzard") {
        return "assets/image/night/Blizzard.png";

    } else if (timeStatus === "night" && weather === "fog") {
        return "assets/image/night/mist.png";

    } else if (timeStatus === "night" && weather === "freezing fog") {
        return "assets/image/night/mist.png";

    } else if (timeStatus === "night" && weather === "patchy light drizzle") {
        return "assets/image/night/light drezzless.png";

    } else if (timeStatus === "night" && weather === "light drizzle") {
        return "assets/image/night/light drezzless.png";

    } else if (timeStatus === "night" && weather === "freezing drizzle") {
        return "assets/image/night/freeze dreezzle.png";

    } else if (timeStatus === "night" && weather === "heavy freezing drizzle") {
        return "assets/image/night/freeze dreezzle.png";

    } else if (timeStatus === "night" && weather === "patchy light rain") {
        return "assets/image/night/light rain.png";

    } else if (timeStatus === "night" && weather === "light rain") {
        return "assets/image/night/light rain.png";

    } else if (timeStatus === "night" && weather === "moderate rain at times") {
        return "assets/image/night/modarate rain.png";

    } else if (timeStatus === "night" && weather === "moderate rain") {
        return "assets/image/night/modarate rain.png";

    } else if (timeStatus === "night" && weather === "heavy rain at times") {
        return "assets/image/night/heavy rain.png";

    } else if (timeStatus === "night" && weather === "heavy rain") {
        return "assets/image/night/heavy rain.png";

    } else if (timeStatus === "night" && weather === "light freezing rain") {
        return "assets/image/night/light rain.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy freezing rain") {
        return "assets/image/night/heavy rain.png";

    } else if (timeStatus === "night" && weather === "light sleet") {
        return "assets/image/night/patchy sleet possible.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy sleet") {
        return "assets/image/night/sleet shower.png";

    } else if (timeStatus === "night" && weather === "patchy light snow") {
        return "assets/image/night/patchy snow possible.png";

    } else if (timeStatus === "night" && weather === "light snow") {
        return "assets/image/night/patchy snow possible.png";

    } else if (timeStatus === "night" && weather === "patchy moderate snow") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "moderate snow") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "patchy heavy snow") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "heavy snow") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "ice pellets") {
        return "assets/image/night/ice pleetes.png";

    } else if (timeStatus === "night" && weather === "light rain shower") {
        return "assets/image/night/light rain.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy rain shower") {
        return "assets/image/night/heavy rain.png";

    } else if (timeStatus === "night" && weather === "torrential rain shower") {
        return "assets/image/night/modarate rain.png";

    } else if (timeStatus === "night" && weather === "light sleet showers") {
        return "assets/image/night/sleet shower.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy sleet showers") {
        return "assets/image/night/sleet shower.png";

    } else if (timeStatus === "night" && weather === "light snow showers") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy snow showers") {
        return "assets/image/night/modarate & heavy snow.png";

    } else if (timeStatus === "night" && weather === "light showers of ice pellets") {
        return "assets/image/night/ice pleetes.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy showers of ice pellets") {
        return "assets/image/night/ice pleetes.png";

    } else if (timeStatus === "night" && weather === "patchy light rain with thunder") {
        return "assets/image/night/light rain with thunder.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy rain with thunder") {
        return "assets/image/night/heavy rain with thunder.png";

    } else if (timeStatus === "night" && weather === "patchy light snow with thunder") {
        return "assets/image/night/light snow with thunder.png";

    } else if (timeStatus === "night" && weather === "moderate or heavy snow with thunder") {
        return "assets/image/night/light snow with thunder.png";
    }
}