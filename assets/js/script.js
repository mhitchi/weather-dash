$(document).ready(function(){
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

        createEl(response)

        //get lat, lon and time code
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        currentTimeCode = response.dt;

        //TODO NOT WORKING
        //get description, get background image respectively
        var description = response.weather[0].main;
        description.trim();
        $('.container').css('background-image', ("src(../images/" + description.toLowerCase() + ".jpg"));

        getUVI();
      });

      function createEl(response){
        // show current city
        // show current date
        // show current icon, temp, humidity, wind speed
        var currentCity = $('<h1>');
        currentCity.text(city);

        var currentDate = $('<h2>');
        var today = moment().format('MMM Do, YYYY');
        currentDate.text(today);

        var currentIcon = $('<img>');
        var currentIconURL = "http://openweathermap.org/img/w/" + (response.weather[0].icon) + ".png";
        currentIcon.attr('src', currentIconURL);

        var currentTemp = $('<p>');
        currentTemp.text((response.main.temp) + ' degrees Farenheit');

        var currentHumidity = $('<p>');
        currentHumidity.text((response.main.humidity) + '%');

        var currentWind = $('<p>');
        currentWind.text(response.wind.speed);

        updateDOM(currentCity, currentDate, currentIcon, currentIconURL, currentTemp, currentHumidity, currentWind);
      }

      //append elements to DOM
      function updateDOM(currentCity, currentDate, currentIcon, currentIconURL, currentTemp, currentHumidity, currentWind){
        $('#current').append(currentCity);
        $('#current').append(currentDate);
        $('#current').append(currentIcon);
        $('#current').append(currentTemp);
        $('#current').append(currentHumidity);
        $('#current').append(currentWind);
      }

      // get UV index
      function getUVI() {
        $.ajax({
          url: 'https://api.openweathermap.org/data/2.5/uvi',
          dataType: 'json',
          type: 'GET',
          data: {
            appid: apikey,
            lat: currentLat,
            lon: currentLon
          }
        }).then(function(response) {
          var currentUV = $('<p>');
          currentUV.text(response.value);
          $('#current').append(currentTemp);
        })
      }
    }
  })
})