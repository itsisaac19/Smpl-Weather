var lon = localStorage.getItem('lon')
var lat = localStorage.getItem('lat')

if (localStorage.getItem('clientunits')) {

} else {
    localStorage.setItem('clientunits', 'imperial')
}

function masterWeekly () {
    // DAY AND NIGHT TEMPERATURES

    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&exclude=current,minutely,hourly,alerts&units=imperial&appid=226665da3951803c74770f482ea4c65b')
    .then(response => response.json())
    .then(data => {

        for(i = 0; i < 7; i++) {
            var templateHTML = document.createElement('div'); templateHTML.classList.add('daycard'); templateHTML.innerHTML = `
            <div class="weekdaytitle"></div>
    
            <div class="weatherdesc"></div>
    
            <div class="section">
                <div class="precipday">
                    <div class="preciptext">Precipitation</div>
                    <div class="precipvalue"></div>
                </div>
                <div class="humidityday">
                    <div class="humiditytext">Humidity</div>
                    <div class="humidityvalue"></div>
                </div>
            </div>
    
            <hr>
    
            <div class="section2">
                <div class="daytemp">
                    <div class="daytemptext">Day</div>
                    <div class="daytempvalue"></div>
                </div>
                <div class="nighttemp">
                    <div class="nighttemptext">Night</div>
                    <div class="nighttempvalue"></div>
                </div>
            </div>
            `
            document.querySelector('.daycardscontent').appendChild(templateHTML)
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        if(localStorage.getItem('clientunits') && localStorage.getItem('clientunits') == 'metric') {
            unitTemp = '° C'
        } else {
            unitTemp = '° F'
        }

        for(i = 0; i < 7; i++) {
            // Moment weekday
            document.getElementsByClassName('weekdaytitle')[i].innerHTML = moment().add(i, 'days').format('dddd')

            document.getElementsByClassName('weatherdesc')[i].innerHTML = capitalizeFirstLetter(data.daily[i].weather[0].description)

            document.getElementsByClassName('daytempvalue')[i].innerHTML = data.daily[i].temp.day.toFixed(0) + unitTemp
            document.getElementsByClassName('nighttempvalue')[i].innerHTML = data.daily[i].temp.night.toFixed(0) + unitTemp

            document.getElementsByClassName('humidityvalue')[i].innerHTML = data.daily[i].humidity.toFixed(0) + '%'

            if (data.daily[i].rain && data.daily[i].snow) {
                if (parseFloat(data.daily[i].rain) > parseFloat(data.daily[i].snow)) {
                    document.getElementsByClassName('preciptext')[i].innerHTML = document.getElementsByClassName('preciptext')[i].innerHTML + ' - rain'
                    document.getElementsByClassName('precipvalue')[i].innerHTML = data.daily[i].rain.toFixed(0) + 'mm'
                } else {
                    document.getElementsByClassName('preciptext')[i].innerHTML = document.getElementsByClassName('preciptext')[i].innerHTML + ' - snow'
                    document.getElementsByClassName('precipvalue')[i].innerHTML = data.daily[i].snow.toFixed(0) + 'mm'
                }
            } else {
                if (data.daily[i].rain) {
                    document.getElementsByClassName('preciptext')[i].innerHTML = document.getElementsByClassName('preciptext')[i].innerHTML + ' - rain'
                    document.getElementsByClassName('precipvalue')[i].innerHTML = data.daily[i].rain.toFixed(0) + 'mm'
                }
                if (data.daily[i].snow) {
                    document.getElementsByClassName('preciptext')[i].innerHTML = document.getElementsByClassName('preciptext')[i].innerHTML + ' - snow'
                    document.getElementsByClassName('precipvalue')[i].innerHTML = data.daily[i].snow.toFixed(0) + 'mm'
                }
            }
            if (data.daily[i].rain || data.daily[i].snow) {} else {document.getElementsByClassName('precipvalue')[i].innerHTML =  '0mm'}
        }

        document.querySelector('.weekrangetext').style.top = '0'
        document.querySelector('.weekrangetext').style.opacity = '1'

        setTimeout(function() {
            document.querySelector('.daycardswrap').style.top = '0'
            document.querySelector('.daycardswrap').style.opacity = '1'
        }, 100)


        setTimeout(charts, 200)
    })
}

function charts () {

    for (i = 0; i < 7; i++) {
        var time = document.getElementsByClassName('timelabelgraph')
        time[i].innerHTML =  moment().add(i, 'days').format('ddd')
    }
    for (i = 0; i < 7; i++) {
        var time = document.getElementsByClassName('timelabelgraph')
        time[i+7].innerHTML =  moment().add(i, 'days').format('ddd')
    }
    for (i = 0; i < 7; i++) {
        var time = document.getElementsByClassName('timelabelgraph')
        time[i+14].innerHTML =  moment().add(i, 'days').format('ddd')
    }


    // TEMP
    var temp1  = document.getElementsByClassName('daytempvalue')[0].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[0].innerHTML.length - 3)
    var temp2  = document.getElementsByClassName('daytempvalue')[1].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[1].innerHTML.length - 3)
    var temp3  = document.getElementsByClassName('daytempvalue')[2].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[2].innerHTML.length - 3)
    var temp4  = document.getElementsByClassName('daytempvalue')[3].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[3].innerHTML.length - 3)
    var temp5  = document.getElementsByClassName('daytempvalue')[4].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[4].innerHTML.length - 3)
    var temp6  = document.getElementsByClassName('daytempvalue')[5].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[5].innerHTML.length - 3)
    var temp7  = document.getElementsByClassName('daytempvalue')[6].innerHTML.substr(0, document.getElementsByClassName('daytempvalue')[6].innerHTML.length - 3)

    var ctxtemp = document.getElementById('tempgraphdisplay').getContext('2d');
    var chart = new Chart(ctxtemp, {
        type: 'line',
        data: {
            labels: ['', '', '', '', '', '', ''],
            datasets: [{
                fill: false,
                backgroundColor: '#5C5C5C',
                borderColor: '#959595',
                data: [temp1, temp2, temp3, temp4, temp5, temp6, temp7]
            }]
        },
        options: {
            layout: {
                padding: {
                    left: 10,
                    right: 80,
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
                    },
                }],
            }
        }
    });
        
    
    // PRECIP
    var p1  = document.getElementsByClassName('precipvalue')[0].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[0].innerHTML.length - 2)
    var p2  = document.getElementsByClassName('precipvalue')[1].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[1].innerHTML.length - 2)
    var p3  = document.getElementsByClassName('precipvalue')[2].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[2].innerHTML.length - 2)
    var p4  = document.getElementsByClassName('precipvalue')[3].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[3].innerHTML.length - 2)
    var p5  = document.getElementsByClassName('precipvalue')[4].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[4].innerHTML.length - 2)
    var p6  = document.getElementsByClassName('precipvalue')[5].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[5].innerHTML.length - 2)
    var p7  = document.getElementsByClassName('precipvalue')[6].innerHTML.substr(0, document.getElementsByClassName('precipvalue')[6].innerHTML.length - 2)

    var ctxprecip=document.getElementById('precipgraphdisplay').getContext('2d');var chart=new Chart(ctxprecip,{type:'line',data:{labels:['','','','','','',''],datasets:[{fill:false,backgroundColor:'#5C5C5C',borderColor:'#5B727C',data:[p1,p2,p3,p4,p5,p6,p7]}]},options:{layout:{padding:{left:10,right:80,top:0,bottom:0}},elements:{point:{radius:5},},responsive:true,maintainAspectRatio:false,legend:{display:false,},scales:{xAxes:[{gridLines:{display:false}}],yAxes:[{gridLines:{display:true},scaleLabel: {display: true,labelString: 'mm'},ticks:{display:true,stepSize : 1,fontColor:'rgb(0, 0, 0)'}}],}}});

    // HUMIDITY
    var w1  = document.getElementsByClassName('humidityvalue')[0].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[0].innerHTML.length - 1)
    var w2  = document.getElementsByClassName('humidityvalue')[1].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[1].innerHTML.length - 1)
    var w3  = document.getElementsByClassName('humidityvalue')[2].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[2].innerHTML.length - 1)
    var w4  = document.getElementsByClassName('humidityvalue')[3].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[3].innerHTML.length - 1)
    var w5  = document.getElementsByClassName('humidityvalue')[4].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[4].innerHTML.length - 1)
    var w6  = document.getElementsByClassName('humidityvalue')[5].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[5].innerHTML.length - 1)
    var w7  = document.getElementsByClassName('humidityvalue')[6].innerHTML.substr(0, document.getElementsByClassName('humidityvalue')[6].innerHTML.length - 1)

    var ctxwind=document.getElementById('humiditygraphdisplay').getContext('2d');var chart=new Chart(ctxwind,{type:'line',data:{labels:['','','','','','',''],datasets:[{fill:false,backgroundColor:'#5C5C5C',borderColor:'#A9BEBB',data:[w1,w2,w3,w4,w5,w6,w7]}]},options:{layout:{padding:{left:10,right:80,top:0,bottom:0}},elements:{point:{radius:5},},responsive:true,maintainAspectRatio:false,legend:{display:false,},scales:{xAxes:[{gridLines:{display:false}}],yAxes:[{gridLines:{display:true},scaleLabel: {display: true,labelString: '%'},ticks:{display:true,stepSize : 5,fontColor:'rgb(0, 0, 0)'}}],}}});

    // Finally, the animation to bring 'em in!
    setTimeout(function() {
        document.querySelector('.graphswrap').style.top = '0'
        document.querySelector('.graphswrap').style.opacity = '1'
    }, 200)



    adaptGraphs()
}

function callAll() {
    masterWeekly()
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
