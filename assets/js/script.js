$(document).ready(function(){
  // on click, get city name
  $('#getWeather').on('click', function(e) {
    e.preventDefault();
    var city = $('#city').val();
    var apikey = 'a01adedec966523f1f3f3cd3a1d8d9b3';

    var today = moment().format('MMM Do, YYYY');
    var currentCity = $('<h1>');
    var currentDate = $('<h2>');
    var currentIcon = $('<img>');
    var currentIconURL = '';
    var currentTemp = $('<p>');
    var currentHumidity = $('<p>');
    var currentWind = $('<p>');
    var currentLat;
    var currentLon;
    var currentTimeCode;

    // if there's a city typed in
    if( city !== "" ){
      getData(city);
    }
    // get data from API
    function getData(city){
      $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        dataType: 'json',
        type: 'GET',
        data: {
          q: city,
          appid: apikey,
          units: 'imperial'
        }
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
    }

    function createEl(response){
      // show current city, date, icon, temp, humidity, wind speed
      currentCity.text(city);
      currentDate.text(today);
      currentIconURL = "http://openweathermap.org/img/w/" + (response.weather[0].icon) + ".png";
      currentIcon.attr('src', currentIconURL);
      currentTemp.text((response.main.temp) + ' degrees Farenheit');
      currentHumidity.text((response.main.humidity) + '%');
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
  })//on click
})//doc get ready