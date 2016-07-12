var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var fs = require('fs');
var path = require('path');
var assert = require('assert');

var driver;
var authHelperFileContent;
var clientId;
var clientSecret;
var username;
var password;
var filePath;
before( // eslint-disable-line no-undef
    function () {
      var newAuthHelperFileContent;

      // Read variables from testConfig.json file
      var configFilePath = path.join(__dirname, 'testConfig.json');
      var config = JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf8' }));
      clientId = config.test_client_id_v2;
      clientSecret = config.test_client_secret_v2;
      username = config.test_username;
      password = config.test_password;

      // Rewrite authHelper.js file to include the credentials from testConfig file
      filePath = path.join(__dirname, '../authHelper.js');

      authHelperFileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

      newAuthHelperFileContent = authHelperFileContent.replace('ENTER_YOUR_CLIENT_ID', clientId);
      newAuthHelperFileContent =
        newAuthHelperFileContent.replace('ENTER_YOUR_SECRET', clientSecret);
      fs.writeFileSync(filePath, newAuthHelperFileContent, { encoding: 'utf8' });

      // Start node app
      require('../bin/www'); // eslint-disable-line global-require

      driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    }
  );

after( // eslint-disable-line no-undef
  function () {
    // Return authHelper.js file to include the credentials it had before the test
    fs.writeFileSync(filePath, authHelperFileContent, { encoding: 'utf8' });
    return driver.quit();
  }
);

test.describe('Automation', function () { // eslint-disable-line no-undef
  test.it( // eslint-disable-line no-undef
    'Connect sample happy path',
    function (done) {
      driver.get('http://localhost:3000');
      driver.findElement(webdriver.By.id('connect_button')).click();

      driver.findElement(webdriver.By.id('cred-userid-inputtext')).sendKeys(username);
      driver.findElement(webdriver.By.id('cred-password-inputtext')).sendKeys(password);

      driver.wait(function () {
        return driver.findElement(webdriver.By.id('send_mail_button')).catch(function () {
          driver.findElement(webdriver.By.id('submit-button')).click();
        });
      }, 3000, 'Could not wait for the authentication page');

      driver.findElement(webdriver.By.id('send_mail_button')).click();

      driver.wait(function () {
        return driver.findElement(webdriver.By.css('.ms-font-m'));
      }, 3000, 'Could not show the send mail page');

      driver.findElement(
        webdriver.By.css('.ms-font-m')).getAttribute('innerText').then(function (value) {
          assert.equal(value.substring(0, 29), 'Successfully sent an email to');
        }
      );

      driver.findElement(webdriver.By.id('disconnect_link')).click();

      driver.wait(function () {
        return driver.findElement(webdriver.By.id('connect_button'));
      }, 3000, 'Could not return to the start page');

      done();
    }

  );
});
