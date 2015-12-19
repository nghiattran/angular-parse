'use strict';

/**
 * @ngdoc overview
 * @name angularParseApp
 * @description
 * # angularParseApp
 *
 * Main module of the application.
 */
angular
  .module('angularParseApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'jsonFormatter',
    'ngTouch',
    'angularParse'
  ])
  .config(function ($routeProvider) {
    // angularParse.setBaseUrl = "http://localhost:8000/api/";
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
