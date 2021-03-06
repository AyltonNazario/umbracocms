// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultURL: "http://localhost:5000",
  contentStack: {
    api_key: "blt61764a790c9b3eb0",
    delivery_token: "csc4ae88a729cd5ac50d042b9f",
    environment: "production",
    content_type_uid: "investmentnews",
    endpoint: `https://cdn.contentstack.io`
  },
  orchardcms: {
    endpoint: "http://localhost:5002"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
