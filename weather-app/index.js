const apiKey = 'Your-api-key'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search Button")
const weatherIcon = document.querySelector(".weather-icon")


async function checkWeather(city) {
    const response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`)
    

    if (response.status == 404) {
        document.querySelector(".error-text").innerHTML = "Invalid City Name"
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = 'none'
    }
    else if (response.status == 401) {
        document.querySelector(".error-text").innerHTML = "Invalid Api Key"
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = 'none'
    }
    else {
        var data = await response.json()

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".hummidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"

        iconSrc = `images/${data.weather[0].main.toLowerCase()}.png`
        weatherIcon.src = iconSrc

        document.querySelector(".error-text").innerHTML = ""
        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = 'block'
    }
}

searchBtn.addEventListener('click', ()=>{
    let city = searchBox.value
    checkWeather(city)
})