// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    authority: 'https://localhost:5000',
    clientId: 'AngularClient',
    redirectUri: 'http://localhost:4200/home/',
    responseType: 'id_token token',
    scope: 'openid Vinyl Basket customProfile',
    msVinyl: 'http://localhost:5002',
    msBasket2: 'http://localhost:5003',

    microservice1Url: 'http://localhost:5011/api/song',
    microservice2Url: 'http://localhost:5012/ShoppingCart'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
