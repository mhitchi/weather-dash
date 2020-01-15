$(document).ready(function(){
  // var cityArr = ['New York City', 'District of Columbia', 'Atlanta', 'Houston', 'Nashville', 'Birmingham'];
  var cityArr = [];
  var today = moment().format('MMM Do');
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
  var currentUV = $('<p>');;
  var cityList = $('#city-list');

  var apikey = 'a01adedec966523f1f3f3cd3a1d8d9b3';

  // on click, get city name
  $('#getWeather').on('click', function(e) {
    e.preventDefault();
    var city = $('#city').val();
    cityList.empty();
  
    // if there's a city typed in
    // if( city !== "" ){
      getData(city);
      addCity(city);
      getForecast(city);
    // }
  })//on click
  // get data from API
  function getData(city){
    $('#current').empty();
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
      // console.log(response);
      // for(var i=0; i<response.data.length; i++) {
      //   var image = response.data[i]
      //   var img = $('<img>');
      //   img.attr('src', image.images.downsized_large.url);
      //   results.append(img);
      // }

      //get lat, lon and time code
      currentLat = response.coord.lat;
      currentLon = response.coord.lon;
      currentTimeCode = response.dt;
      currentUV.text("");

      createEl(response)
      getUVI(currentLat, currentLon);

      //TODO NOT WORKING
      //get description, get background image respectively
      // var description = response.weather[0].main;
      // description.trim();
      // $('body').attr('style', ("background-image: url(\"assets/images/" + description.toLowerCase() + ".jpg\""));

      $('.forecast').removeClass('hidden');
    });
  }

  function createEl(response){
    //TODO clearing out all info except currentCity, CurrentIconURL
    $('#current').empty();
    // show current city, date, icon, temp, humidity, wind speed
    currentCity.text(response.name);
    currentDate.text(today);
    currentIconURL = "https://openweathermap.org/img/w/" + (response.weather[0].icon) + ".png";
    currentIcon.attr('src', currentIconURL);
    currentTemp.text("Temperature: " + (response.main.temp) + " º");
    currentHumidity.text("Humidity: " + (response.main.humidity) + "%");
    currentWind.text("Wind speed: " + (response.wind.speed));

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

  // TODO get UV index
  function getUVI(currentLat, currentLon) {
    
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
      
      currentUV.text("UV index: " + (response.value));
      $('#current').append(currentUV);
    })
  }

//add city to array
function addCity(city) {
  cityArr.push(city);
  // console.log(cityArr);

  for( var i = 0; i < cityArr.length; i++ ){
    var listItem = $('<li>');
    listItem.addClass('list-button');
    // listItem.addClass('btn');
    // listItem.addClass('btn-light');
    listItem.attr('type', 'button');
    listItem.text(cityArr[i]);
    cityList.prepend(listItem);

    listItem.on('click', function() {
      getData(($(this).text()));
      // console.log(($(this).text()));
    });
  }
 }
  function getForecast(city) {
    $.ajax({
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      dataType: 'json',
      type: 'GET',
      data: {
        q: city,
        appid: apikey,
        units: 'imperial',
        cnt: '5',
      }
    }).then(function(response) {
      console.log(response);
        for( var i = 0; i < response.list.length; i++ ) {
          var theDate = moment();
          theDate.add(i, 'days');
          theDate.format('L');
          var forecastDate = $('<h5>');
          forecastDate.text(theDate);

          var forecastIcon = $('<img>');
          var forecastTemp = $('<p>');
          var forecastHumidity = $('<p>');

          var forecastIconURL = "https://openweathermap.org/img/w/" + (response.list[i].weather[0].icon) + ".png";
          forecastIcon.attr('src', forecastIconURL);
          forecastIcon.attr('style', 'width:50px');
          forecastTemp.text('Temp: ' + response.list[i].main.temp + " º");
          forecastHumidity.text('Humidity: ' + response.list[i].main.humidity + '%');

          var card = $('.' + i);
          card.append(forecastDate);
          card.append(forecastIcon);
          card.append(forecastTemp);
          card.append(forecastHumidity);

          //remove GMT-0500 and time from date and 2020
          var theTime = moment().format('HH:mm:ss');
          var theYear = moment().format('YYYY');

          scrapTime();

          //TOTO this works, but throws XMLHHTPREQUEST Error blocked by CORS policy
          //also removes background image
          function scrapTime() {
            $(':contains('+theTime+')').each(function(){
              $(this).html($(this).html().split(theTime).join(""));
            });
            $(':contains("GMT-0500")').each(function(){
              $(this).html($(this).html().split("GMT-0500").join(""));
            });
            $(':contains('+theYear+')').each(function(){
              $(this).html($(this).html().split(theYear).join(""));
            });
        }
        }
      })
  }
})//doc get ready