function getClientProperties () { // GET THE CLIENTS INFO

    if (localStorage.getItem('lat') && localStorage.getItem('lon')) { // IF THEIR COORDINATES ARE STORED
        console.log('location is saved')
        createClient(true); 
        
    }  else {
        localStorage.setItem('lat', '40')
        localStorage.setItem('lon', '-90')
        createClient()
    }
    
    function createClient(location) {
        var lat;
        var lon;

        lat = localStorage.getItem('lat') // Assign respective variables
        lon = localStorage.getItem('lon')
    

        if (location == true) { // If the client actually has a true location:
            var afterIndCIty = document.createElement('style');
afterIndCIty.innerHTML = `
.clientcity::after {
    content: '  - Current Location';
    color: #9c9c9c;
}
`
document.body.appendChild(afterIndCIty)

            if (localStorage.getItem('clientprop')) {
                var prev = JSON.parse(localStorage.getItem('clientprop'))
                if (prev.Properties.City) {  // If the client already has a city stored, DONT call the api (to reduce calls):
                    fetch('https://us1.locationiq.com/v1/reverse.php?key=01b9e5c630a3b1&lat=' + lat + '&lon='+ lon +'&format=json')
                    .then(response => response.json())
                    .then(data => {
                        var city1;
                        var city2;
                        var city3;
                        var weekday;
                        var date;
                        var time12hour;
                        var time24hour;

                        if (prev.Properties.City.length == 1) {
                            if (prev.Properties.City != data.address.city) {
                                city1 = prev.Properties.City
                                city2 = data.address.city
                            }  else {
                                city1 = prev.Properties.City
                            }
                        } else {
                            city1 = data.address.city
                        }


                        weekday = moment().format('dddd')
                        date = moment().format('D'+ '.' + 'MM' + '.' + 'YYYY')
                        time12hour = moment().format('h:mm')
                        time24hour = moment().format('H:mm')
                        ampm = moment().format('A')
                    
                        var client = { // Update the client info
                            "Properties": {
                                "City"  :  {
                                    "0": city1,
                                    "1": city2,
                                    "2": city3,
                                },
                                "Weekday": weekday,
                                "Date" : date,
                                "Time" : {
                                    "12": time12hour,
                                    "24": time24hour,
                                    "AP": ampm
                                }
                              }
                        }
                        console.log(client)
                        localStorage.setItem('clientprop', JSON.stringify(client)) // Store the updated client info in local storage
                        pageinit(localStorage.getItem('clientprop'), 0)
                    })


                }
            } else {
                fetch('https://us1.locationiq.com/v1/reverse.php?key=01b9e5c630a3b1&lat=' + lat + '&lon='+ lon +'&format=json')
                .then(response => response.json())
                .then(data => {
    
                    var city1;
                    var city2;
                    var city3;
                    var weekday;
                    var date;
                    var time12hour;
                    var time24hour;
                
                    city1 = data.address.city
                    weekday = moment().format('dddd')
                    date = moment().format('D'+ '.' + 'MM' + '.' + 'YYYY')
                    time12hour = moment().format('h:mm')
                    time24hour = moment().format('H:mm')
                    ampm = moment().format('A')
                
                    var client = { // Update the client info
                        "Properties": {
                            "City"  :  {
                                "0": city1,
                                "1": city2,
                                "2": city3,
                            },
                            "Weekday": weekday,
                            "Date" : date,
                            "Time" : {
                                "12": time12hour,
                                "24": time24hour,
                                "AP": ampm
                            }
                          }
                    }
                    console.log(client)
                    localStorage.setItem('clientprop', JSON.stringify(client)) // Store the updated client info in local storage
                    pageinit(localStorage.getItem('clientprop'), 0)
                })
            }





        } else { // If this is the first time the client is visiting (filler info - the user will have to add a city later):
            fetch('https://us1.locationiq.com/v1/reverse.php?key=01b9e5c630a3b1&lat=48.8566&lon=2.3522&format=json')
            .then(response => response.json())
            .then(data => {
                var city1;
                var city2;
                var city3;
                var weekday;
                var date;
                var time12hour;
                var time24hour;
            
                city1 = data.address.city
                weekday = moment().format('dddd')
                date = moment().format('D'+ '.' + 'MM' + '.' + 'YYYY')
                time12hour = moment().format('h:mm')
                time24hour = moment().format('H:mm')
                ampm = moment().format('A')
            
                var client = {
                    "Properties": {
                        "City"  :  {
                            "0": city1,
                            "1": city2,
                            "2": city3,
                        },
                        "Weekday": weekday,
                        "Date" : date,
                        "Time" : {
                            "12": time12hour,
                            "24": time24hour,
                            "AP": ampm
                        }
                      }
                }
                var tempclient = JSON.stringify(client)
                pageinit(tempclient, 0)
            })
        }

    }
}
getClientProperties()


function pageinit (client, citynum) {
    var clientproperties = JSON.parse(client)

    // CLIENT PROPERTIES
    document.querySelector('.clientcity').innerHTML = clientproperties.Properties.City[citynum]
    document.querySelector('.clientdate').innerHTML = clientproperties.Properties.Date
    document.querySelector('.clienthour').innerHTML = clientproperties.Properties.Time[12] + ' ' +  clientproperties.Properties.Time.AP 
    document.querySelector('.clientday').innerHTML = clientproperties.Properties.Weekday

    // ANIMATIONS
    var pageloader = document.querySelector('.pageloader')
    pageloader.style.opacity = '0'

    var topdetails = document.querySelector('.topdetails')
    topdetails.style.animation = 'topdetailsdrop 0.3s ease 0.5s 1 forwards'

    var sidebar = document.querySelector('.hourdisplay')
    sidebar.style.animation = 'hourdisplayslide 0.4s ease 0.7s 1 forwards'

    var maincontent = document.querySelector('.propertytempsplit')
    maincontent.style.animation = 'propertytempsplitsplash 0.4s ease 1.3s 1 forwards'

    var maincontent = document.querySelector('.bottomcontent')
    maincontent.style.animation = 'bottomcontentslide 0.4s ease 1s 1 forwards'

        // CLICK ANIMS:
        document.getElementsByClassName('clientcity')[0].addEventListener('click', function() {
            if (document.getElementsByClassName('cityoptions')[0].style.animation == '0.2s ease 0s 1 normal forwards running cityoptionspop') {
                document.getElementsByClassName('cityoptions')[0].style.animation =  'cityoptionshide 0.15s ease 0s 1 forwards';
            } else {
                document.getElementsByClassName('cityoptions')[0].style.animation =  'cityoptionspop 0.2s ease 0s 1 forwards'
            }
        })

    callAll()
}

function displayhours (twelve, ampm) {
    for (hournum = 0; hournum < 6; hournum++) {
        var hour12 = moment().add(hournum, 'hours').format('h')
        var hour24 = moment().add(hournum, 'hours').format('H')
        var amorpm = moment().add(hournum, 'hours').format('A')

        if (twelve == 'true') {
            document.getElementsByClassName('hour')[hournum].innerHTML  = hour12 + ':00'
        } else {
            document.getElementsByClassName('hour')[hournum].innerHTML  = hour24 + ':00'
        }

        if (ampm == 'true') {
            document.getElementsByClassName('hour')[hournum].innerHTML  =  document.getElementsByClassName('hour')[hournum].innerHTML + ' ' + amorpm
        }
    }
}
displayhours('true', 'true');

function displayweekdays () {
    for (daynum = 0; daynum < 7; daynum++) {
        var weekday = moment().add(daynum, 'days').format('ddd')
        document.getElementsByClassName('weekday')[daynum].innerHTML  = weekday
    }
}
displayweekdays()

// MAPBOX 
var theme;
var themeInd = window.getComputedStyle(document.querySelector('.largetempdisplay')).getPropertyValue('color')
if (themeInd == 'rgb(0, 0, 0)') {
    theme = 'mapbox://styles/itsisaac19/cklbsrlme1biv17nwa5di76r4'
} else {
    theme = 'mapbox://styles/itsisaac19/cklb2lft92h3317nxe8jvfdt1'
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzaXNhYWMxOSIsImEiOiJja2xiMmpraTEwZDIyMndvMzE5cGd1eTlyIn0.V2gQnHEAqZEugJKp82pUaQ';
var map = new mapboxgl.Map({
container: 'map',
style: theme,
center: [-93.118,45.08],
zoom: 9 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

document.getElementsByClassName('addcitylocation')[0].addEventListener('click', openmap)

function openmap () {
    document.querySelector('#map').style.animation = 'mappop 0.3s ease 0.2s 1 forwards'
    document.getElementsByClassName('addcitylocation')[0].removeEventListener('click', openmap)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createMarker);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}

function createMarker (pos) {
    var  lat = pos.coords.latitude
    var  lng = pos.coords.longitude

    var marker = new mapboxgl.Marker()
    .setLngLat([lng, lat])
    .addTo(map);

    document.querySelector('#map').style.animation = null
    document.querySelector('#map').style.opacity = '1'
    document.querySelector('#map').style.zIndex = '1000'
    document.querySelector('#map').style.transform = 'scale(1,1)'

    document.querySelector('.confirmoption').style.animation = 'confirmoptionslideup 0.2s ease 0.1s 1 forwards'
    document.querySelector('#denyoption').addEventListener('click', closeoptions)
    document.querySelector('#yesoption').addEventListener('click', function() {
        localStorage.setItem('lon', lng)
        localStorage.setItem('lat', lat)
        closeoptions()
        location.reload()
    })

    document.getElementsByClassName('addcitylocation')[0].addEventListener('click', openmap)
}

function closeoptions () {
    document.querySelector('.confirmoption').style.animation = null
    document.getElementsByClassName('cityoptions')[0].style.animation =  'cityoptionshide 0.15s ease 0s 1 forwards';
    document.querySelector('#map').style.animation = null
    document.querySelector('#map').style.opacity =null
    document.querySelector('#map').style.zIndex = null
    document.querySelector('#map').style.transform = null
}




