$(document).ready(function(){
  // var cityArr = ['New York City', 'District of Columbia', 'Atlanta', 'Houston', 'Nashville', 'Birmingham'];
  var cityArr = [];
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

  var apikey = 'a01adedec966523f1f3f3cd3a1d8d9b3';

  // on click, get city name
  $('#getWeather').on('click', function(e) {
    e.preventDefault();
    var city = $('#city').val();
  
    // if there's a city typed in
    // if( city !== "" ){
      getData(city);
      addCity(city);
    // }
  })//on click
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

        //get lat, lon and time code
        currentLat = response.coord.lat;
        currentLon = response.coord.lon;
        currentTimeCode = response.dt;
        var currentUV = $('<p>');
        currentUV.text("");

        createEl(response)
        getUVI(currentLat, currentLon, currentUV);

        //TODO NOT WORKING
        //get description, get background image respectively
        var description = response.weather[0].main;
        description.trim();
        $('.container').css('background-image', ("src(../images/" + description.toLowerCase() + ".jpg"));
      });
    }

    function createEl(response){
      // show current city, date, icon, temp, humidity, wind speed
      currentCity.text($('#city').val());
      currentDate.text(today);
      currentIconURL = "http://openweathermap.org/img/w/" + (response.weather[0].icon) + ".png";
      currentIcon.attr('src', currentIconURL);
      currentTemp.text("Temperature: " + (response.main.temp) + " degrees Farenheit");
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
    function getUVI(currentLat, currentLon, currentUV) {
      
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
    var cityList = $('#city-list');
    cityArr.pop(city);
    //RESULT no list items showing
    // $.each(cityArr, function(index, value) {
    //     var listItem = $('<li>');
    //     listItem = cityArr[i]
    //     cityList.prepend(listItem);
    // });
    // for( var i = 0; i < cityArr.length; i++ ) {
    //   var listItem = $('<li>');
    //   listItem.text(cityArr[i]);
    //   cityList.prepend(listItem);
    // }
    // TODO NOT WORKING
    // RESULT on click not working
      // cityList.prepend($('<li>', {
      //   text: city,
      //   class: 'list-button',
      //   type: 'button'
      // })).on('click', function() {
      //   for( var i = 0; i < cityArr.length; i++ ) {
      //     var listItem = cityArr[i].text();
      //     console.log(listItem);
      //   }
      // });

      var listItem = $('<li>');
      listItem.addClass('list-button');
      listItem.attr('type', 'button');
      listItem.text(city);
      cityList.prepend(listItem);

      listItem.on('click', function() {
        //$('#current').empty();
        getData(city);
      });
    //}
  // TRIED putting the whole thing in a for loop
  // RESULT no list items rendering
  //   for( var i = 0; i < cityArr.length; i++ ) {
  //     cityList.prepend($('<li>', {
  //       text: city,
  //       class: 'list-button',
  //       type: 'button'
  //     })).on('click', function() {
  //         var listItem = cityArr[i].text();
  //         console.log(listItem);
  //       });
  //   }
 }

    // function addCity() {
    //   var cityList = $("#city-list");
    //   for (var i = 0; i < cityArr.length; i++) {
    //     //creat list item
    //     var listItem = $("<li>");
    //     // add attributes and event listener
    //     listItem.text(cityArr[i]);
    //     listItem.attr("value", cityArr[i]);
    //     listItem.attr("class", "list-group-item");
    //     listItem.attr("type", "button");
    //     listItem.removeClass("active");
    //     // pass user click to query to re-render card states
    //     listItem.on("click", function () {
    //         $(this).attr("class", "list-group-item active");
    //         addCity();
    //         city = $(this).attr("value");
    //         getData();
    //     });
    //     cityList.prepend(listItem);
    //   }
    // }
})//doc get ready