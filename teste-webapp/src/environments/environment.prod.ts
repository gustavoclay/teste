export const environment = {
  production: true,
  apiUrl: 'https://teste-api.herokuapp.com/teste',

  // token oauth0
  tokenWhitelistedDomains: [new RegExp('teste-api.herokuapp.com'), 'teste-api.herokuapp.com', new RegExp('teste')],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
