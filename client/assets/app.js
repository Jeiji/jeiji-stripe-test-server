var app = angular.module('app' , [ 'ngRoute' , 'ngMessages', 'ngMaterial'] );
app.config(function ($routeProvider) {
  $routeProvider
  .when( '/' , {
    templateUrl : 'index.html',
  })
  .otherwise({
    redirectTo : '/'
  });
});
