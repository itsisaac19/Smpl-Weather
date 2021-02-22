var lon = localStorage.getItem('lon')
var lat = localStorage.getItem('lat')

if (localStorage.getItem('clientunits')) {

} else {
    localStorage.setItem('clientunits', 'imperial')
}

console.log(lat, lon)

function masterHourly () {
    fetch('https://data.climacell.co/v4/timelines?location='+ lat +'%2C'+ lon +'&fields=temperature&fields=temperatureApparent&fields=humidity&fields=windSpeed&fields=windDirection&fields=precipitationProbability&fields=weatherCode&timesteps=1h&units='+ localStorage.getItem('clientunits') +'&apikey=hb7YkfuADVORMAV7wlh6sV7pmmVvrSvv')
    .then(response => response.json())
    .then(data => {
        // Some animation to bring 'em in!
        document.querySelector('.weekdaytext').style.top = '0'
        document.querySelector('.weekdaytext').style.opacity = '1'

        console.log(data)
        var main =  data.data.timelines[0].intervals
        var hourwrap = document.querySelector('.hourscontent')

        for(hourloopnum = 0; hourloopnum < 12; hourloopnum++) {
            var weatherdesc = getweathercode(main[hourloopnum].values.weatherCode);
            var temp = main[hourloopnum].values.temperature.toFixed(0) + '°';
            var tempfeel = main[hourloopnum].values.temperatureApparent.toFixed(0) + '°';
            var windspeed = main[hourloopnum].values.windSpeed.toFixed(0) + 'mph';
            var precipchance = main[hourloopnum].values.precipitationProbability.toFixed(0) + '%';
            var humidity = main[hourloopnum].values.humidity.toFixed(0) + '%';

            var hoursec = document.createElement('div'); hoursec.classList.add('hoursection')

            var hourtime = document.createElement('div'); hourtime.classList.add('hourtime')
            var hourweatherdesc = document.createElement('div'); hourweatherdesc.classList.add('hourweatherdesc')
            var hourtemp = document.createElement('div'); hourtemp.classList.add('hourtemp')
            var hourfeelstemp = document.createElement('div'); hourfeelstemp.classList.add('hourfeelstemp')
            var hourwind = document.createElement('div'); hourwind.classList.add('hourwind')
            var hourprecip = document.createElement('div'); hourprecip.classList.add('hourprecip')
            var hourhumidity = document.createElement('div'); hourhumidity.classList.add('hourhumidity')

            if (localStorage.getItem('clientmodetime') && localStorage.getItem('clientmodetime') == '24') {
                hourtime.innerHTML =  moment().add(hourloopnum, 'hours').format('H') + ':00 '
            } else {
                hourtime.innerHTML =  moment().add(hourloopnum, 'hours').format('h') + ':00 ' + moment().add(hourloopnum, 'hours').format('a')
            }

            hourweatherdesc.innerHTML = weatherdesc
            hourtemp.innerHTML = temp
            hourfeelstemp.innerHTML = tempfeel
            hourwind.innerHTML = windspeed
            hourprecip.innerHTML = precipchance
            hourhumidity.innerHTML = humidity

            hoursec.appendChild(hourtime)
            hoursec.appendChild(hourweatherdesc)
            hoursec.appendChild(hourtemp)
            hoursec.appendChild(hourfeelstemp)
            hoursec.appendChild(hourwind)
            hoursec.appendChild(hourprecip)
            hoursec.appendChild(hourhumidity)

            hourwrap.appendChild(hoursec)
        }

         // Finally, the animation to bring 'em in!
        document.querySelector('.hourstable').style.top = '0'
        document.querySelector('.hourstable').style.opacity = '1'

        // Some animation to bring 'em in!
        document.querySelector('.graphtext').style.top = '0'
        document.querySelector('.graphtext').style.opacity = '1'


        setTimeout(charts, 100)
    })
}

function charts () {

    if (localStorage.getItem('clientmodetime') && localStorage.getItem('clientmodetime') ==  '24') {
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i].innerHTML =  moment().add(i, 'hours').format('H')
        }
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i + 8].innerHTML =  moment().add(i, 'hours').format('H') 
        }
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i + 16].innerHTML =  moment().add(i, 'hours').format('H')
        }
    } else {
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i].innerHTML =  moment().add(i, 'hours').format('h') + (moment().add(i, 'hours').format('a')).substr(0, 1)
        }
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i + 8].innerHTML =  moment().add(i, 'hours').format('h') + (moment().add(i, 'hours').format('a')).substr(0, 1)
        }
        for (i = 0; i < 8; i++) {
            var time = document.getElementsByClassName('timelabelgraph')
            time[i + 16].innerHTML =  moment().add(i, 'hours').format('h') + (moment().add(i, 'hours').format('a')).substr(0, 1)
        }
    }

    // TEMP
    var temp1  = document.getElementsByClassName('hourtemp')[0].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[0].innerHTML.length - 1)
    var temp2  = document.getElementsByClassName('hourtemp')[1].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[1].innerHTML.length - 1)
    var temp3  = document.getElementsByClassName('hourtemp')[2].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[2].innerHTML.length - 1)
    var temp4  = document.getElementsByClassName('hourtemp')[3].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[3].innerHTML.length - 1)
    var temp5  = document.getElementsByClassName('hourtemp')[4].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[4].innerHTML.length - 1)
    var temp6  = document.getElementsByClassName('hourtemp')[5].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[5].innerHTML.length - 1)
    var temp7  = document.getElementsByClassName('hourtemp')[6].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[6].innerHTML.length - 1)
    var temp8  = document.getElementsByClassName('hourtemp')[7].innerHTML.substr(0, document.getElementsByClassName('hourtemp')[7].innerHTML.length - 1)

    var ctxtemp = document.getElementById('tempgraphdisplay').getContext('2d');
    var chart = new Chart(ctxtemp, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                fill: false,
                backgroundColor: '#5C5C5C',
                borderColor: '#959595',
                data: [temp1, temp2, temp3, temp4, temp5, temp6, temp7, temp8]
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 20,
                    right: 40,
                    top: 0,
                    bottom: 0
                }
            },
            elements: {
                point: {
                    radius: 5
                },
            },
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        display: true,
                        stepSize : 2,
                        fontColor: 'rgb(0, 0, 0)'
                    }
                }],
            }
        }
    });
        
    // PRECIP
    var p1  = document.getElementsByClassName('hourprecip')[0].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[0].innerHTML.length - 1)
    var p2  = document.getElementsByClassName('hourprecip')[1].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[1].innerHTML.length - 1)
    var p3  = document.getElementsByClassName('hourprecip')[2].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[2].innerHTML.length - 1)
    var p4  = document.getElementsByClassName('hourprecip')[3].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[3].innerHTML.length - 1)
    var p5  = document.getElementsByClassName('hourprecip')[4].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[4].innerHTML.length - 1)
    var p6  = document.getElementsByClassName('hourprecip')[5].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[5].innerHTML.length - 1)
    var p7  = document.getElementsByClassName('hourprecip')[6].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[6].innerHTML.length - 1)
    var p8  = document.getElementsByClassName('hourprecip')[7].innerHTML.substr(0, document.getElementsByClassName('hourprecip')[7].innerHTML.length - 1)

    var ctxprecip=document.getElementById('precipgraphdisplay').getContext('2d');var chart=new Chart(ctxprecip,{type:'line',data:{labels:['','','','','','',''],datasets:[{fill:false,backgroundColor:'#5C5C5C',borderColor:'#5B727C',data:[p1,p2,p3,p4,p5,p6,p7,p8]}]},options:{layout:{padding:{left:20,right:40,top:0,bottom:0}},elements:{point:{radius:5},},responsive:true,maintainAspectRatio:false,legend:{display:false,},scales:{xAxes:[{gridLines:{display:false}}],yAxes:[{gridLines:{display:true},ticks:{display:true,stepSize : 20,fontColor:'rgb(0, 0, 0)'}}],}}});

    // WIND
    var w1  = document.getElementsByClassName('hourwind')[0].innerHTML.substr(0, document.getElementsByClassName('hourwind')[0].innerHTML.length - 3)
    var w2  = document.getElementsByClassName('hourwind')[1].innerHTML.substr(0, document.getElementsByClassName('hourwind')[1].innerHTML.length - 3)
    var w3  = document.getElementsByClassName('hourwind')[2].innerHTML.substr(0, document.getElementsByClassName('hourwind')[2].innerHTML.length - 3)
    var w4  = document.getElementsByClassName('hourwind')[3].innerHTML.substr(0, document.getElementsByClassName('hourwind')[3].innerHTML.length - 3)
    var w5  = document.getElementsByClassName('hourwind')[4].innerHTML.substr(0, document.getElementsByClassName('hourwind')[4].innerHTML.length - 3)
    var w6  = document.getElementsByClassName('hourwind')[5].innerHTML.substr(0, document.getElementsByClassName('hourwind')[5].innerHTML.length - 3)
    var w7  = document.getElementsByClassName('hourwind')[6].innerHTML.substr(0, document.getElementsByClassName('hourwind')[6].innerHTML.length - 3)
    var w8  = document.getElementsByClassName('hourwind')[7].innerHTML.substr(0, document.getElementsByClassName('hourwind')[7].innerHTML.length - 3)

    var ctxwind=document.getElementById('windgraphdisplay').getContext('2d');var chart=new Chart(ctxwind,{type:'line',data:{labels:['','','','','','',''],datasets:[{fill:false,backgroundColor:'#5C5C5C',borderColor:'#A9BEBB',data:[w1,w2,w3,w4,w5,w6,w7,w8]}]},options:{layout:{padding:{left:20,right:40,top:0,bottom:0}},elements:{point:{radius:5},},responsive:true,maintainAspectRatio:false,legend:{display:false,},scales:{xAxes:[{gridLines:{display:false}}],yAxes:[{gridLines:{display:true},ticks:{display:true,stepSize : 4,fontColor:'rgb(0, 0, 0)'}}],}}});

    // Finally, the animation to bring 'em in!
    document.querySelector('.graphswrap').style.top = '0'
    document.querySelector('.graphswrap').style.opacity = '1'


    adaptGraphs()
}

function callAll() {
    masterHourly()
}

window.onresize = adaptGraphs

function adaptGraphs () {
    var wrap = window.getComputedStyle(document.querySelector('.tempgraph')).getPropertyValue('width')
    console.log(wrap)
    for(i = 0; i < 3; i++) {
        if (document.getElementsByClassName('graphdisplaywrapper')[i]) {
            document.getElementsByClassName('graphdisplaywrapper')[i].style.width = wrap
        }
    }
}
