const api= {
    key:"58b656372981e725a960487954372968",
    base:"https://api.openweathermap.org/data/2.5/"
}

const search =document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput(event){
    event.preventDefault();
    if(event.type =="click"){
        getData(search.value);
    }
}

function getData(){
    const link=`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`
    fetch(link)
    .then(response => {
        return response.json();
    }).then(displayData);
}


function displayData (response){
    //console.log(response);
    if(response.cod ==="404"){
        const error =document.querySelector(".error");
        error.textContent = "please enter a valid city";
        search.value="";
        }else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name},${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)}<span>°c</span>`;
        
        const weather = document.querySelector(".weather");
        weather.innerText = `Weather: ${response.weather[0].main}`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerText = `Temp Range: ${Math.round(response.main.temp_min)}°c / ${Math.round(response.main.temp_max)}°c`;
        
        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "https://openweathermap.org/img/wn/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction (d) {
    let months = ["Jan","Feb","Mar","Apr","may","June","July","Aug","Sep","Oct","Nov","Dec"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}