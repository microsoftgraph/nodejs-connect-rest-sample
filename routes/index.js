var express = require('express');
var router = express.Router();
var authContext = require('adal-node').AuthenticationContext;
var authHelper = require('../authHelper.js');
var requestUtil = require('../requestUtil.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  //check for token
  if (req.cookies.TOKEN_CACHE_KEY === undefined)
    res.redirect('login');
  else {
    renderSendMail("me", req, res);
  }
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
      var user = { user: null, manager: null, directReports: null, files: null };
      
      //get the user
      requestUtil.getJson('graph.microsoft.com', '/beta/' + path, token.accessToken, function (result) {
        if (result != null) {
          console.log(result);
          user.user = JSON.parse(result);
          if (user.user !== null)
            res.render('sendMail', { title: 'Express', data: user });
        }
      });
    }
    else {
      //TODO: ERROR
    }
  });
}

module.exports = router;