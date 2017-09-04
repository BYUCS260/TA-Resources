var Lab2 = function() {
  var self = this;

  self.lab2URL = '/lab2/weather.html'; //Your URL must end in this (and only this to work)
  //Make sure that your URL is in the form: xxx.xxx/lab2/weather.html

  self.cityInput = $("#cityField"); //The ID for your city input field
  self.suggestionsList = $("#txtHint"); //The ID for your suggestions list (should be a ul)
  self.allSuggestions = $$("#txtHint li"); //This will grab all of the suggestions in your list - assuming your ul has the correct ID
  self.weatherButton = $("#weatherButton"); //The ID for your submit button that will pull the weather data
  self.cityTextArea = $("#displayCity"); //The ID for the text area that displays the city name that was submitted
  self.weatherText =$("#weather"); //The ID for the weather results section


  self.stackSearchInput = $("#searchStack"); //The ID for the input field to search stack exchange
  self.stackSearchButton = $("#searchButton"); //The ID for the button that will start the search
  self.stackSearchResults = $("#searchResults"); //The ID for the area that contains the stack exchange search results

}

module.exports = new Lab2();

/**
 * For more information about the test driver used, check out: protractortest.org
 * For information about page objects: http://www.protractortest.org/#/page-objects
 */
