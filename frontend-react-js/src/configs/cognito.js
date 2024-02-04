import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_AWS_COGNITO_REGION,
    identityPoolRegion: process.env.REACT_APP_AWS_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID,
    userPoolWebClientId: process.env.REACT_APP_AWS_COGNITO_APP_CLIENT_ID,
    Cognito: {
      loginWith: {
          oauth: {}
      }
    }
  }
});