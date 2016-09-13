/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var https = require('https');

/**
 * Generates a GET request the user endpoint
 * @param {string} accessToken the access token with which the request should be authenticated
 * @param {callback} callback
 */
function getUserData(accessToken, callback) {
}

/**
 * Generates a POST request to the SendMail endpoint
 * @param {string} accessToken the access token with which the request should be authenticated
 * @param {string} data the data which will be 'POST'ed
 * @param {callback} callback
 */
function postSendMail(accessToken, mailBody, callback) {
}

exports.getUserData = getUserData;
exports.postSendMail = postSendMail;
