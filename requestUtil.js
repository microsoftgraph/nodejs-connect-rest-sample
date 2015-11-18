// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
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
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  };

  https.get(options, function (response) {
    var body = "";
    response.on('data', function (d) {
      body += d;
    });
    response.on('end', function () {
      callback(body);
    });
    response.on('error', function (e) {
      callback(null);
    });
  });
};

/**
 * Generates a POST request (of Content-type ```application/json```)
 * @param {string} host the host to whom this request will be sent
 * @param {string} path the path, relative to the host, to which this request will be sent
 * @param {string} token the authorization token with which the request should be signed
 * @param {string} postData the data which will be 'POST'ed
 * @param {callback} callback
 */
function postData(host, path, token, postData, callback) {
  var outHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token,
    'Content-Length': postData.length
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
  post.write(postData);
  // we're done!
  post.end();

  post.on('error', function (e) {
    console.log('Request error: ' + e.message);
  });
}

exports.getJson = getJson;
exports.postData = postData;

/*
######################################################################
O365-Nodejs-Microsoft-Graph-Connect, https://github.com/OfficeDev/O365-Nodejs-Microsoft-Graph-Connect

Copyright (c) Microsoft Corporation
All rights reserved.

MIT License:
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
######################################################################
*/
