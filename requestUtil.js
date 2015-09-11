var https = require('https');

function getJson(host, path, token, callback) {
  var options = {
    host: host,
    path: path,
    method: 'GET',
    headers: forgeHeaders(token)
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

function forgeHeaders(token) {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + token
  };
}

exports.getJson = getJson;