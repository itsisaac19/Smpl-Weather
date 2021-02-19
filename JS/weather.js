function currentweather () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1h&units=imperial&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var main =  data.data.timelines[0].intervals
        document.querySelector('.largetempdisplay').innerHTML = main[1].values.temperature.toFixed(0) + '°' + ' F'
        document.querySelector('.clientweatherdesc').innerHTML = getweathercode(main[1].values.weatherCode) 
    })
}


function dailyweather () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1d&units=imperial&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var main =  data.data.timelines[0].intervals
        for(day = 0; day < 7; day++) {
            document.getElementsByClassName('weekdaytemp')[day].innerHTML = main[day].values.temperature.toFixed(0) + '°'
        }
    })
}


function hourlyweather () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1h&units=imperial&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var main =  data.data.timelines[0].intervals
        for(hour = 1; hour < 7; hour++) {
            document.getElementsByClassName('hourtemp')[hour - 1].innerHTML = main[hour].values.temperature.toFixed(0) + '°'
        }
    })
}


function getweathercode(code) {
    if (code == 1000) {return 'clear'}
    if (code == 1001) {return 'Cloudy'}
    if (code == 1100) {return 'Mostly Clear'}
    if (code == 1101) {return 'Partly Cloudy'}
    if (code == 1102) {return 'Mostly Cloudy'}
    if (code == 2000) {return 'Fog'}
    if (code == 2100) {return 'Light Fog'}
    if (code == 3000) {return 'Light Wind'}
    if (code == 3001) {return 'Wind'}
    if (code == 3002) {return 'Strong Wind'}
    if (code == 4000) {return 'Drizzle'}
    if (code == 4001) {return 'Rain'}
    if (code == 4200) {return 'Light Rain'}
    if (code == 4201) {return 'Heavy Rain'}
    if (code == 5000) {return 'Snow'}
    if (code == 5001) {return 'Flurries'}
    if (code == 5100) {return 'Light Snow'}
    if (code == 5101) {return 'Heavy Snow'}
    if (code == 6000) {return 'Freezing Drizzle'}
    if (code == 6001) {return 'Freezing Rain'}
    if (code == 6200) {return 'Light Freezing Rain'}
    if (code == 6201) {return 'Heavy Freezing Rain'}
    if (code == 7000) {return 'Ice Pellets'}
    if (code == 7101) {return 'Heavy Ice Pellets'}
    if (code == 7102) {return 'Light Ice Pellets'}
    if (code == 8000) {return 'Thunderstorm'}
}


function callAll () {
    hourlyweather()
    dailyweather()
    currentweather()
}