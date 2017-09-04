var Lab3 = function() {
  
  var self = this;

  self.lab3URL = '/lab3'; //Your URL must end in this (and only this to work)

  self.h1 = $('body div h1'); //There should be a title - The tutorial has "Create new user"
  self.nameInput = element(by.model('userForm.name')); //There should be a place to input a user name - with this specific ng-model attribute
  self.imageInput = element(by.model('userForm.url')); //There should be a place to input a user image url - with this specific ng-model attribute
  self.emailInput = element(by.model('userForm.email')); //There should be a place to input a user email address - with this specific ng-model attribute
  self.addButton = element(by.buttonText('Add New')); //There must be a button with the text "Add New" (Case sensitive)

  self.userList = element.all(by.repeater('user in users')); //The user list needs to have this repeater used (eg: ng-repeat="user in users")
  self.avatars = element.all(by.css('avatar')); //There should be an html element called 'avatar' if you followed the tutorial
  self.userNames = element.all(by.repeater('user in users').column('user.name')); //This selects the user names -- it should just work if you followed the tutorial
  self.userEmails = element.all(by.repeater('user in users').column('user.email')); //This selects the user emails -- it should just work if you did email the same as the user name


}

module.exports = new Lab3();
/**
 * For more information about the test driver used, check out: protractortest.org
 * For information about page objects: http://www.protractortest.org/#/page-objects
 */