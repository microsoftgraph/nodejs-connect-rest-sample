/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

const express = require('express');
const router = express.Router();
const graphHelper = require('../utils/graphHelper.js');
const emailer = require('../utils/emailer.js');
const passport = require('passport');

// Get the home page. 
router.get('/', (req, res) => {
  // check if user is authenticated
  if (!req.isAuthenticated()) { 
    res.render('login');
  } else {
    renderSendMail(req, res);
  }
});

// Authentication request.
router.get('/login',
	passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
	(req, res) => {
		res.redirect('/');
});

// Authentication callback.
// After we have an access token, get user data and load the sendMail page.
router.get('/token', 
	passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), 
	(req, res) => {
		graphHelper.getUserData(req.user.accessToken, (err, user) => {
      if (err === null) {
        req.user.profile.displayName = user.displayName;
        req.user.profile.emails = [{ 'address': user.mail || user.userPrincipalName }];
        renderSendMail(req, res);
      }
		});
});

// Load the sendMail page.
function renderSendMail(req, res) {
  res.render('sendMail', {
      display_name: req.user.profile.displayName,
      email_address: req.user.profile.emails[0].address
    }
  );
}

// Send an email.
router.post('/sendMail', (req, res) => {
  const response = res;
  const destinationEmailAddress = req.body.default_email;
  const mailBody = emailer.generateMailBody(
    req.user.profile.displayName,
    destinationEmailAddress
  );
  const templateData = {
    display_name: req.user.profile.displayName,
    email_address: req.user.profile.emails[0].address,
    actual_recipient: destinationEmailAddress
  };

  graphHelper.postSendMail(
    req.user.accessToken,
    JSON.stringify(mailBody),
     (err) => {
      if (err === null) {
        response.render('sendMail', templateData);
      } else if (hasAccessTokenExpired(err)) {
        // TODO: Handle the refresh flow
      } else {
        renderError(response, err);
      }
    });
});

router.get('/disconnect', (req, res) => {
  req.session.destroy( (err) => {
    req.logOut();
    res.clearCookie('graphNodeCookie');
    res.status(200);
    res.redirect('/');
  })
});

// helpers
function hasAccessTokenExpired(e) {
  let expired;
  if (!e.innerError) {
    expired = false;
  } else {
    expired = e.code === 401 &&
      e.innerError.code === 'InvalidAuthenticationToken' &&
      e.innerError.message === 'Access token has expired.';
  }
  return expired;
}

function renderError(res, e) {
  res.render('error', {
    message: e.message,
    error: e
  });
}

module.exports = router;
