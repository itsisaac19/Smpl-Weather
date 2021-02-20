function getClientProperties () { // GET THE CLIENTS INFO
    if (localStorage.getItem('lat') && localStorage.getItem('lon')) { // IF THEIR COORDINATES ARE STORED
        //console.log('location is saved')
        createClient(true); 
        //console.log(localStorage.getItem('lat'), localStorage.getItem('lon')  )
    }  else {
        localStorage.setItem('lat', '40') // PARIS COORDINATES FOR FILLER INFORMATION
        localStorage.setItem('lon', '-90')
        createClient()
    }
}
getClientProperties()

function createClient(location) {
    var lat = localStorage.getItem('lat') // Assign respective variables
    var lon = localStorage.getItem('lon')

    if (location == true) { // If the client actually has a true location:

        // RE - IMPLEMENT THIS ON THE CONDITION THAT THE CITY IS THEIR CURRENT LOCATION:
        if (localStorage.getItem('isClientLocationCurrent') == true) {
            var afterIndCIty = document.createElement('style'); afterIndCIty.innerHTML = `.clientcity::after {content: '  - Current Location';color: #9c9c9c;}`; document.body.appendChild(afterIndCIty)
        }

        var prev = JSON.parse(localStorage.getItem('clientprop'))

            fetch('https://us1.locationiq.com/v1/reverse.php?key=01b9e5c630a3b1&lat=' + lat + '&lon='+ lon +'&format=json')
            .then(response => response.json())
            .then(data => { 

            var tempLoca;
            if (data.address.city) {
                tempLoca = data.address.city + ', '  + data.address.state // If the city is available, use it
            } else {
                tempLoca = data.address.county + ', '  + data.address.state // Otherwise fallback to the county and state
            }

            var cities;
            cities = [] // Define cities as an empty array

            if (prev && prev.Properties.City.length > 0) { // IF THE PREVIOUS ARRAY HAS AT LEAST 1 CITY
                var dup = false
                for (i = 0; i < prev.Properties.City.length; i++) {
                    if (prev.Properties.City[i]) {
                        cities.push(prev.Properties.City[i]) // PUSH THE CITIES BACK INTO THEIR ARRAY
                    }
                    if (tempLoca == prev.Properties.City[i]) { // IF THE REQUESTED CITY IS ALREADY IN THE OLD ARRAY
                        dup = true
                        if (i != 0) {
                            delete cities[i] // DELETE THE CITY
                            cities.unshift(tempLoca) // PLACE IT IN FRONT
                        }
                    }
                }
                if (dup == false) { // OTHERWISE, IF IT ISN'T A DUPLICATE, PLACE IT IN FRONT
                    cities.unshift(tempLoca)
                }
            } else { // IF THE PREVIOUS ARRAY IS EMPTY, PUSH THE REQUESTED CITY INTO THE ARRAY
                cities.push(tempLoca)
            }

            //console.log(cities)

            var weekday = moment().format('dddd')
            var date = moment().format('D'+ '.' + 'MM' + '.' + 'YYYY')
            var time12hour = moment().format('h:mm')
            var time24hour = moment().format('H:mm')
            var ampm = moment().format('A')
                
                var client = { // Update the client info
                    "Properties": {
                        "City"  :  cities,
                    "Weekday": weekday,
                    "Date" : date,
                    "Time" : {
                        "12": time12hour,
                        "24": time24hour,
                        "AP": ampm
                        }
                    }
                }
                //console.log(client)
                localStorage.setItem('clientprop', JSON.stringify(client)) // Store the updated client info in local storage
                pageinit(localStorage.getItem('clientprop'), 0)
                })

    } else { // If this is the first time the client is visiting (filler info - the user will have to add a city later):
        fillerInfo()
    }
}

function fillerInfo ()  {
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


// CHANGE PAGE

function changePage(page) {
    window.location.href = page + '.html'
}





// UI STUFF





function cityoptions () {
    if (document.getElementsByClassName('cityoptions')[0].style.animation == '0.2s ease 0s 1 normal forwards running cityoptionspop') {
        document.querySelector('.cityoptions').style.display = 'none'
        console.log('hiding options')
        setTimeout(function() {
            document.getElementsByClassName('cityoptions')[0].style.animation =  'cityoptionshide 0.15s ease 0s 1 forwards';
            document.getElementById('map').style.display = 'none'
        })

    } else {
        document.getElementsByClassName('cityoptions')[0].style.animation =  'cityoptionspop 0.2s ease 0s 1 forwards'
        document.querySelector('.listofcities').style.animation = null
        document.querySelector('.searchcities').style.animation = null

        document.getElementById('map').style.animation = null

        setTimeout(function() {
            document.querySelector('.listofcities').style.display = 'none'
            document.querySelector('.searchcities').style.display = 'none'
            document.querySelector('.cityoptions').style.display = 'grid'
        })
    }
}

var showsettingstrueorfalsevarcustomwow = false
function showSettings () {
    if (showsettingstrueorfalsevarcustomwow == false) {
        var options = document.querySelector('.settingsoptions')
        options.style.display = 'grid'
        setTimeout(function() {
            options.style.animation = 'showsettingsoptions 0.3s ease 0s forwards'
        })

        showsettingstrueorfalsevarcustomwow = true
    } else {
        hideSettings()
    }

}
function hideSettings() {
    document.getElementById('setclick').removeEventListener('click', showSettings)

    var options = document.querySelector('.settingsoptions')
    options.style.animation = 'hidesettingsoptions 0.2s ease 0s forwards'
    setTimeout(function() {
        options.style.display = 'none'
        document.getElementById('setclick').addEventListener('click', showSettings)
    }, 200)

    showsettingstrueorfalsevarcustomwow = false
}

// MAPBOX 
/*
var theme;
var themeInd = window.getComputedStyle(document.querySelector('.largetempdisplay')).getPropertyValue('color')
if (themeInd == 'rgb(0, 0, 0)') {
    theme = 'mapbox://styles/itsisaac19/cklbsrlme1biv17nwa5di76r4'
} else {
    theme = 'mapbox://styles/itsisaac19/cklb2lft92h3317nxe8jvfdt1'
}*/

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzaXNhYWMxOSIsImEiOiJja2xiMmpraTEwZDIyMndvMzE5cGd1eTlyIn0.V2gQnHEAqZEugJKp82pUaQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/itsisaac19/cklb2lft92h3317nxe8jvfdt1',
center: [-93.118,45.08],
zoom: 9 // starting zoom
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

function openmap () {
    document.getElementById('map').style.animation = null
    document.querySelector('#map').style.display = 'block'

    setTimeout(function() {
        document.querySelector('.loaddots').style.display = 'block'
        document.querySelector('#map').style.animation = 'mappop 0.3s ease 0s 1 forwards'
    }, 100)
    document.getElementsByClassName('addcitylocation')[0].removeEventListener('click', openmap)

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(createMarker, showError);
    } else {
        alert("Geolocation is not supported by this browser.")
    }
}
function showError(error) {
    setTimeout(function() {
        document.getElementsByClassName('addcitylocation')[0].addEventListener('click', openmap)
    } , 100)

    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("Error: User blocked location. Click add city to search for your city.")
          document.querySelector('.error-map').innerHTML = "Error: User blocked location. Click add city to search for your city, or change your permissions to allow location services"
          break;
        case error.POSITION_UNAVAILABLE:
            document.querySelector('.error-map').innerHTML =  "Location information is unavailable."
          break;
        case error.TIMEOUT:
            document.querySelector('.error-map').innerHTML =  "The request to get user location timed out."
          break;
        case error.UNKNOWN_ERROR:
            document.querySelector('.error-map').innerHTML =  "An unknown error occurred."
          break;
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

    document.querySelector('.loaddots').style.display = null

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

    document.querySelector('.cityoptions').style.display = 'none'
    console.log('hiding options')
    setTimeout(function() {
        document.getElementById('map').style.display = 'none'
    })
}


// MAPBOX GEOCODING -- ADD CITY VIA SEARCH

function opensearch () {
    closeoptions()
    var search = document.querySelector('.searchcities')
    var list = document.querySelector('.listofcities')

    search.style.display = 'grid'
    list.style.display = 'grid'

    setTimeout(function() {
        search.style.animation = 'slideupsearch 0.3s ease 0s 1 forwards'
    })
}

function searchCity (textquery) {
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + textquery+ '.json?access_token=pk.eyJ1IjoiaXRzaXNhYWMxOSIsImEiOiJja2xiMmpraTEwZDIyMndvMzE5cGd1eTlyIn0.V2gQnHEAqZEugJKp82pUaQ')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        var wrap = document.querySelector('.listofcities'); wrap.innerHTML = ''

        for (list = 0; list < data.features.length; list++) {
            var e = document.createElement('div'); e.classList.add('listitem');
            var texte = document.createElement('div'); 
            texte.innerHTML = data.features[list].place_name;

            var afterCoordinatesLat = document.createElement('span');
            var afterCoordinatesLon = document.createElement('span');
            var lat = (data.features[list].geometry.coordinates[1])
            var lon = (data.features[list].geometry.coordinates[0])

            afterCoordinatesLat.innerHTML = lat
            afterCoordinatesLat.style.display = 'none'

            afterCoordinatesLon.innerHTML = lon
            afterCoordinatesLon.style.display = 'none'

            e.appendChild(texte);
            texte.appendChild(afterCoordinatesLat)
            texte.appendChild(afterCoordinatesLon)
            wrap.appendChild(e)

            e.addEventListener('click', selectCity)

            //console.log(data.features[list].place_name)
            //console.log(data.features[list].geometry.coordinates[0])
            //console.log(data.features[list].geometry.coordinates[1])
        }


    })
}
function selectCity () {
    console.log(this.children[0].children[0].innerHTML)
    localStorage.setItem('lat', this.children[0].children[0].innerHTML)
    localStorage.setItem('lon', this.children[0].children[1].innerHTML)

    console.log(localStorage.getItem('lat'), localStorage.getItem('lon')  )
    location.reload()
}

var searchlistdropped = false;

document.querySelector('.searchcities').addEventListener('keydown', function() {
    var searchtext = document.getElementById('search-city').value
    if (searchtext.length > 1) {
        searchCity(searchtext)
    }
    if (searchtext.length > 1) {
        if (searchlistdropped == false) {
            document.querySelector('.listofcities').style.animation = 'slideuplist 0.3s ease 0s 1 forwards'
            searchlistdropped = true
        } 
    }
    if (searchtext.length == 1) {
        document.querySelector('.listofcities').style.animation = null
        searchlistdropped = false
    }
})




// CLIENT UNIT/PREFERENCES SETTINGS


// UNITS
document.querySelector('.unit-metric').addEventListener('click', changeClientUnits)
document.querySelector('.unit-imperial').addEventListener('click', changeClientUnits)

function changeClientUnits() {
    this.parentElement.children[0].style.backgroundColor = '#f8f7f0';
    this.parentElement.children[1].style.backgroundColor = '#f8f7f0';

    this.style.backgroundColor = '#e6e4d4';

    localStorage.setItem('clientunits', this.classList[2])
    console.log(localStorage.getItem('clientunits'))

    location.reload()
}

if(localStorage.getItem('clientunits')) {
    document.getElementsByClassName(localStorage.getItem('clientunits'))[0].style.backgroundColor ='#e6e4d4';
} else {
    localStorage.setItem('clientunits', 'imperial')
}


// TIME
document.querySelector('.timetype-12').addEventListener('click', changeClientTimeMode)
document.querySelector('.timetype-24').addEventListener('click', changeClientTimeMode)

function changeClientTimeMode() {
    this.parentElement.children[0].style.backgroundColor = '#f8f7f0';
    this.parentElement.children[1].style.backgroundColor = '#f8f7f0';

    this.style.backgroundColor = '#e6e4d4';

    localStorage.setItem('clientmodetime', this.classList[2])
    console.log(localStorage.getItem('clientmodetime'))

    location.reload()
}

if(localStorage.getItem('clientmodetime')) {
    document.getElementsByClassName(localStorage.getItem('clientmodetime'))[0].style.backgroundColor ='#e6e4d4';
} else {
    localStorage.setItem('clientmodetime', '12')
}