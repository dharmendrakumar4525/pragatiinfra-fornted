// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
// local_connection  :  'https://pr.avidusinteractive.com/api',
// aws_connection  :  'https://pr.avidusinteractive.com/api'
// };

export const environment = {
  production: false,
  app_name:"pragati-infra-local",
  encryption: false,
  environmentType:'local',
  // api_path: 'https://pr.avidusinteractive.com/api/web',
  api_path: 'http://localhost:3000/api/web',
  cookiesOptions: {
    storeUnencoded: true,
    sameSite: 'Strict',
    secure: true,
    expires:new Date()
  },
  request_encode_key: '@#$Gg4sdVV5443g$#TVS@#f3g2&^%JH#2fc2@^%f2f23f#@@#fg',
  private_key: 'JuYo]&%^%f2f23f#'
};
