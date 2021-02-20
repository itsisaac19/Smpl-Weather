function pageinit (client, citynum) {
    var clientproperties = JSON.parse(client)

    // CLIENT PROPERTIES 
    
    document.querySelector('.clientcity').innerHTML = clientproperties.Properties.City[citynum]
    document.querySelector('.clientdate').innerHTML = clientproperties.Properties.Date

    /*
    document.querySelector('.clienthour').innerHTML = clientproperties.Properties.Time[12] + ' ' +  clientproperties.Properties.Time.AP */
    //document.querySelector('.clientday').innerHTML = clientproperties.Properties.Weekday 

    // ANIMATIONS
    var pageloader = document.querySelector('.pageloader')
    pageloader.style.opacity = '0'; setTimeout(function() {pageloader.style.display = 'none'}, 700)

    var topdetails = document.querySelector('.topdetails')
    topdetails.style.animation = 'topdetailsdrop 0.3s ease 0.5s 1 forwards'





    var maincontent = document.querySelector('.bottomcontent')
    maincontent.style.animation = 'bottomcontentslide 0.4s ease 1s 1 forwards'

        // CLICK ANIMS:
        document.getElementsByClassName('clientcity')[0].addEventListener('click', cityoptions)

        document.getElementsByClassName('addcitylocation')[0].addEventListener('click', openmap)
        document.getElementsByClassName('addcity')[0].addEventListener('click', opensearch)

        //document.getElementsByClassName('clientproperties')[0].addEventListener('click', showdesc)

        document.getElementById('setclick').addEventListener('click', showSettings)
        document.querySelector('.dayview').addEventListener('click', function() {
            changePage('index');
        })
    callAll()
}