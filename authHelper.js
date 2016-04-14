/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var AuthenticationContext = require('adal-node').AuthenticationContext;

// The application registration (must match Azure AD config)
var credentials = {
  authority: 'https://login.microsoftonline.com/common',
  client_id: 'ENTER_YOUR_CLIENT_ID',
  client_secret: 'ENTER_YOUR_SECRET',
  redirect_uri: 'http://localhost:3000/login'
};

/**
 * Generate a fully formed uri to use for authentication based on the supplied resource argument
 * @return {string} a fully formed uri with which authentcation can be completed
 */
function getAuthUrl() {
  return credentials.authority + '/oauth2/authorize' +
    '?client_id=' + credentials.client_id +
    '&response_type=code' +
    '&redirect_uri=' + credentials.redirect_uri;
}

/**
 * Gets a token for a given resource.
 * @param {string} code An authorization code returned from a client.
 * @param {string} res A URI that identifies the resource for which the token is valid.
 * @param {AcquireTokenCallback} callback The callback function.
 */
function getTokenFromCode(res, code, callback) {
  var authContext = new AuthenticationContext(credentials.authority);
  authContext.acquireTokenWithAuthorizationCode(
    code,
    credentials.redirect_uri,
    res, credentials.client_id,
    credentials.client_secret,
    function (err, response) {
      if (err) {
        callback(null);
      } else {
        callback(response);
      }
    }
  );
}


/**
 * Gets a new access token via a previously issued refresh token.
 * @param {string} res The OAuth resource for which a token is being request.
 *                     This parameter is optional and can be set to null.
 * @param {string} token A refresh token returned in a token response
 *                       from a previous invocation of acquireToken.
 * @param {AcquireTokenCallback} callback The callback function.
 */
function getTokenFromRefreshToken(res, token, callback) {
  var authContext = new AuthenticationContext(credentials.authority);
  authContext.acquireTokenWithRefreshToken(
    token,
    credentials.client_id,
    credentials.client_secret,
    res,
    function (err, response) {
      if (err) {
        callback(null);
      } else {
        callback(response);
      }
    }
  );
}

exports.credentials = credentials;
exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
exports.TOKEN_CACHE_KEY = 'TOKEN_CACHE_KEY';
exports.TENANT_CACHE_KEY = 'TENANT_CACHE_KEY';
