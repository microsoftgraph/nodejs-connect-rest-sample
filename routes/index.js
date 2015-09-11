var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../authHelper.js');
var requestUtil = require('../requestUtil.js')
var emailer = require('../emailer.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  //check for token
  if (req.cookies.TOKEN_CACHE_KEY === undefined)
    res.redirect('login');
  else {
    renderSendMail("me", req, res);
  }
});

router.post('/', function (req, res, next) {
  var destinationEmailAddress = req.body.default_email;
  console.log(destinationEmailAddress);
  authHelper.getTokenFromRefreshToken('https://graph.microsoft.com/', req.cookies.TOKEN_CACHE_KEY, function (token) {
    if (token !== null) {
      // send the mail with a callback and report back that page...
      var postBody = emailer.generatePostBody(destinationEmailAddress);
      requestUtil.postData('graph.microsoft.com', '/beta/me/sendMail', token.accessToken, JSON.stringify(postBody), function (result) {
        console.log(result.statusCode);
        res.render('sendMail', { title: 'Express', data: req.session.user, actual_recipient: destinationEmailAddress });
      });
    }
    else {
      //TODO: ERROR
    }
  });
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
        //TODO: ERROR
        console.log("Error");
      }
    });
  }
  else {
    res.render('login', { auth_url: authHelper.getAuthUrl('https://graph.microsoft.com/') });
  }
});

function renderSendMail(path, req, res) {
  authHelper.getTokenFromRefreshToken('https://graph.microsoft.com/', req.cookies.TOKEN_CACHE_KEY, function (token) {
    if (token !== null) {
      var user = {};
      //get the user
      requestUtil.getJson('graph.microsoft.com', '/beta/' + path, token.accessToken, function (result) {
        if (result != null) {
          console.log(result);
          user = JSON.parse(result);
          req.session.user = user;
          if (user !== null) {
            res.render('sendMail', { title: 'Express', data: user });
          }
        }
      });
    }
    else {
      //TODO: ERROR
    }
  });
}

module.exports = router;