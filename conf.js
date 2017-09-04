// protractor conf.js to utilize
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/**/*.spec.js'],
  baseUrl: 'http://ec2.jnielson.com:3066/', //This should generally be overwritten using the --baseUrl="http://..." command line parameter
  stackTrace: false,
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 12000,
    print: function () { }
  },
  onPrepare: () => {
    // Change ignoreSynchronization to false for angular front-ends!
    // browser.ignoreSynchronization = false;

    // Change ignoreSynchronization to true for anything not utilizing angular (or it won't work properly)!
    browser.ignoreSynchronization = true;

    // add jasmine spec reporter
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({ displayStacktrace: 'full' }));
    return browser.getProcessedConfig().then(function (config) {
      // config.capabilities is the CURRENT capability being run, if
      // you are using multiCapabilities.
      console.log('Executing with url: ', config.baseUrl); //Prints out the URL that is about to be tested
    });
  }
}
