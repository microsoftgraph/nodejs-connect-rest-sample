"use strict";
/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
module.exports = {
    creds: {
        redirectUrl: 'http://localhost:3000/token',
        clientID: '730a92c4-c899-457c-ae30-fba1512a3e7f',
        clientSecret: 'GnoM1tdecKmWEboEQKVLdnK',
        identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        allowHttpForRedirectUrl: true,
        responseType: 'code',
        validateIssuer: false,
        responseMode: 'query',
        scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite']
    }
};
