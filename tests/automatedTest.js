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
      // Rewrite authHelper.js file to include the credentials from environment variables
      var newAuthHelperFileContent;
      clientId = process.env.test_client_id;
      clientSecret = process.env.test_client_secret;
      username = process.env.test_username;
      password = process.env.test_password;
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
      driver.findElement(webdriver.By.id('cred_userid_inputtext')).sendKeys(username);
      driver.findElement(webdriver.By.id('cred_password_inputtext')).sendKeys(password);

      driver.wait(function () {
        return driver.findElement(webdriver.By.id('send_mail_button')).catch(function () {
          driver.findElement(webdriver.By.id('cred_sign_in_button')).click();
        });
      }, 3000, 'Could not wait for the authentication page');

      driver.findElement(webdriver.By.id('send_mail_button')).click();

      driver.wait(function () {
        return driver.findElement(webdriver.By.css('.ms-font-m'));
      }, 3000, 'Could not show the send mail page');

      driver.findElement(
        webdriver.By.css('.ms-font-m')).getAttribute('innerText').then(function (value) {
          assert.equal(value, 'Successfully sent an email to MollyD@MOD182601.onmicrosoft.com!');
        }
      );

      driver.findElement(webdriver.By.id('disconnect_link')).click();

      driver.wait(function () {
        return driver.findElement(webdriver.By.id('login_workload_logo_text'));
      }, 3000, 'Could not find the azure sign out page');

      done();
    }

  );
});
