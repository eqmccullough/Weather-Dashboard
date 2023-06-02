// variable declarations
var body = document.body;
var weatherDisplay = document.createElement("section");
var tempDisplay = document.createElement("p");
var weatherStatus = document.createElement("p");
var previousSearches = document.createElement("button");
var cityCode;
var codeRetrieve;
var buttonCount= 1;
var stateCode;
var dayConditionO;
var counter = 1;
var dayCondition;
var lat;
var long;
var day1temp;
var day1humidity;
var day1weather;
var day1wind;
var day1date;
var coord;
var code1;
var code2;
var code3;
var code4;
var code5;
var count = JSON.parse(localStorage.getItem("count"));
console.log(count);
var codes = {};

// pulling data from storage
code1 = JSON.parse(localStorage.getItem("codes"));
code2 = JSON.parse(localStorage.getItem("code2"));
code3 = JSON.parse(localStorage.getItem("code3"));
code4 = JSON.parse(localStorage.getItem("code4"));
code5 = JSON.parse(localStorage.getItem("code5"));


// checking if the data exists in storage
if (count > 0) {
    search1.innerHTML = code1.cityCode + " " + code1.stateCode;
}
if (count > 1) {
    search2.innerHTML = code2.city2 + " " + code2.state2;
}
if (count > 2) {
    search3.innerHTML = code3.city3 + " " + code3.state3;
}
if (count > 3) {
    search4.innerHTML = code4.city4 + " " + code4.state4;
}
if (count > 4) {
    search5.innerHTML = code5.city5 + " " + code5.state5;
}

weatherDisplay.setAttribute("style", "color: white");

// fetches current weather
function weatherFetch(la, lo) {
    var weatherURL;
    var weatherRequestURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + la + "&lon=" + lo + "&units=imperial&appid=68415bfdd25c70f3ac38b519e186d986";
    fetch(weatherRequestURL, weatherURL)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (weatherURL) {
        temperature = weatherURL.main.temp;
        var winds = weatherURL.wind.speed;
        var humid = weatherURL.main.humidity;
        var cityInput = weatherURL.name;
        dayConditionO = weatherURL.weather[0].icon;
        $("#dayConditionOG").attr("src", "https://openweathermap.org/img/wn/" + dayConditionO + "@2x.png");
        tempDisplay.textContent = "Temperature: " + temperature + " degrees";
        weatherStatus.textContent = "Status: " + weatherURL.weather[0].main;
        temp.innerHTML ="Temperature: " + temperature + "°F";
        wind.innerHTML = "Wind: " + winds + " mph";
        humitidy.innerHTML = "Humidity: " + humid + "%";
        city.innerHTML = cityInput;
        console.log(weatherURL);
        
        
  
      });
  }

//   fetches data for 5 day forecast
  function fiveDayFetch(lo, la) {
    var fiveDayURL;
    counter = 1;
    var fiveDayRequestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lo + "&lon=" + la + "&units=imperial&appid=68415bfdd25c70f3ac38b519e186d986";
    fetch(fiveDayRequestURL, fiveDayURL)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (fiveDayURL) { 

        for (i=1; i<6; i++) {
            var num = 0 + (counter-1)*8;
            console.log(fiveDayURL);
            console.log(counter);
            day1temp = fiveDayURL.list[7+num].main.temp;
            day1wind = fiveDayURL.list[7+num].wind.speed;
            day1date = fiveDayURL.list[7+num].dt_txt;
            day1humidity = fiveDayURL.list[7+num].main.humidity;
            dayCondition = fiveDayURL.list[7+num].weather[0].icon;

            // iterates function for each of the 5 days
            if (counter == 1) {
                $("#icon").attr("src", "https://openweathermap.org/img/wn/" + dayCondition + "@2x.png");
                day1temps.innerHTML = "Temp: " + day1temp + "°F";
                day1winds.innerHTML = "Wind: " + day1wind + " mph";
                day1dates.innerHTML = "Date: " + day1date;
                day1humid.innerHTML = "Humidity: " + day1humidity + "%";
            } else if (counter == 2) {
                $("#icon2").attr("src", "https://openweathermap.org/img/wn/" + dayCondition + "@2x.png");
                day2temp.innerHTML = "Temp: " + day1temp + "°F";
                day2wind.innerHTML = "Wind: " + day1wind + " mph";
                day2date.innerHTML = "Date: " + day1date;
                day2humid.innerHTML = "Humidity: " + day1humidity + "%";
            } else if (counter == 3) {
                $("#icon3").attr("src", "https://openweathermap.org/img/wn/" + dayCondition + "@2x.png");
                day3temp.innerHTML = "Temp: " + day1temp + "°F";
                day3wind.innerHTML = "Wind: " + day1wind + " mph";
                day3date.innerHTML = "Date: " + day1date;
                day3humid.innerHTML = "Humidity: " + day1humidity + "%";
            } else if (counter == 4) {
                $("#icon4").attr("src", "https://openweathermap.org/img/wn/" + dayCondition + "@2x.png");
                day4temp.innerHTML = "Temp: " + day1temp + "°F";
                day4wind.innerHTML = "Wind: " + day1wind + " mph";
                day4date.innerHTML = "Date: " + day1date;
                day4humid.innerHTML = "Humidity: " + day1humidity + "%";
            } else {
                $("#icon5").attr("src", "https://openweathermap.org/img/wn/" + dayCondition + "@2x.png");
                day5temp.innerHTML = "Temp: " + day1temp + "°F";
                day5wind.innerHTML = "Wind: " + day1wind + " mph";
                day5date.innerHTML = "Date: " + day1date;
                day5humid.innerHTML = "Humidity: " + day1humidity + "%";
            }
            console.log(fiveDayURL);
            counter++;
        }
        
      });
  }
  

//   converts city and state inputs into latitude and longitude
  function geoFetch(ci,st) {
    var geoURL;
    var geoRequestURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + ci + "," + st + ",US&limit=1&appid=68415bfdd25c70f3ac38b519e186d986";
    fetch(geoRequestURL, geoURL)
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (geoURL) {

        coord = {
            lat: geoURL[0].lat,
            long: geoURL[0].lon,
        };
        weatherFetch(coord.lat, coord.long);
        fiveDayFetch(coord.lat, coord.long);
      });
  }
  
  
//   gets date and time
$("#currentDay").text(dayjs().format("MMMM D YYYY, h:mm:ss a"));


// event listener for save button
$(".saveBtn").on("click", function () {
    var cityInput = document.querySelector("#cityCodes");
    var stateInput = document.querySelector("#stateCodes");
   
// creates up to 5 places to store city and state names
    if (buttonCount == 1) {
        codes.cityCode = cityInput.value.trim();
        codes.stateCode = stateInput.value.trim();
        count++;
        geoFetch(codes.cityCode, codes.stateCode);
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("codes", JSON.stringify(codes));
        codeRetrieve = JSON.parse(localStorage.getItem("codes"));
        previousSearches.textContent = codeRetrieve.cityCode + " " + codeRetrieve.stateCode;
        search1.innerHTML = previousSearches.textContent;
    } else if (buttonCount == 2) {
        codes.city2 = cityInput.value.trim();
        codes.state2 = stateInput.value.trim();
        count++;
        geoFetch(codes.city2, codes.state2);
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("code2", JSON.stringify(codes));
        codeRetrieve = JSON.parse(localStorage.getItem("code2"));
        previousSearches.textContent = codeRetrieve.city2 + " " + codeRetrieve.state2;
        search2.innerHTML = previousSearches.textContent;
    } else if (buttonCount == 3) {
        codes.city3 = cityInput.value.trim();
        codes.state3 = stateInput.value.trim();
        count++;
        geoFetch(codes.city3, codes.state3);
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("code3", JSON.stringify(codes));
        codeRetrieve = JSON.parse(localStorage.getItem("code3"));
        previousSearches.textContent = codeRetrieve.city3 + " " + codeRetrieve.state3;
        search3.innerHTML = previousSearches.textContent;
    } else if (buttonCount == 4) {
        codes.city4 = cityInput.value.trim();
        codes.state4 = stateInput.value.trim();
        count++;
        geoFetch(codes.city4, codes.state4);
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("code4", JSON.stringify(codes));
        codeRetrieve = JSON.parse(localStorage.getItem("code4"));
        previousSearches.textContent = codeRetrieve.city4 + " " + codeRetrieve.state4;
        search4.innerHTML = previousSearches.textContent;
    } else if (buttonCount == 5) {
        codes.city5 = cityInput.value.trim();
        codes.state5 = stateInput.value.trim();
        count++;
        geoFetch(codes.city5, codes.state5);
        localStorage.setItem("code5", JSON.stringify(codes));
        localStorage.setItem("count", JSON.stringify(count));
        codeRetrieve = JSON.parse(localStorage.getItem("code5"));
        previousSearches.textContent = codeRetrieve.city5 + " " + codeRetrieve.state5;
        search5.innerHTML = previousSearches.textContent;
        buttonCount = 0;
    }
    
    // resets input to blank
    document.getElementById('cityCodes').value = "";
    document.getElementById('stateCodes').value = "";
    buttonCount++
});

// event listeners for buttons created from local storage
$("#search1").on("click", function () {
    codeRetrieve = JSON.parse(localStorage.getItem("codes"));
    geoFetch(codeRetrieve.cityCode, codeRetrieve.stateCode);
    console.log(codeRetrieve);
});

$("#search2").on("click", function () {
    codeRetrieve = JSON.parse(localStorage.getItem("code2"));
    geoFetch(codeRetrieve.city2, codeRetrieve.state2);
});

$("#search3").on("click", function () {
    codeRetrieve = JSON.parse(localStorage.getItem("code3"));
    geoFetch(codeRetrieve.city3, codeRetrieve.state3);
});

$("#search4").on("click", function () {
    codeRetrieve = JSON.parse(localStorage.getItem("code4"));
    geoFetch(codeRetrieve.city4, codeRetrieve.state4);
});

$("#search5").on("click", function () {
    codeRetrieve = JSON.parse(localStorage.getItem("code5"));
    geoFetch(codeRetrieve.city5, codeRetrieve.state5);
});