"use strict";
/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/**
* This sample shows how to:
*    - Get the current user's metadata
*    - Get the current user's profile photo
*    - Attach the photo as a file attachment to an email message
*    - Upload the photo to the user's root drive
*    - Get a sharing link for the file and add it to the message
*    - Send the email
*/
var express = require('express');
var router = express.Router();
var graphHelper = require('../utils/graphHelper.js');
var emailer = require('../utils/emailer.js');
var passport = require('passport');
// ////const fs = require('fs');
// ////const path = require('path');
// Get the home page.
router.get('/', function (req, res) {
    // check if user is authenticated
    if (!req.isAuthenticated()) {
        res.render('login');
    }
    else {
        renderSendMail(req, res);
    }
});
// Authentication request.
router.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), function (req, res) {
    res.redirect('/');
});
// Authentication callback.
// After we have an access token, get user data and load the sendMail page.
router.get('/token', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), function (req, res) {
    graphHelper.getUserData(req.user.accessToken, function (err, user) {
        if (!err) {
            req.user.profile.displayName = user.body.displayName;
            req.user.profile.emails = [{ address: user.body.mail || user.body.userPrincipalName }];
            renderSendMail(req, res);
        }
        else {
            renderError(err, res);
        }
    });
});
// Load the sendMail page.
function renderSendMail(req, res) {
    res.render('sendMail', {
        display_name: req.user.profile.displayName,
        email_address: req.user.profile.emails[0].address
    });
}
// Do prep before building the email message.
// The message contains a file attachment and embeds a sharing link to the file in the message body.
function prepForEmailMessage(req, callback) {
    var accessToken = req.user.accessToken;
    var displayName = req.user.profile.displayName;
    var destinationEmailAddress = req.body.default_email;
    // Get the current user's profile photo.
    graphHelper.getProfilePhoto(accessToken, function (errPhoto, profilePhoto) {
        // //// TODO: MSA flow with local file (using fs and path?)
        if (errPhoto)
            renderError(errPhoto);
        // Upload profile photo as file to OneDrive.
        graphHelper.uploadFile(accessToken, profilePhoto, function (errFile, file) {
            if (errFile)
                renderError(errFile);
            // Get sharingLink for file.
            graphHelper.getSharingLink(accessToken, file.id, function (errLink, link) {
                if (errLink)
                    renderError(errLink);
                var mailBody = emailer.generateMailBody(displayName, destinationEmailAddress, link.webUrl, profilePhoto);
                callback(null, mailBody);
            });
        });
    });
}
// Send an email.
router.post('/sendMail', function (req, res) {
    var response = res;
    var templateData = {
        display_name: req.user.profile.displayName,
        email_address: req.user.profile.emails[0].address,
        actual_recipient: req.body.default_email
    };
    prepForEmailMessage(req, function (errMailBody, mailBody) {
        if (errMailBody)
            renderError(errMailBody);
        graphHelper.postSendMail(req.user.accessToken, JSON.stringify(mailBody), function (errSendMail) {
            if (!errSendMail) {
                response.render('sendMail', templateData);
            }
            else {
                if (hasAccessTokenExpired(errSendMail)) {
                    errSendMail.message += ' Expired token. Please sign out and sign in again.';
                }
                renderError(errSendMail, response);
            }
        });
    });
});
router.get('/disconnect', function (req, res) {
    req.session.destroy(function () {
        req.logOut();
        res.clearCookie('graphNodeCookie');
        res.status(200);
        res.redirect('/');
    });
});
// helpers
function hasAccessTokenExpired(e) {
    var expired;
    if (!e.innerError) {
        expired = false;
    }
    else {
        expired = e.forbidden &&
            e.message === 'InvalidAuthenticationToken' &&
            e.response.error.message === 'Access token has expired.';
    }
    return expired;
}
/**
 *
 * @param {*} e
 * @param {*} res
 */
function renderError(e, res) {
    e.innerError = (e.response) ? e.response.text : '';
    res.render('error', {
        error: e
    });
}
module.exports = router;
