/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var express = require('express');
var router = express.Router();
var authHelper = require('../authHelper.js');
var requestUtil = require('../requestUtil.js');
var emailer = require('../emailer.js');

/* GET home page. */
router.get('/', function (req, res) {
  // check for token
  if (req.cookies.REFRESH_TOKEN_CACHE_KEY === undefined) {
    res.redirect('login');
  } else {
    renderSendMail(req, res);
  }
});

router.get('/disconnect', function (req, res) {
  var redirectUri = 'http://localhost:3000';
  // check for token
  req.session.destroy();
  res.clearCookie('nodecookie');
  res.clearCookie(authHelper.ACCESS_TOKEN_CACHE_KEY);
  res.clearCookie(authHelper.REFRESH_TOKEN_CACHE_KEY);
  res.status(200);
  console.log('Disconnect redirect uri: ' + redirectUri);
  res.redirect(
    authHelper.credentials.authority + 
    authHelper.credentials.logout_endpoint + 
    '?post_logout_redirect_uri=' + redirectUri
  );
});

/* GET home page. */
router.get('/login', function (req, res) {
  if (req.query.code !== undefined) {
    authHelper.getTokenFromCode(req.query.code, function (e, access_token, refresh_token) {
      if (e === null) {
        // cache the refresh token in a cookie and go back to index
        res.cookie(authHelper.ACCESS_TOKEN_CACHE_KEY, access_token);
        res.cookie(authHelper.REFRESH_TOKEN_CACHE_KEY, refresh_token);
        res.redirect('/');
      } else {
        console.log(JSON.parse(e.data).error_description);
        res.status(500);
        res.send();
      }
    });
  } else {
    res.render('login', { auth_url: authHelper.getAuthUrl() });
  }
});

function renderSendMail(req, res) {
  wrapRequestAsCallback(req.cookies.REFRESH_TOKEN_CACHE_KEY, {

    onSuccess: function (results) {
      var user = {};
      // get the user
      requestUtil.getJson(
        'graph.microsoft.com',
        '/v1.0/me',
        results.access_token,
        function (user) {
          if (user !== null) {
            req.session.user = user;
            res.render('sendMail', { title: 'Express', data: user });
          }
        }
      );
    },

    onFailure: function (err) {
      res.status(err.code);
      console.log(err.message);
      res.send();
    }
  });
}

router.post('/', function (req, res) {
  var destinationEmailAddress = req.body.default_email;
  wrapRequestAsCallback(req.cookies.REFRESH_TOKEN_CACHE_KEY, {

    onSuccess: function (results) {
      // send the mail with a callback and report back that page...
      var postBody = emailer.generatePostBody(
        req.session.user.displayName,
        destinationEmailAddress
      );
      requestUtil.postData(
        'graph.microsoft.com',
        '/v1.0/me/microsoft.graph.sendMail',
        results.access_token,
        JSON.stringify(postBody),
        function (result) {
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
  authHelper.getTokenFromRefreshToken(tokenKey, function (e, results) {
    if (results !== null) {
      callback.onSuccess(results);
    } else {
      callback.onFailure({
        code: 500,
        message: 'An unexpected error was encountered acquiring access token from refresh token'
      });
    }
  });
}

module.exports = router;
