var page = require('../pageobjects/lab2.page');
/**
 * This is kind of a hacky test, due to waiting for all the ajax requests (and we don't have angular to utilize)
 * So, pretty much all the tests are wrapped in a setTimeout.
 * If you need to add a test, try doing that. Also, make sure to call done() when it is finished.
 * Otherwise, the jasmine/protractor docs should work well enough for you
 */

describe('Lab 2 Passoff', function () {
  var waitForAjax = 1500;
  beforeEach(function (done) {
    browser.get(page.lab2URL);
    done()
  })

  it('should have all the weather related elements', function (done) {
    expect(page.cityInput.isPresent()).toBe(true)
    expect(page.suggestionsList.isPresent()).toBe(true)
    expect(page.weatherButton.isPresent()).toBe(true)
    expect(page.cityTextArea.isPresent()).toBe(true)
    expect(page.weatherText.isPresent()).toBe(true)
    done()
  })

  it('should be able to suggest a full list of utah cities', function (done) {
    page.cityInput.clear().sendKeys('P')
    setTimeout(function() {
      page.suggestionsList.getText().then(text => {
        expect(text).toContain('Peoa')
        expect(page.allSuggestions.count()).toBe(15) //If the number of cities that start with P in the list ever changes, this will need to
        done();
      })
    }, waitForAjax)
  })
  
  it("should be able to search for a city's weather", done => {
    var city = 'Manila';
    page.cityInput.clear().click()
    city.split('').forEach((c) => page.cityInput.sendKeys(c))
    page.weatherButton.click()
    setTimeout(() => {
      Promise.all([
        page.suggestionsList.getText(),
        page.allSuggestions.count(),
        page.cityTextArea.getText(),
        page.weatherText.getText()
      ])
        .then(([suggestions, numSuggestions, chosenCity, cityWeather]) => {
          expect(suggestions).toContain(city);
          expect(numSuggestions).toEqual(1);
          expect(chosenCity).toEqual(city);
          expect(cityWeather).toContain(city);
        })
        .then(done)
        .catch(done.fail)
    }, waitForAjax)
  })

  it('should be able to search stack exchange', function (done) {
    page.stackSearchInput.clear().click()
    'Angular'.split('').forEach((c) => page.stackSearchInput.sendKeys(c))
    page.stackSearchButton.click().then(function () {
      setTimeout(function() {
      page.stackSearchResults.getText().then(text => {
        expect(text).toContain('angular')
        done()
      })
      }, waitForAjax);
    })
  })
})
