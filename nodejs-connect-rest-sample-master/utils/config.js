/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

module.exports = {
  creds: {
    redirectUrl: 'http://localhost:3000/token',
    clientID: 'aeef6fa1-b550-4896-8ba1-ae11acb47814',
    clientSecret: 'Zs1HjJxvmCUyqtSm6DnmdOf',
    identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
    allowHttpForRedirectUrl: true, // For development only
    responseType: 'code',
    validateIssuer: false, // For development only
    responseMode: 'query',
    scope: ['User.Read', 'Mail.Send', 'Files.ReadWrite']
  }
};
