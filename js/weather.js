const weather = document.querySelector('.weather');
//https://home.openweathermap.org/
const API_KEY = 'eebedd7fbd8382cd1f41f22ae440820e'

// 1.1
const COORDS = 'coords';

// 6.1
function getWeather(lat, log) {
  // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}`);
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`)
  .then(function(response) {
    // console.log(response.json());
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    const temperature = json.main.temp;
    const place = json.name
    weather.innerText = `${temperature} @ ${place}`;
  })
}

// 5.1
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 3.
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }

  // 5.
  saveCoords(coordsObj);
  // 6
  getWeather(latitude, longitude);
}


// 4.
function handleGeoError() {
  console.log('Cant access geo location')
}

// 2.
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

// 1.
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    // console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();