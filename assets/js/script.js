$(document).ready(function(){
  // get DOM elements
  // var currentCity = $('#currentCity');
  // var currentDate = $('#currentDate');
  // var currentIcon = $('#currentIcon');
  // var currentTemp = $('#currentTemp');
  // var currentHumidity = $('#currentHumidity');
  // var currentWind = $('#currentWind');
  // var currentUV = $('#currentUV');

  // on click, get city name
  $('#getWeather').on('click', function(e) {
    e.preventDefault();
    var city = $('#city').val();
    var apikey = 'a01adedec966523f1f3f3cd3a1d8d9b3';

    var currentLat;
    var currentLon;
    var currentTimeCode;

      // if there's a city typed in
      if( city !== "" ){
        // get data from API
        $.ajax({
          url: 'https://api.openweathermap.org/data/2.5/weather',
          //url: 'https://api.openweathermap.org/data/2.5/weather?'+ city + apikey + '&units=imperial',
          dataType: 'json',
          type: 'GET',
          data: {
            q: city,
            appid: apikey,
            units: 'imperial'
          },
          // success: function(response) {
          //   console.log(response.data);
          // }

        }).then(function(response) {
          console.log(response);
          // for(var i=0; i<response.data.length; i++) {
          //   var image = response.data[i]
          //   var img = $('<img>');
          //   img.attr('src', image.images.downsized_large.url);
          //   results.append(img);
          // }

          // show current city
          var currentCity = $('<h1>');
          currentCity.text(city);
          $('#current').append(currentCity);

          // show current date
          var currentDate = $('<h2>');
          var today = moment().format('MMM Do, YYYY');
          currentDate.text(today);
          $('#current').append(currentDate);

          // show current icon, temp, humidity, wind speed
          // TODO can't get icon
          var currentIcon = $('<img>');
          var currentIconURL = "http://openweathermap.org/img/w/" + (response.weather[0].icon) + ".png";
          currentIcon.attr('src', currentIconURL);
          $('#current').append(currentIcon);

          var currentTemp = $('<p>');
          currentTemp.text((response.main.temp) + ' degrees Farenheit');
          $('#current').append(currentTemp);

          var currentHumidity = $('<p>');
          currentHumidity.text((response.main.humidity) + '%');
          $('#current').append(currentHumidity);

          var currentWind = $('<p>');
          currentWind.text(response.wind.speed);
          $('#current').append(currentWind);

          //get lat, lon and time code
          currentLat = response.coord.lat;
          currentLon = response.coord.lon;
          currentTimeCode = response.dt;
        });

        // get UV index
        $.ajax({
          url: 'https://api.openweathermap.org/data/2.5/uvi/history?',
          dataType: 'json',
          type: 'GET',
          data: {
            appid: apikey,
            lat: currentLat,
            lon: currentLon,
            //cnt: 1,
            //start: currentTimeCode,
            // end: 
          }
        }).then(function(response) {
          var currentUV = $('<p>');
          currentUV.text(response.value);
          $('#current').append(currentTemp);
      })
    }
  })
})