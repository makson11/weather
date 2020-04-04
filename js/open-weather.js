let arrId = [5128581, 5815135, 2643743, 524901, 1850147, 3451190, 1816670, 3451190];

for (let i = 0; i < arrId.length; i++) {
  fetch('http://api.openweathermap.org/data/2.5/weather?id=' + arrId[i] + '&appid=4acd770294db9107a96165f4020decc5')
    .then(resp => resp.json())
    .then(function (data) {
      console.log(data);

      let cityWorld = document.querySelectorAll('.city-world span');

      for (let j = 0; j < cityWorld.length; j++) {
        if (i == j) {
          cityWorld[j].textContent = Math.floor(data.main.temp - 273.15);
        }
      }
    });
};


btn.addEventListener('click', () => {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + search.value + '&appid=4acd770294db9107a96165f4020decc5')
    .then(response => response.json())
    .then(function (data) {
      console.log(data);

      let newData = new Date().toDateString();

      document.querySelector('.city').textContent = data.name;
      document.querySelector('.sunrise span').textContent = msToTime(data.sys.sunrise);
      document.querySelector('.sunset span').textContent = msToTime(data.sys.sunset);
      getIconWeather(data.weather[0].description, document.querySelector('.icon i'));
      document.querySelector('.forecast').textContent = data.weather[0].main;
      document.querySelector('.temp span').textContent = Math.floor(data.main.temp - 273.15);
      document.querySelector('.downfall span').textContent = data.main.humidity;
      document.querySelector('.day-week').textContent = newData.substr(0, 3);
      document.querySelector('.day-month').textContent = newData.substr(4, 6);
    });

  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + search.value + '&appid=4acd770294db9107a96165f4020decc5')
    .then(resp => resp.json())
    .then(function (data) {

      let days = document.querySelectorAll('.days'),
        iconsWeather = document.querySelectorAll('.sky'),
        temp = document.querySelectorAll('.max-temp'),
        windDeg = document.querySelectorAll('.deg'),
        windSpeed = document.querySelectorAll('.speed'),
        arr = [];

      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.substr(11, 9) == '12:00:00') {
          arr.push(data.list[i]);
        }
      }

      for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == j) {
            days[i].textContent = getWeekDay(new Date(arr[j].dt_txt));
          }
        }
      }

      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == j) {
            getIconWeather(arr[j].weather[0].description, iconsWeather[i]);
          }
        }
      }

      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == j) {
            temp[i].textContent = Math.floor(arr[j].main.temp - 273.15);
          }
        }
      }

      for (let i = 0; i < windDeg.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == j) {
            getIconWindDeg(arr[j].wind.deg, windDeg[i]);
          }
        }
      }

      for (let i = 0; i < windSpeed.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (i == j) {
            getIconWindSpeed(arr[j].wind.speed, windSpeed[i]);
          }
        }
      }
    });

});


function msToTime(time) {
  let seconds = Math.floor((time / 1000) % 60),
    minutes = Math.floor((time / (1000 * 60)) % 60),
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

function getWeekDay(date) {
  date = date || new Date();
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let day = date.getDay();

  return days[day];
}

function getIconWeather(weather, domElem) {
  switch (weather) {
    case 'light intensity drizzle':
    case 'drizzle':
    case 'heavy intensity drizzle':
    case 'light intensity drizzle rain':
    case 'drizzle rain':
    case 'heavy intensity drizzle rain':
    case 'shower rain and drizzle':
    case 'heavy shower rain and drizzle':
    case 'shower drizzle':
    case 'light intensity shower rain':
    case 'shower rain':
    case 'heavy intensity shower rain':
    case 'ragged shower rain':
      domElem.classList.toggle('wi-sleet');
      break;
    case 'thunderstorm with light rain':
    case 'thunderstorm with rain':
    case 'thunderstorm with heavy rain':
    case 'light thunderstorm':
    case 'thunderstorm':
    case 'heavy thunderstorm':
    case 'ragged thunderstorm':
    case 'thunderstorm with light drizzle':
    case 'thunderstorm with drizzle':
    case 'thunderstorm with heavy drizzle':
      domElem.classList.toggle('wi-thunderstorm');
      break;
    case 'light rain':
    case 'moderate rain':
    case 'heavy intensity rain':
    case 'very heavy rain':
    case 'extreme rain':
      domElem.classList.toggle('wi-day-showers');
      break;
    case 'mist':
    case 'Smoke':
    case 'Haze':
    case 'sand/ dust whirls':
    case 'fog':
    case 'sand':
    case 'dust':
    case 'volcanic ash':
    case 'squalls':
    case 'tornado':
      domElem.classList.toggle('wi-fog');
      break;
    case 'few clouds':
      domElem.classList.toggle('wi-day-cloudy');
      break;
    case 'scattered clouds':
      domElem.classList.toggle('wi-cloud');
      break;
    case 'broken clouds':
    case 'overcast clouds':
      domElem.classList.toggle('wi-cloudy');
      break;
    case 'clear sky':
      domElem.classList.toggle('wi-day-sunny');
      break;
    case 'freezing rain':
    case 'light snow':
    case 'Snow':
    case 'Heavy snow':
    case 'Sleet':
    case 'Light shower sleet':
    case 'Shower sleet':
    case 'Light rain and snow':
    case 'Rain and snow':
    case 'Light shower snow':
    case 'Shower snow':
    case 'Heavy shower snow':
      domElem.classList.toggle('wi-snow');
      break;

    default:
      break;
  }
}

function getIconWindDeg(deg, domElem) {
  if (deg >= 0 && deg <= 22) {
    domElem.classList.toggle('towards-0-deg');
  } else if (deg >= 23 && deg <= 44) {
    domElem.classList.toggle('towards-23-deg');
  } else if (deg >= 45 && deg <= 67) {
    domElem.classList.toggle('towards-45-deg');
  } else if (deg >= 68 && deg <= 89) {
    domElem.classList.toggle('towards-68-deg');
  } else if (deg >= 90 && deg <= 112) {
    domElem.classList.toggle('towards-90-deg');
  } else if (deg >= 113 && deg <= 134) {
    domElem.classList.toggle('towards-113-deg');
  } else if (deg >= 135 && deg <= 157) {
    domElem.classList.toggle('towards-135-deg');
  } else if (deg >= 158 && deg <= 179) {
    domElem.classList.toggle('towards-158-deg');
  } else if (deg >= 180 && deg <= 202) {
    domElem.classList.toggle('towards-180-deg');
  } else if (deg >= 203 && deg <= 224) {
    domElem.classList.toggle('towards-203-deg');
  } else if (deg >= 225 && deg <= 247) {
    domElem.classList.toggle('towards-225-deg');
  } else if (deg >= 248 && deg <= 269) {
    domElem.classList.toggle('towards-248-deg');
  } else if (deg >= 270 && deg <= 292) {
    domElem.classList.toggle('towards-270-deg');
  } else if (deg >= 293 && deg <= 312) {
    domElem.classList.toggle('towards-293-deg');
  } else if (deg >= 313 && deg <= 335) {
    domElem.classList.toggle('towards-313-deg');
  } else if (deg >= 336 && deg <= 359) {
    domElem.classList.toggle('towards-336-deg');
  } else {
    domElem.classList.toggle('towards-0-deg');
  }
}

function getIconWindSpeed(speed, domElem) {
  if (speed >= 0 && speed <= 0.99) {
    domElem.classList.toggle('wi-wind-beaufort-0');
  } else if (speed >= 1 && speed <= 1.99) {
    domElem.classList.toggle('wi-wind-beaufort-1');
  } else if (speed >= 2 && speed <= 2.99) {
    domElem.classList.toggle('wi-wind-beaufort-2');
  } else if (speed >= 3 && speed <= 3.99) {
    domElem.classList.toggle('wi-wind-beaufort-3');
  } else if (speed >= 4 && speed <= 4.99) {
    domElem.classList.toggle('wi-wind-beaufort-4');
  } else if (speed >= 5 && speed <= 5.99) {
    domElem.classList.toggle('wi-wind-beaufort-5');
  } else if (speed >= 6 && speed <= 6.99) {
    domElem.classList.toggle('wi-wind-beaufort-6');
  } else if (speed >= 7 && speed <= 7.99) {
    domElem.classList.toggle('wi-wind-beaufort-7');
  } else if (speed >= 8 && speed <= 8.99) {
    domElem.classList.toggle('wi-wind-beaufort-8');
  } else if (speed >= 9 && speed <= 9.99) {
    domElem.classList.toggle('wi-wind-beaufort-9');
  } else if (speed >= 10 && speed <= 10.99) {
    domElem.classList.toggle('wi-wind-beaufort-10');
  } else if (speed >= 11 && speed <= 11.99) {
    domElem.classList.toggle('wi-wind-beaufort-11');
  } else if (speed >= 12) {
    domElem.classList.toggle('wi-wind-beaufort-12');
  } else {
    domElem.classList.toggle('wi-wind-beaufort-0');
  }
}