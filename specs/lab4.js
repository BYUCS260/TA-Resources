var page = require('../pageobjects/lab4.page');
var Intercept = require('protractor-intercept'); //This is used to make sure that their suggestions come from the correct URL
var waitForAjax = 1500;

describe('Lab 4 - Front end', function () {
  var intercept = new Intercept(browser);
  beforeEach(function (done) {
    browser.get(page.lab4URL);
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

  it('should be able to suggest a full list of utah cities from their getcity service', function (done) {
    intercept.addListener();
    page.cityInput.clear().sendKeys('P')
    setTimeout(function() {
      intercept.getRequests().then(requests => {
        //The original getcity service on bioresearch is getcity.cgi?q=, so it fails and theirs should pass
        expect(requests[0].responseURL).toContain('getcity?q=');
      });
      page.suggestionsList.getText().then(text => {
        expect(text).toContain('Peoa')
        expect(page.allSuggestions.count()).toBe(15)
        done();
      })
    }, waitForAjax)
  })

  it("should be able to search for a city's weather", function (done) {
    page.cityInput.clear().click()
    'Manila'.split('').forEach((c) => page.cityInput.sendKeys(c))
    expect(page.suggestionsList.getText()).toContain('Manila')
    expect(page.allSuggestions.count()).toBe(1)
    page.weatherButton.click()
    setTimeout(function () {
      page.cityTextArea.getText().then(text => {
        expect(text).toBe('Manila')
        page.weatherText.getText().then(text2 => {
          expect(text2).toContain('Manila')
          done()
        })
      })
    }, waitForAjax)
  })

  it('should have a frontend owlbot search', function(done) {
    expect(page.owlSearchInput.isPresent()).toBe(true);
    expect(page.owlSearchButton.isPresent()).toBe(true);
    page.owlSearchInput.clear().click();
    'example'.split('').forEach(c => {
      page.owlSearchInput.sendKeys(c)
    })
    page.owlSearchButton.click()
    setTimeout(function () {
      expect(page.owlSearchResults.isPresent()).toBe(true);
    expect(page.owlSearchResults.getText()).toContain('characteristic');  
    done();
    }, waitForAjax)
    
  })
  afterAll(function(done) {
    setTimeout(function() {
      console.log("Checked style!");
      done();
    }, waitForAjax)
  }, waitForAjax)
});
describe('Lab 4 - Backend Services', function() {
  var body = $('body');
  it('should be able to go to the getcity route with no search parameters and get the entire list', function() {
    browser.get(page.getcityRoute);
    body.getText().then(text => {
      expect(text).toContain('Peoa')
      expect(text).toContain('Manila')
      expect(text).toContain('Woodruff')
    });
  });

  it('should be able to go directly to the owlbot route', function() {
    browser.get(page.owlRoute + 'hello');
    body.getText().then(text => {
      expect(text).toContain('defenition');
      expect(text).toContain('hello');
    })
  })
  // it('should be able to search stack exchange', function (done) {
  //   page.stackSearchInput.clear().click()
  //   'Angular'.split('').forEach((c) => page.stackSearchInput.sendKeys(c))
  //   page.stackSearchButton.click().then(function () {
  //     setTimeout(function() {
  //     page.stackSearchResults.getText().then(text => {
  //       expect(text).toContain('angular')
  //       done()
  //     })
  //     }, waitForAjax);
  //   })
  // })
})
