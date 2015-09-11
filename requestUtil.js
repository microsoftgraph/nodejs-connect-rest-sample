var https = require('https');

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

function postData(host, path, token, postData, callback) {
  var outHeaders = {
    'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
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
  });

  // post the data
  post.write(postData);
  post.end();

  post.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });
}

exports.getJson = getJson;
exports.postData = postData;