/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var AuthenticationContext = require('adal-node').AuthenticationContext;
var OAuth = require('oauth');

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
  var OAuth2 = OAuth.OAuth2;
  var oauth2 = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.authority,
    '/oauth2/authorize',
    '/oauth2/token'
  );

  oauth2.getOAuthAccessToken(
    code,
    {
      grant_type: 'authorization_code',
      redirect_uri: credentials.redirect_uri,
      resource: 'https://graph.microsoft.com/'
    },
    function(e, access_token, refresh_token, results){
      callback(e, access_token, refresh_token);
    }
  );


  // var authContext = new AuthenticationContext(credentials.authority);
  // authContext.acquireTokenWithAuthorizationCode(
  //   code,
  //   credentials.redirect_uri,
  //   res, credentials.client_id,
  //   credentials.client_secret,
  //   function (err, response) {
  //     if (err) {
  //       callback(null);
  //     } else {
  //       callback(response);
  //     }
  //   }
  // );
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
  var OAuth2 = OAuth.OAuth2;
  var oauth2 = new OAuth2(
    credentials.client_id,
    credentials.client_secret,
    credentials.authority,
    '/oauth2/authorize',
    '/oauth2/token'
  );

  oauth2.getOAuthAccessToken(
    token,
    {
      grant_type: 'refresh_token',
      redirect_uri: credentials.redirect_uri,
      resource: 'https://graph.microsoft.com/'
    },
    function(e, access_token, refresh_token, results){
      if (e) {
        callback(null);
      } else {
        callback(results);
      }
    }
  );

  // var authContext = new AuthenticationContext(credentials.authority);
  // authContext.acquireTokenWithRefreshToken(
  //   token,
  //   credentials.client_id,
  //   credentials.client_secret,
  //   res,
  //   function (err, response) {
  //     if (err) {
  //       callback(null);
  //     } else {
  //       callback(response);
  //     }
  //   }
  // );
}

exports.credentials = credentials;
exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
exports.ACCESS_TOKEN_CACHE_KEY = 'ACCESS_TOKEN_CACHE_KEY';
exports.REFRESH_TOKEN_CACHE_KEY = 'REFRESH_TOKEN_CACHE_KEY';
