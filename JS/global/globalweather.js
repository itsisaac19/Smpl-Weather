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