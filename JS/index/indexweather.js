function currentweather () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1h&units='+ localStorage.getItem('clientunits') +'&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var main =  data.data.timelines[0].intervals

        if (localStorage.getItem('clientunits') && localStorage.getItem('clientunits') == 'metric') {
            document.querySelector('.largetempdisplay').innerHTML = main[1].values.temperature.toFixed(0) + '°' + ' C'
        } else {
            document.querySelector('.largetempdisplay').innerHTML = main[1].values.temperature.toFixed(0) + '°' + ' F'
        }

        document.querySelector('.clientweatherdesc').innerHTML = getweathercode(main[1].values.weatherCode) 
    })
}


function dailyweather () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1d&units='+ localStorage.getItem('clientunits') +'&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
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

    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=weatherCode&timesteps=1h&units='+ localStorage.getItem('clientunits') +'&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var main =  data.data.timelines[0].intervals
        for(hour = 1; hour < 7; hour++) {
            document.getElementsByClassName('hourtemp')[hour - 1].innerHTML = main[hour].values.temperature.toFixed(0) + '°'
        }
    })
}

function weatherdescs () {
    var client = JSON.parse(localStorage.getItem('clientprop'))
    var lon = localStorage.getItem('lon')
    var lat = localStorage.getItem('lat')

    fetch('https://api.weather.gov/points/'+ lat +',' + lon)
	.then(response => response.json())
    .then(data => {
        fetch(data.properties.forecast)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.currentTextDesc').innerHTML = data['properties']['periods'][0]['detailedForecast']
        })
    })
}
function showdesc () {
    if (document.querySelector('.currentTextDesc').style.animation == '0.3s ease 0s 1 normal forwards running textdescshow') {
        hidedesc();
        return;
    } else {
    }
    document.querySelector('.currentTextDesc').style.animation = 'textdescshow 0.3s ease 0s forwards'
}
function hidedesc () {
    document.querySelector('.currentTextDesc').style.animation = 'textdeschide 0.2s ease 0s forwards'
}


function callAll () {
    hourlyweather()
    dailyweather()
    currentweather()
    weatherdescs()
}