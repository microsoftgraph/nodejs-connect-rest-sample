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
  // check for token
  req.session.destroy();
  res.clearCookie('nodecookie');
  clearCookies(res);
  res.status(200);
  res.redirect('http://localhost:3000');
});

/* GET home page. */
router.get('/login', function (req, res) {
  if (req.query.code !== undefined) {
    authHelper.getTokenFromCode(req.query.code, function (e, accessToken, refreshToken) {
      if (e === null) {
        // cache the refresh token in a cookie and go back to index
        res.cookie(authHelper.ACCESS_TOKEN_CACHE_KEY, accessToken);
        res.cookie(authHelper.REFRESH_TOKEN_CACHE_KEY, refreshToken);
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
  requestUtil.getUserData(
    req.cookies.ACCESS_TOKEN_CACHE_KEY,
    function (e, user) {
      if (user !== null) {
        req.session.user = user;
        res.render('sendMail', { display_name: user.displayName, user_principal_name: user.userPrincipalName });
      } else if (hasAccessTokenExpired(e)) {
        // Handle the refresh flow
        authHelper.getTokenFromRefreshToken(req.cookies.REFRESH_TOKEN_CACHE_KEY, function (e, accessToken) {
          res.cookie(authHelper.ACCESS_TOKEN_CACHE_KEY, accessToken);
          if (accessToken !== null) {
            requestUtil.getUserData(
              req.cookies.ACCESS_TOKEN_CACHE_KEY,
              function (e, user) {
                if (user !== null) {
                  req.session.user = user;
                  res.render('sendMail', { display_name: user.displayName, user_principal_name: user.userPrincipalName });
                } else {
                  clearCookies(res);
                  renderError(res, e);
                }
              }
            );
          } else {
            renderError(res, e);
          }
        });
      } else {
        renderError(res, e);
      }
    }
  );
}

router.post('/', function (req, res) {
  var destinationEmailAddress = req.body.default_email;
  var mailBody = emailer.generateMailBody(
    req.session.user.displayName,
    destinationEmailAddress
  );
  var templateData = {
    display_name: req.session.user.displayName, 
    user_principal_name: req.session.user.userPrincipalName,
    actual_recipient: destinationEmailAddress
  };
  
  requestUtil.postSendMail(
    req.cookies.ACCESS_TOKEN_CACHE_KEY,
    JSON.stringify(mailBody),
    function (e) {
      if (!e) {
        res.render('sendMail', templateData);
      } else if (hasAccessTokenExpired(e)) {
        // Handle the refresh flow
        authHelper.getTokenFromRefreshToken(req.cookies.REFRESH_TOKEN_CACHE_KEY, function (e, accessToken) {
          res.cookie(authHelper.ACCESS_TOKEN_CACHE_KEY, accessToken);
          if (accessToken !== null) {
            requestUtil.postSendMail(
              req.cookies.ACCESS_TOKEN_CACHE_KEY,
              JSON.stringify(mailBody),
              function (e) {
                if (!e) {
                  res.render('sendMail', templateData);
                } else {
                  clearCookies(res);
                  renderError(res, e);
                }
              }
            );
          } else {
            renderError(res, e);
          }
        });
      } else {
        renderError(res, e);
      }
    }
  );
  
});

function hasAccessTokenExpired(e) {
  if(!e.innerError) {
    return false;
  } else {
    return e.code === 401 &&
      e.innerError.code === 'InvalidAuthenticationToken' && 
      e.innerError.message === 'Access token has expired.';
  }
}

function clearCookies(res) {
  res.clearCookie(authHelper.ACCESS_TOKEN_CACHE_KEY);
  res.clearCookie(authHelper.REFRESH_TOKEN_CACHE_KEY);
}

function renderError(res, e) {
  res.render('error', {
    message: e.message,
    error: e
  });
}

module.exports = router;
