// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../authHelper.js');
var requestUtil = require('../requestUtil.js')
var emailer = require('../emailer.js');
var app = require('../app.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  //check for token
  if (req.cookies.TOKEN_CACHE_KEY === undefined)
    res.redirect('login');
  else {
    renderSendMail("me", req, res);
  }
});

router.get('/disconnect', function (req, res, next) {
  //check for token
  req.session.destroy();
  res.clearCookie('nodecookie');
  res.clearCookie(authHelper.TENANT_CACHE_KEY);
  res.clearCookie(authHelper.TOKEN_CACHE_KEY);
  res.status(200);
  var redirectUri = 'http://' + req.hostname + ':' + app.port;
  console.log('Disconnect redirect uri: ' + redirectUri);
  res.redirect('https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=' + redirectUri);
});

/* GET home page. */
router.get('/login', function (req, res, next) {
  if (req.query.code !== undefined) {
    authHelper.getTokenFromCode('https://graph.microsoft.com/', req.query.code, function (token) {
      if (token !== null) {
        //cache the refresh token in a cookie and go back to index
        res.cookie(authHelper.TOKEN_CACHE_KEY, token.refreshToken);
        res.cookie(authHelper.TENANT_CACHE_KEY, token.tenantId);
        res.redirect('/');
      }
      else {
        console.log("AuthHelper failed to acquire token");
        res.status(500);
        res.send();
      }
    });
  }
  else {
    res.render('login', { auth_url: authHelper.getAuthUrl() });
  }
});

function renderSendMail(path, req, res) {
  wrapRequestAsCallback(req.cookies.TOKEN_CACHE_KEY, {

    onSuccess: function (token) {
      var user = {};
      //get the user
      requestUtil.getJson('graph.microsoft.com', '/v1.0/' + path, token.accessToken, function (result) {
        console.log(token.accessToken);
        if (result != null) {
          console.log(result);
          user = JSON.parse(result);
          req.session.user = user;
          if (user !== null) {
            res.render('sendMail', { title: 'Express', data: user });
          }
        }
      });
    },

    onFailure: function (err) {
      res.status(err.code);
      console.log(err.message);
      res.send();
    }
  });
}

router.post('/', function (req, res, next) {
  var destinationEmailAddress = req.body.default_email;
  console.log(destinationEmailAddress);
  wrapRequestAsCallback(req.cookies.TOKEN_CACHE_KEY, {

    onSuccess: function (token) {
      // send the mail with a callback and report back that page...
      var postBody = emailer.generatePostBody(req.session.user.displayName, destinationEmailAddress);
      requestUtil.postData('graph.microsoft.com', '/v1.0/me/microsoft.graph.sendMail', token.accessToken, JSON.stringify(postBody), function (result) {
        console.log("Send mail status code: " + result.statusCode);
        console.log("\n\ntoken: " + token.accessToken);
        var templateData = {
          title: 'Microsoft Graph Connect',
          data: req.session.user,
          actual_recipient: destinationEmailAddress
        };
        if (result.statusCode >= 400) {
          templateData.status_code = result.statusCode;
        }
        res.render('sendMail', templateData);
      });
    },

    onFailure: function (err) {
      res.status(err.code);
      console.log(err.message);
      res.send();
    }
  });
});

function wrapRequestAsCallback(tokenKey, callback) {
  authHelper.getTokenFromRefreshToken('https://graph.microsoft.com/', tokenKey, function (token) {
    if (token !== null) {
      callback.onSuccess(token);
    } else {
      callback.onFailure({
        code: 500,
        message: "An unexpected error was encountered acquiring access token from refresh token"
      });
    }
  });
}

module.exports = router;

/*
######################################################################
O365-Nodejs-Microsoft-Graph-Connect, https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect

Copyright (c) Microsoft Corporation
All rights reserved.

MIT License:
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
######################################################################
*/
