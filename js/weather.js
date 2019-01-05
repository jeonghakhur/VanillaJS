const weather = document.querySelector('.weather');
//https://home.openweathermap.org/
const API_KEY = 'eebedd7fbd8382cd1f41f22ae440820e'

// 1.1
const COORDS = 'coords';

// 6.1
function getWeather(lat, lon) {
  // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}`);
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
      // console.log(response.json());
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temperature = json.main.temp;
      const place = json.name;
      const icon = json.weather[0].icon;
      const img = document.createElement('img');
      img.src = `//openweathermap.org/img/w/${icon}.png`;
      weather.innerText = `${temperature} @ ${place}`;
      weather.insertAdjacentElement('afterend', img);
    })
}

// 5.1
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 3.
function handleGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const loadedCoords = localStorage.getItem(COORDS);
  console.log(loadedCoords);

  if (loadedCoords) {
    const parsedCoords = JSON.parse(loadedCoords);
    const oldLat = parsedCoords.latitude;
    const oldLon = parsedCoords.longitude;
    if (lat !== oldLat && lon !== oldLon) {
      saveCoords({
        lat,
        lon
      });
    }
  } else {
    saveCoords({
      lat,
      lon
    });
  }

  getWeather(lat, lon);

  // 
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
  askForCoords();
}

function init() {
  loadCoords();
}

init();