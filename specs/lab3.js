/**
 * This test has been changed a bit since Winter 2017 when it was test run, due to some changes to make it more clear what is required. Hopefully it works... if not, try to figure it out?
 */
describe('lab 3 Passoff', function() {
  var page = require('../pageobjects/lab3.page.js');
  beforeEach(function() {
    browser.get(page.lab3URL);
  });
  it('should have the required elements', function() {
    expect(page.h1.isPresent()).toBe(true);
    expect(page.nameInput.isPresent()).toBe(true);
    expect(page.imageInput.isPresent()).toBe(true);
    expect(page.emailInput.isPresent()).toBe(true);
    expect(page.addButton.isPresent()).toBe(true);
    expect(page.userList.count()).toBe(1);
  });

  it('should be able to add a user with just a name', function() {
    page.nameInput.sendKeys('Jordan');
    page.imageInput.sendKeys('');
    page.emailInput.sendKeys('');
    page.addButton.click();
    browser.waitForAngular();
    expect(page.userList.count()).toBeGreaterThanOrEqual(1);
    page.userNames.getText().then(text => {
      var expectedSpot = text.length - 1; //They should be adding users at the end... if they don't this will fail!
      expect(text[expectedSpot]).toContain('Jordan');
    })
  });

  it('should be able to add a user with just an email', function() {
    page.emailInput.sendKeys('jordan@jnielson.com');
    page.addButton.click();
    expect(page.userList.count()).toBeGreaterThanOrEqual(1);
    page.userEmails.getText().then(text => {
      var expectedSpot = text.length - 1; //They should be adding users at the end... if they don't this will fail!
      expect(text[expectedSpot]).toContain('jordan@jnielson.com');
    })  
  });

  it('should be able to add a user with all fields', function() {
    page.nameInput.sendKeys('Aang');
    page.imageInput.sendKeys('https://upload.wikimedia.org/wikipedia/en/8/86/Avatar_Aang.png');
    page.emailInput.sendKeys('aang@avatar.com');
    page.addButton.click();
    browser.waitForAngular();
    expect(page.userList.count()).toBeGreaterThanOrEqual(1);
    page.userNames.getText().then(text => {
      var expectedSpot = text.length - 1; //They should be adding users at the end... if they don't this will fail!
      expect(text[expectedSpot]).toContain('Aang');
    })
    page.userEmails.getText().then(text => {
      var expectedSpot = text.length - 1; //They should be adding users at the end... if they don't this will fail!
      expect(text[expectedSpot]).toContain('aang@avatar.com');
    })
    expect(page.avatars.count()).toBeGreaterThanOrEqual(1);
    browser.sleep(4000); //Wait time to make sure you can look at the page design
  });
});
