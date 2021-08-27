// var searchBtn = document.getElementById('searchBtn');
// var tableBody = document.getElementById('table-body');

var searchButton = $(".search-button");
var tableBody = $("#table-body");
var weatherCards = $("#weather-cards");
var searchInput = $("#city-input");

function getParams() {
  var searchParamsArr = document.location.search.split("&");

  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();

  getApi(query, format);
}

function getApi(query, format) {
  // api key 363dbc272863bed129cf4807c0a7c46a

  var location = searchInput.val();

  var requestUrl =
    // "https://api.nasa.gov/insight_weather/?api_key=ZqNyHNLuf85BffMpHdilyWya02D3rV3jcQX5p5eJ&feedtype=json&ver=1.0";
    `https://api.nasa.gov/planetary/apod?api_key=ZqNyHNLuf85BffMpHdilyWya02D3rV3jcQX5p5eJ&date=` +
    location +
    `&hd=true`;
  console.log(requestUrl);

  //     var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ location +'&appid=363dbc272863bed129cf4807c0a7c46a&units=imperial';
  // console.log(requestUrl);

  // var requestFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=' + location +'&appid=363dbc272863bed129cf4807c0a7c46a";

  //fetch request gets data from open weather api
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("data", data);
      //here i need to create elements > then assign value of the data to it > then append to the page
      var resultsAuthor = $("#copyright-author");
      var resultsDate = $("#date");
      var resultsExplanation = $("#explanation");
      var resultsImage = $("#img");
      var resultsTitle = $("#title");
      var resultsLink = $("#link");

      var dayDate = moment();
      $(".city-name").text(dayDate.format("(MMMM, Do, YYYY)  "));
      //VALUES NEEDED TO PARSE AND POPULATE CARDS
      // data.wind.speed
      // data.main.humidity
      // data.main.temp
      // data.main.feels_like

      var authorText = document.createElement("div");
      authorText.textContent = data.copyright;
      resultsAuthor.append(authorText);

      console.log("stuff", data.copyright);

      var dateText = document.createElement("div");
      dateText.textContent = data.date;
      resultsDate.append(dateText);

      var resExplanation = document.createElement("div");
      resExplanation.textContent = data.explanation;
      resultsExplanation.append(resExplanation);

      var resImage = document.createElement("img");
      resImage.src = data.hdurl;
      // resImage.textContent = data.hdurl;
      resultsImage.append(resImage);

      var resTitle = document.createElement("div");
      resTitle.textContent = data.title;
      resultsTitle.append(resTitle);

      var resLink = document.createElement("div");
      resLink.textContent = data.url;
      resultsLink.append(resLink);

      var cityName = document.createElement("div");
      cityName = data.city.name;
      resultsBlock.append(cityName);
    });
}

// function renderForecastCard(forecast){
// //    // WORK WITH THESE VARIABLES TO ASSIGN TO ELEMENTS BELOW
// //     //function to display a forecast card given an object from open weather api
// //     //daily forecast

// //     var unixTs = forecast.dt;

// //     var iconUrl = 'https://openweathermap.org/img/w/${forecast.weather[0].icon}.png';
// //     var iconDescription = forecast.weather[0].description;
// //     var tempF = main.temp;
// //     var humidity = main.humidity;
// //     var windMph = wind.speed;
// //     var feelsLike = main.feels_like;

// }

//Hides weather cards and current city box until the search button is clicked

$("#weather-cards").css("display", "none");
$(".mr-0").css("display", "none");

//When the a city is entered and the search button is clicked and getAPI function is called. Weather cards and current city box is displayed
searchButton.on("click", () => {
  getApi();

  $("#weather-cards").css("display", "flex", "row");
  $(".mr-0").css("display", "flex", "");
});
