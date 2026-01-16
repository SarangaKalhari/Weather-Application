console.log("Js lodded!")

function callApi(){
    fetch("http://api.weatherapi.com/v1/forecast.json?key=59918b66dfa542389d3180337260901&q=galle&days=1&aqi=no&alerts=no")
    .then(responce => responce.json())
    .then(data => {
        console.log(data)
        setCurrentDetails(data);
        let forecast=data.forecast.forecastday[0].hour;
        console.log(forecast)
        setHourlyForecast(forecast);
    })
}

callApi();

function setCurrentDetails(currentDetails){
    let temp = document.getElementById("temp_id");
    let mainStatusImage = document.getElementById("weather_icon");
    let current =document.getElementById("current_weather");
    let cityName = document.getElementById("current_location");
    let date = document.getElementById("date");

    temp.innerText = currentDetails.current.temp_c;
    mainStatusImage.src = currentDetails.current.condition.icon;
    current.innerText = currentDetails.current.condition.text;
    cityName.innerText = currentDetails.location.name+", "+ currentDetails.location.country;
    date.innerText = currentDate;

}


function setHourlyForecast(forecast){

    let time = document.getElementById("hour_time");
    let img = document.getElementById("hour_status");
    let temp = document.getElementById("hour_temp");
    
    
    for (let index = 0; index < array.length; index++) {
    // const element = forecast[index];
    time.innerText = forecast[index].time;
    temp.innerText= forecast[index].temp_c;
    img.src = forecast[index].condition.icon;
}


} 



let date = new Date();

formatDate = {
    "weekday" : `long`,
    "month" : `long`,
    "year" : `numeric`,
    "day" : `numeric`
}

let currentDate = date.toLocaleDateString("en-US", formatDate);

console.log(currentDate);








