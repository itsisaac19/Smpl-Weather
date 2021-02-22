function pageinit (client, citynum) {
    var clientproperties = JSON.parse(client)

    // CLIENT PROPERTIES 
    
    document.querySelector('.clientcity').innerHTML = clientproperties.Properties.City[citynum]
    document.querySelector('.clientdate').innerHTML = clientproperties.Properties.Date
    //document.querySelector('.weekrangetext').innerHTML = clientproperties.Properties.Weekday

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

/*

// DISABLE SCROLL IF HORIZONTALLY SCROLLING
function preventDefault(e) {
    e.preventDefault();
}
// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}
var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';



var daycards = document.querySelector('.daycardswrap')

daycards.addEventListener("mouseenter", function()  {
    //console.warn("detected that mouse entered")

    function handler(e) {

        if (localStorage.getItem("isMouseOverdaycards") == "yes") {
            var isTouchPad = e.wheelDeltaY ? e.wheelDeltaY === -3 * e.deltaY : e.deltaMode === 0
            var IsMouse =  (isTouchPad ? "isTouchPad" : "isMouse") 
        
            if (IsMouse == "isMouse") {
                if (e.deltaY > 0) {
                    daycards.scrollLeft += 20;
                } else {
                    daycards.scrollLeft -= 20;
                }
            } 
        } else {
            //console.warn("dss")
        }
    }
    //when the user scrolls, call the above function
    document.body.addEventListener("mousewheel", handler, false);
    document.body.addEventListener("DOMMouseScroll", handler, false);
});

daycards.onmouseenter = function () {
    localStorage.setItem("isMouseOverdaycards", "yes")
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
}
daycards.onmouseleave = function () {
    localStorage.setItem("isMouseOverdaycards", "no")
    window.removeEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.removeEventListener('touchmove', preventDefault, wheelOpt); // mobile
}*/

function weekRangeDisplay () {
    var month = moment().format('MMMM')
    var monthAb = moment().format('MMM')

    var rangeStart = moment().format('d')
    var rangeEnd;
    var calcToEnd;

    if (rangeStart == 0) {
        rangeStart = moment().format('D')
        rangeEnd = moment().add('6', 'days').format('D')
    } else {
        calcToEnd = (6 - rangeStart)
        rangeEnd = moment().add(calcToEnd, 'days').format('D')
        rangeStart = moment().subtract(rangeStart, 'days').format('D');
    }
    document.querySelector('.weekrangetext').innerHTML = month + ' ' + rangeStart + ' - ' + rangeEnd

    // AFTER STYLE DISPLAY
    var graphwrap = document.getElementsByClassName('titlegraph')
    for (i = 0; i < 3; i++) {
        var textAfter = document.createElement('span'); textAfter.innerHTML = ' &nbsp' + ' ' + monthAb + ' ' + rangeStart + ' - ' + rangeEnd;
        textAfter.style.color = '#A3A3A3'
        textAfter.style.fontWeight = '400'
        graphwrap[i].appendChild(textAfter)
    }

}
weekRangeDisplay()

