describe('lab 5 Passoff', function() {
  var page = require('../pageobjects/lab5.page.js');
  var waitForAjax = 2500;
  beforeEach(function(done) {
    browser.get(page.lab5URL);
    done()
  });

  it('should have the required elements', function(done) {
    expect(page.name.isPresent()).toBe(true);
    expect(page.comment.isPresent()).toBe(true);
    expect(page.post.isPresent()).toBe(true);
    expect(page.get.isPresent()).toBe(true);
    expect(page.deleteAll.isPresent()).toBe(true);
    done();
  });

  it('should be able to post a comment', function(done) {
    page.name.clear().click()
    'Jordan'.split('').forEach((c) => page.name.sendKeys(c))
    page.comment.clear().click()
    'Hello There!'.split('').forEach((c) => page.comment.sendKeys(c))
    page.post.click();
    expect(page.jsonForm.getText()).toContain('{"Name":"Jordan","Comment":"Hello There!"}');
    setTimeout(function () {
        page.statusSpot.getText().then(text => {
          expect(text).toContain('success')
          done()
        })
    }, waitForAjax)
  });

  it('should be able to pull up previous comments', function(done) {
    page.get.click();
    setTimeout(function () {
        page.commentsList.getText().then(text => {
          expect(text).toContain('Name: Jordan -- Comment: Hello There!')
          done()
        })
    }, waitForAjax)
  })

  it('should be able to go directly to the comments route and see the list', function(done) {
    browser.get('/comment');
    $('body').getText().then(text => {
      console.log(text);
      expect(text).toContain('Jordan');
      done();
    });
  });

  it('should be able to delete all comments', function(done) {
    page.deleteAll.click();
    page.get.click();
    setTimeout(function () {
        page.commentsList.getText().then(text => {
          console.log(text);
          expect(text).toEqual('')
          done()
        })
    }, waitForAjax)

  });
});
