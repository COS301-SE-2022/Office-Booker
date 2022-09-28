// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  cognito: {
    userPoolId: 'us-east-1_B4cTzx2oi',
    userPoolWebClientId: '4fq13t0k4n7rrpuvjk6tua951c',
  },
  production: false,
  API_URL: 'https://api.officebooker.co.za',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
