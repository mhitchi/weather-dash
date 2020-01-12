$(document).ready(function(){

  // on click, get city name
  $('#getWeather').on('click', function(e) {
    e.preventDefault();
    var city = $('#city').val();
    var apikey = 'a01adedec966523f1f3f3cd3a1d8d9b3';

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
        });
      }
    })
  })
