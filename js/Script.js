const API_KEY ="3f5d7ad59d2b26da3bd7261dda70b266";

function diplaybtn(){
    const  input = document.getElementById('input').value;
displayData(input);
}

function displayData(city){
    var city1 = document.getElementById('city');
        var country = document.getElementById('country');
        var tmp = document.getElementById('tmp');
        var humidty = document.getElementById('humidty');
        var wind = document.getElementById('wind');
        const forecastContainer = document.querySelector('.weather-forecast');
        const currentTempElem = document.getElementById('current-temp'); 
        const collicon =document.getElementById('iconp');

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=en`)
.then(reponse => reponse.json())
.then(data=>{

console.log(data)
tmp.textContent=data.list[0].main.temp+"°C";
wind.textContent=data.list[0].wind.speed+"km/h";
humidty.textContent=data.list[0].main.humidity+"%";

const todayWeather = data.list[0];
collicon.innerHTML = `
                <div class="location-container" id="iconp">
                    <div class="city" id="city"><i class="bx bxs-map-pin"></i><span>${city1.textContent=data.city.name}</span></div> 
                    <div class="country" id="country">${country.textContent=data.city.country}</div>
                    <img src="https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png" alt="Weather Icon" class="w-icon">
                    <div class="temp" id="tmp">${tmp.textContent=data.list[0].main.temp+"°C"}</div>
                </div>`;

currentTempElem.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}@2x.png" alt="Weather Icon" class="w-icon">
    <div class="other">
    <div class="day">Today</div>
    <div class="temp">Night - ${Math.round(todayWeather.main.temp_min)}°C</div>
    <div class="temp">Day - ${Math.round(todayWeather.main.temp_max)}°C</div>
    </div>
    `;

     forecastContainer.innerHTML = '';
            const days = {};

            data.list.forEach(weatherData => {
                const date = new Date(weatherData.dt_txt);
                const day = date.toLocaleDateString('en-US', { weekday: 'long' }); 

                if (!days[day]) {
                    days[day] = weatherData;
                    forecastContainer.innerHTML += `
                        <div class="weather-forecast-item">
                            <div class="day">${day}</div>
                            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Weather Icon" class="w-icon">
                            <div class="temp">Night - ${Math.round(weatherData.main.temp_min)}°C</div>
                            <div class="temp">Day - ${Math.round(weatherData.main.temp_max)}°C</div>
                        </div>
                    `;
                }
            });
}).catch(Error => alert("erorr"))};
