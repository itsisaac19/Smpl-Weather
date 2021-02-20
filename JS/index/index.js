
function pageinit (client, citynum) {
    var clientproperties = JSON.parse(client)

    // CLIENT PROPERTIES
    document.querySelector('.clientcity').innerHTML = clientproperties.Properties.City[citynum]
    document.querySelector('.clientdate').innerHTML = clientproperties.Properties.Date
    document.querySelector('.clienthour').innerHTML = clientproperties.Properties.Time[12] + ' ' +  clientproperties.Properties.Time.AP 
    document.querySelector('.clientday').innerHTML = clientproperties.Properties.Weekday

    // ANIMATIONS
    var pageloader = document.querySelector('.pageloader')
    pageloader.style.opacity = '0'; setTimeout(function() {pageloader.style.display = 'none'}, 700)

    var topdetails = document.querySelector('.topdetails')
    topdetails.style.animation = 'topdetailsdrop 0.3s ease 0.5s 1 forwards'

    var sidebar = document.querySelector('.hourdisplay')
    sidebar.style.animation = 'hourdisplayslide 0.4s ease 0.7s 1 forwards'

    var maincontent = document.querySelector('.propertytempsplit')
    maincontent.style.animation = 'propertytempsplitsplash 0.4s ease 1.3s 1 forwards'

    var maincontent = document.querySelector('.bottomcontent')
    maincontent.style.animation = 'bottomcontentslide 0.4s ease 1s 1 forwards'

        // CLICK ANIMS:
        document.getElementsByClassName('clientcity')[0].addEventListener('click', cityoptions)

        document.getElementsByClassName('addcitylocation')[0].addEventListener('click', openmap)
        document.getElementsByClassName('addcity')[0].addEventListener('click', opensearch)

        document.getElementsByClassName('clientproperties')[0].addEventListener('click', showdesc)

        document.getElementById('setclick').addEventListener('click', showSettings)
        document.querySelector('.dayview').addEventListener('click', function() {
            changePage('hourly');
        })
    callAll()
}

function displayhours () {
    for (hournum = 0; hournum < 6; hournum++) {
        var hour12 = moment().add(hournum, 'hours').format('h')
        var hour24 = moment().add(hournum, 'hours').format('H')
        var amorpm = moment().add(hournum, 'hours').format('A')

        if (localStorage.getItem('clientmodetime') && localStorage.getItem('clientmodetime') ==  '24') {
            document.getElementsByClassName('hour')[hournum].innerHTML  = hour24 + ':00'
        } else {
            document.getElementsByClassName('hour')[hournum].innerHTML  = hour12 + ':00 ' + amorpm
        }
    }
}
displayhours();

function displayweekdays () {
    for (daynum = 0; daynum < 7; daynum++) {
        var weekday = moment().add(daynum, 'days').format('ddd')
        document.getElementsByClassName('weekday')[daynum].innerHTML  = weekday
    }
}
displayweekdays()




