var AuthenticationContext = require("adal-node").AuthenticationContext;

var credentials = {
    authority: "https://login.microsoftonline.com/common",
    client_id: "3c34db37-8e11-4719-97a8-96bd9f41c574",
    client_secret: "AayrS5JeyK4eM3ih1zFuzIHqULAsdJVjfl4h4HRQVRI=",
    redirect_url: "http://localhost:8080/login"
};

function getAuthUrl(res) {
    return credentials.authority + "/oauth2/authorize" +
        "?client_id=" + credentials.client_id +
        "&resources=" + res +
        "&response_type=code" +
        "&redirect_uri=" + credentials.redirect_url;
};

function getTokenFromCode(res, code, callback) {
    var authContext = new AuthenticationContext(credentials.authority);
    authContext.acquireTokenWithAuthorizationCode(code, credentials.redirect_url, res, credentials.client_id, credentials.client_secret, function(err, response) {
        if (err)
            callback(null);
        else {
            callback(response);
        }
    });
};

function getTokenFromRefreshToken(res, token, callback) {
    var authContext = new AuthenticationContext(credentials.authority);
    authContext.acquireTokenWithRefreshToken(token, credentials.client_id, credentials.client_secret, res, function(err, response) {
        if (err)
            callback(null);
        else {
            callback(response);
        }
    });
};

exports.getAuthUrl = getAuthUrl;
exports.getTokenFromCode = getTokenFromCode;
exports.getTokenFromRefreshToken = getTokenFromRefreshToken;
exports.TOKEN_CACHE_KEY = 'TOKEN_CACHE_KEY';
exports.TENANT_CAHCE_KEY = 'TENANT_CAHCE_KEY';
