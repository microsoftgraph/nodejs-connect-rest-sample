var assert = require('assert');
var https = require('https');
var querystring = require('querystring');
var graphHelper = require('../utils/graphHelper.js');
var emailer = require('../utils/emailer.js');
var path = require('path');
var fs = require('fs');

describe('Integration', function () { // eslint-disable-line no-undef
  var accessToken;
  before( // eslint-disable-line no-undef
    function (done) {
      // Read variables from testConfig.json file
      var configFilePath = path.join(__dirname, 'testConfig.json');
      var config = JSON.parse(fs.readFileSync(configFilePath, { encoding: 'utf8' }));

      var postData = querystring.stringify(
        {
          grant_type: 'password',
          resource: 'https://graph.microsoft.com/',
          client_id: config.test_client_id_v1,
          client_secret: config.test_client_secret_v1,
          username: config.test_username,
          password: config.test_password
        }
      );

      var postOptions = {
        host: 'login.microsoftonline.com',
        port: 443,
        path: '/common/oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      var postRequest = https.request(postOptions, function (res) {
        var data = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          accessToken = JSON.parse(data).access_token;
          done();
        });
      });

      postRequest.on('error', function (e) {
        console.log('Error: ' + e.message);
        done(e);
      });

      postRequest.write(postData);
      postRequest.end();
    }
  );
  it( // eslint-disable-line no-undef
    'Checking that the sample can send an email',
    function (done) {
      var postBody = emailer.generateMailBody(
        process.env.test_username,
        process.env.test_username
      );
      graphHelper.postSendMail(
        accessToken,
        JSON.stringify(postBody),
        function (error) {
          assert(error === null, '\nThe sample failed to send an email');
          done();
        });
    }
  );
});
