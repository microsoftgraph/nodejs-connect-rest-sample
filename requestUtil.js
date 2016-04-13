/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
var https = require('https');

/**
 * Generates a GET request to the specified host
 * @param {string} host the host to whom this request will be sent
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the authorization token with which the request should be signed
 * @param {callback} callback
 */
function getJson(host, path, token, callback) {
  var options = {
    host: host,
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  };

  https.get(options, function (response) {
    var body = '';
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      callback(body);
    });
    response.on('error', function (e) {
      console.error(e);
      callback(null);
    });
  });
}

/**
 * Generates a POST request (of Content-type ```application/json```)
 * @param {string} host the host to whom this request will be sent
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the authorization token with which the request should be signed
 * @param {string} data the data which will be 'POST'ed
 * @param {callback} callback
 */
function postData(host, path, token, data, callback) {
  var outHeaders = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Length': data.length
  };
  var options = {
    host: host,
    path: path,
    method: 'POST',
    headers: outHeaders
  };

  // Set up the request
  var post = https.request(options, function (res) {
    console.log(res.statusCode);
    console.log(res.statusMessage);
    res.on('data', function (chunk) {
      console.log('Response: ' + chunk);
    });
    res.on('end', function () {
      callback(res);
    });
  });

  // write the outbound data to it
  post.write(data);
  // we're done!
  post.end();

  post.on('error', function (e) {
    console.log('Request error: ' + e.message);
  });
}

exports.getJson = getJson;
exports.postData = postData;
