var assert = require('assert');
var conf = require('../utils/config');

describe('ADAL', function () { // eslint-disable-line no-undef
  it( // eslint-disable-line no-undef
    'Checking clientID and clientSecret in config.js',
    function () {
      assert(
        isADALConfigured(conf),
        '\nConfigure clientID and clientSecret in file utils/config.js.\n' +
        'Check the readme to learn how to register and configure your app.'
      );
    }
  );
});

function isADALConfigured(configuration) {
  var appId = configuration.creds.clientID;
  var appSecret = configuration.creds.clientSecret;
  var clientIDConfigured =
    typeof (appId) !== 'undefined' &&
    appId !== null &&
    appId !== '' &&
    appId !== 'aeef6fa1-b550-4896-8ba1-ae11acb47814';
  var clientSecretConfigured =
    typeof (appSecret) !== 'undefined' &&
    appSecret !== null &&
    appSecret !== '' &&
    appSecret !== 'Zs1HjJxvmCUyqtSm6DnmdOf';

  return clientIDConfigured && clientSecretConfigured;
}
