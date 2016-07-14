/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var https = require('https');

/**
 * Generates a GET request to the specified host
 * @param {string} accessToken the access token with which the request should be authenticated
 * @param {callback} callback
 */
function getUserData(accessToken, callback) {
  var options = {
    host: 'graph.microsoft.com',
    path: '/v1.0/me',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + accessToken
    }
  };

  https.get(options, function (response) {
    var body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      if(response.statusCode === 200) {
        callback(null, JSON.parse(body));
      } else {
        var error = new Error();
        error.code = response.statusCode;
        error.message = response.statusMessage;
        error.innerError = JSON.parse(body).error;
        callback(error, null);
      }
    });
    }).on('error', function (e) {
    callback(e, null);
  });
}

/**
 * Generates a POST request (of Content-type ```application/json```)
 * @param {string} host the host to whom this request will be sent
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} accessToken the access token with which the request should be authenticated
 * @param {string} data the data which will be 'POST'ed
 * @param {callback} callback
 */
function postData(host, path, accessToken, data, callback) {
  var outHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + accessToken,
    'Content-Length': data.length
  };
  var options = {
    host: host,
    path: path,
    method: 'POST',
    headers: outHeaders
  };

  // Set up the request
  var post = https.request(options, function (response) {
    if(response.statusCode === 202) {
      response.on('data', function (chunk) {
        console.log('Response: ' + chunk);
      });
      response.on('end', function () {
        callback(null, response);
      });
    } else {
      // We consider everything else an error, even if statusCode is not greater than 400. 
      // We expect statusCode === 202 in this call, nothing else.
      var error = new Error();
      error.code = response.statusCode;
      error.message = response.statusMessage;
      callback(error, null);
    }
  });

  // write the outbound data to it
  post.write(data);
  // we're done!
  post.end();

  post.on('error', function (e) {
    callback(e, null);
  });
}

exports.getUserData = getUserData;
exports.postData = postData;
