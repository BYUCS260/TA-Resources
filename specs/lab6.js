var page = require('../pageobjects/lab6.page');
describe('Lab 6 Passoff', function() {
  //Sadly, these tests are supposed to be run in order to make sure that the user exists before trying other things...
  //IF DELETING THE USER FAILS, DO NOT RE RUN THIS TEST!
  //The code used in the lab will break if a person tries to sign up again... so yeah.
  //I guess you could change the username...
  var username = 'test123';
  var pass = '123';
  beforeAll(function() {
    browser.get(page.lab6URL);
  })
  it('can create a new user and auto-logs-in', function() {
    //Create a new user
    page.signUpLink.click();
    page.usernameInput.sendKeys(username);
    page.passwordInput.sendKeys(pass);
    page.emailInput.sendKeys('123@123.com');
    page.registerButton.click();
    expect(page.indexMsg.getText()).toContain('Authenticated as test123');
    page.logoutLink.click();
  })

  it('can update the color and keep the change of a previously created user', function() {
    page.login(username,pass);
    expect(page.indexMsg.getText()).toContain('Authenticated as test123');
    page.editUserLink.click();
    expect(page.sectionTitle.getText()).toContain('User Profile');
    page.colorInput.sendKeys('fuchsia');
    page.saveButton.click();
    expect(page.userMsg.getText()).toContain('User Updated');
    page.homeLink.click();
    expect(page.colorText.getText()).toContain('Color fuchsia');
    page.logoutLink.click();
    page.login(username, pass);
    expect(page.colorText.getText()).toContain('Color fuchsia');
    page.logoutLink.click();
  })

  it('doesn\'t allow access to the site if they aren\'t logged in', function() {
    page.login(username, pass);
    expect(page.colorText.getText()).toContain('Color');
    page.editUserLink.click();
    expect(page.userMsg.getText()).toContain('Authenticated as test123');
    page.homeLink.click();
    page.logoutLink.click();
    browser.get(page.userRoute);
    expect(page.loginMsg.getText()).toContain('Access denied');
  });

  it('should be able to delete the test user', function(){
    page.login(username, pass);
    page.editUserLink.click();
    page.deleteButton.click();
    page.login(username, pass);
    expect(page.loginMsg.getText()).toContain('User Not Found');
  })
})
