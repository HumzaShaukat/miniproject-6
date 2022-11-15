var searchForm = document.querySelector("#locSearch");
var searchInput = document.querySelector("#searchInput");
var dropDown = document.querySelector("#dropDown");
var subBtn = document.querySelector("#subBtn");
var query = "";
var format = "";

subBtn.addEventListener("click",function(event) {
    event.preventDefault();
    query = searchInput.value;
    format = "/" + dropDown.value + "/?q=";
    getSearchResults(query,format);
    $("#queryName").text("Showing results for: " + query);
    $("#locSearch").attr("style", "display: none");
    $("#searchPage").attr("style", "display: block");
})

var getSearchResults = function (query, format) {
    var apiURL = "https://www.loc.gov" + format + query + "&fo=json";
    console.log(apiURL);
    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                //add function
                displayResults(data.featured_items)
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to complete search');
        });
  };

  function displayResults(results) {
    for (var i = 0; i < results.length; i++) {
        var list = $("<h1>")
        list = results[i].title;
        $("#container").append(list);
    }

  }