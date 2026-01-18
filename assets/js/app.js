console.log("Js lodded!")

function callApi() {
    fetch("http://api.weatherapi.com/v1/forecast.json?key=59918b66dfa542389d3180337260901&q=panadura&days=1&aqi=no&alerts=no")
        .then(responce => responce.json())
        .then(data => {
            // console.log(data)
            // console.log(data.forecast)
            setCurrentDetails(data);
            // console.log(data.forecast.forecastday[0]);
            setHourlyForecast(data.forecast.forecastday);

            // let forecast=data.forecast.forecastday[0].hour;
            // console.log(forecast)
            // setHourlyForecast(forecast);
        })
}

callApi();

function setCurrentDetails(currentDetails) {
    let temp = document.getElementById("temp_id");
    let mainStatusImage = document.getElementById("weather_icon");
    let current = document.getElementById("current_weather");
    let cityName = document.getElementById("current_location");
    let date = document.getElementById("date");
    let uv = document.getElementById("uv_index");
    let pressure = document.getElementById("pressure");
    let airQuality = document.getElementById("cloud");
    let humidity = document.getElementById("humidity_per");
    let windSpeed = document.getElementById("wind_speed");
    let feelLike = document.getElementById("feel_like");
    let heat = document.getElementById("heat_index");
    let dew = document.getElementById("dew_point");
    let vis = document.getElementById("visibility");
    let precep = document.getElementById("precep");
    let direction = document.getElementById("wind_direction");
    let chil = document.getElementById("wind_chil");

    temp.innerText = currentDetails.current.temp_c;
    mainStatusImage.src = currentDetails.current.condition.icon;
    current.innerText = currentDetails.current.condition.text;
    cityName.innerText = currentDetails.location.name + ", " + currentDetails.location.country;
    date.innerText = currentDate;

    uv.innerText = currentDetails.current.uv;
    pressure.innerText = currentDetails.current.pressure_mb;
    airQuality.innerText = currentDetails.current.cloud;
    humidity.innerText = currentDetails.current.humidity;
    windSpeed.innerText = currentDetails.current.wind_kph;
    feelLike.innerText = currentDetails.current.feelslike_c;
    heat.innerText = currentDetails.current.heatindex_c;
    dew.innerText = currentDetails.current.dewpoint_c;
    vis.innerText = currentDetails.current.vis_km;
    precep.innerText = currentDetails.current.precip_mm;
    direction.innerText = currentDetails.current.wind_dir;
    chil.innerText = currentDetails.current.windchill_c;
}


function setHourlyForecast(forecast) {

    const container = document.getElementById("hourly_container");
  container.innerHTML = ""; // clear old cards


    const hours = forecast[0].hour;

    hours.forEach(hour => {

        // Format time → "02 PM"
        const time = new Date(hour.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Create card
        const card = document.createElement("div");
        card.className = "min-w-[90px] bg-[#0b1220] rounded-xl p-3 text-center";

        card.innerHTML = `
        <p class="text-sm text-gray-400">${time}</p>
        <img src="https:${hour.condition.icon}" class="w-10 h-10 mx-auto my-2">
        <p class="font-semibold">${hour.temp_c}°C</p>
        <p class="text-xs text-gray-400">${hour.condition.text}</p>
    `;

        container.appendChild(card);
    });


}



let date = new Date();

formatDate = {
    "weekday": `long`,
    "month": `long`,
    "year": `numeric`,
    "day": `numeric`
}

let currentDate = date.toLocaleDateString("en-US", formatDate);

console.log(currentDate);










