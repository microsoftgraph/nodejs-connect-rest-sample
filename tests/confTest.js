var assert = require('assert');
var conf = require('../authHelper');

describe('ADAL', function () { // eslint-disable-line no-undef
  it( // eslint-disable-line no-undef
    'Checking clientID and clientSecret in authHelper.js',
    function () {
      assert(
        isADALConfigured(conf.credentials),
        '\nRegister client_id and client_secret in file authHelper.js.\n' +
        'You don\'t have them? Get them by using the Office 365 app registration tool\n' +
        'http://dev.office.com/app-registration\n' +
        'App type: Web App\n' +
        'Sign on URL: http://localhost:3000\n' +
        'Redirect URI: http://localhost:3000/login\n' +
        'App permissions: Mail.Send'
      );
    }
  );
});

function isADALConfigured(configuration) {
  var clientIDConfigured =
    typeof (configuration.client_id) !== 'undefined' &&
    configuration.client_id !== null &&
    configuration.client_id !== '' &&
    configuration.client_id !== 'ENTER_YOUR_CLIENT_ID';
  var clientSecretConfigured =
    typeof (configuration.client_secret) !== 'undefined' &&
    configuration.client_secret !== null &&
    configuration.client_secret !== '' &&
    configuration.client_secret !== 'ENTER_YOUR_SECRET';

  return clientIDConfigured && clientSecretConfigured;
}
