import * as React from "react";
import adal from 'adal-angular';

const adalConfig: adal.Config = {
  clientId: '1625d5c3-d455-4529-aab6-de3add659ee9',
  tenant: 'agzertuche.onmicrosoft.com',
  extraQueryParameter: 'nux=1',
  endpoints: {
    'https://graph.microsoft.com': 'https://graph.microsoft.com'
  },
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'sessionStorage'
};

export default adalConfig;