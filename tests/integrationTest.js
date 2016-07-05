var assert = require('assert');
var https = require('https');
var querystring = require('querystring');
var requestUtil = require('../requestUtil.js');
var emailer = require('../emailer.js');

describe('Integration', function () { // eslint-disable-line no-undef
  var accessToken;
  before( // eslint-disable-line no-undef
    function (done) {
      var postData = querystring.stringify(
        {
          grant_type: 'password',
          resource: 'https://graph.microsoft.com/',
          client_id: process.env.test_client_id,
          client_secret: process.env.test_client_secret,
          username: process.env.test_username,
          password: process.env.test_password
        }
      );

      var postOptions = {
        host: 'login.microsoftonline.com',
        port: '443',
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
      var postBody = emailer.generatePostBody(
        process.env.test_username,
        process.env.test_username
      );
      requestUtil.postData(
        'graph.microsoft.com',
        '/v1.0/me/microsoft.graph.sendMail',
        accessToken,
        JSON.stringify(postBody),
        function (result) {
          assert(result.statusCode === 202, '\nThe sample failed to send an email');
          done();
        });
    }
  );
});
