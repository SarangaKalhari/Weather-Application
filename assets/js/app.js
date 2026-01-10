console.log("Js lodded!")

function callApi(){
    fetch("http://api.weatherapi.com/v1/current.json?key=59918b66dfa542389d3180337260901&q=galle&aqi=no")
    .then(responce => responce.json())
    .then(data => console.log(data))
}

callApi();

let date = new Date();

formatDate = {
    "weekday" : `long`,
    "month" : `long`,
    "year" : `numeric`,
    "day" : `numeric`
}

let currentDate = date.toLocaleDateString("en-US", formatDate);

console.log(currentDate);




// let searchCity=document.getElementById("txtSearch");

// searchCity.addEventListener("keypress",e=>{
//     if(e.key=='Enter'){
//         console.log(searchCity.value);
//         callApi(searchCity.value.trim());
//     }

// })

// async function callApi(cityName=""){
//     // fetch("http://api.weatherapi.com/v1/current.json?key=d774df04809f4737acb70252251308&q=ganemulla&aqi=no")
//     // .then(responce => responce.json())
//     // .then(data => console.log(data))

//     fetch(`http://api.weatherapi.com/v1/current.json?key=968ff581242d4e59a6c150445252108&q=${cityName}&aqi=no`)
//     .then((responce) => responce.json())
//     .then((data) => {
//         setDetails(data);
//     });

//     // let responce=await fetch("http://api.weatherapi.com/v1/current.json?key=d774df04809f4737acb70252251308&q=ganemulla&aqi=no");
//     // let data=await responce.json();
//     // console.log(data);

// }


// function setDetails(countryDetails){
//     let cityName=document.getElementById("city_name");
//     let mainStatusImage=document.getElementById("main_status_image");
//     let countryName=document.getElementById("country_name");
//     let temperature=document.getElementById("current_temperature");
//     let uvMeter=document.getElementById("uv_value");
//     let humidityMeter=document.getElementById("humidity_value");
//     let windMeter=document.getElementById("wind_value");

    
//     cityName.innerText=countryDetails.location.name;
//     mainStatusImage.src=countryDetails.current.condition.icon
//     countryName.innerText=countryDetails.location.country;
//     temperature.innerText = countryDetails.current.temp_c;
//     uvMeter.innerText=countryDetails.current.uv;
//     humidityMeter.innerText=countryDetails.current.humidity;
//     windMeter.innerText=countryDetails.current.wind_kph+"kph";

// }

// callApi();

// //----set date-----
// let date=new Date();
// formatDate = {
//     "weekend":`long`,
//     "month":`long`,
//     "year":`numeric`,
//     "day":`numeric`
// }

// // let currentDate=date.toLocaleDateString("en-US",formatDate);
// // document.getElementById("date").innerText=currentDate;
// //---------
