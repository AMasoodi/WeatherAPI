var searchEl = $("#search")
var currentEl = $("#current")
var fiveDayEl = $("#fiveDay")
var apiKey = "5f5906c7a10138ba916a93d0ee77cf2d"
function searchHandler(){
    var event = $(this).siblings("input").val()
    geo(event)
}
function geo (city){
    var url = "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid="+apiKey
    fetch(url).then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        currentWeather(data[0].lat,data[0].lon)
        fiveDay(data[0].lat,data[0].lon)
    })
}
function currentWeather(lat,lon){
    var url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric"
    fetch(url).then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data)
        var html = `<div class="card col-md-2" style="width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${moment.unix(data.dt).format("DD/MM/YYYY")} City: ${data.name}</h5>
              <p class="card-text">Temp: ${data.main.temp}</p>
              <p class="card-text">Wind: ${data.wind.speed}</p>
            </div>
          </div>`
          currentEl.append(html)
    })
}
function fiveDay (lat,lon){
    var url ="https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+apiKey+"&units=metric"
    fetch(url).then(function(response){
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        for (let i = 5; i < data.list.length; i+=8) {
            const day = data.list[i];
            console.log(day)
            var html = `<div class="card col-md-2" style="width: 18rem;">
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${moment.unix(day.dt).format("DD/MM/YYYY")}</h5>
              <p class="card-text">Temp: ${day.main.temp}</p>
              <p class="card-text">Wind: ${day.wind.speed}</p>
            </div>
          </div>`
          fiveDayEl.append(html)
        }
    })
}
searchEl.on("click",searchHandler)