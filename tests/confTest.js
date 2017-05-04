var assert = require('assert');
var conf = require('../utils/config');

describe('ADAL', function () { // eslint-disable-line no-undef
  it( // eslint-disable-line no-undef
    'Checking clientID and clientSecret in config.js',
    function () {
      assert(
        isADALConfigured(conf),
        '\nConfigure clientID and clientSecret in file utils/config.js.\n' +
        'Check the readme to learn how to register and configure your app.'
      );
    }
  );
});

function isADALConfigured(configuration) {
  var appId = configuration.creds.clientID;
  var appSecret = configuration.creds.clientSecret;
  var clientIDConfigured =
    typeof (appId) !== 'undefined' &&
    appId !== null &&
    appId !== '' &&
    appId !== 'ENTER_YOUR_CLIENT_ID';
  var clientSecretConfigured =
    typeof (appSecret) !== 'undefined' &&
    appSecret !== null &&
    appSecret !== '' &&
    appSecret !== 'ENTER_YOUR_SECRET';

  return clientIDConfigured && clientSecretConfigured;
}
