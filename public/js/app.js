'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngSanitize',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io',
  'ui.bootstrap',
  'ui.router'
]).
config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/seasons");

  $stateProvider.
    state('seasons', {
      url: '/seasons',
      templateUrl: 'partials/seasons',
      controller: 'SeasonsCtrl',
      resolve: {
        response: function ($http) {
          return $http.get('/api/seasons');
        }
      }
    }).
    state('season', {
      url: '/seasons/:id',
      templateUrl: 'partials/season',
      controller: 'SeasonCtrl',
      resolve: {
        response: function ($http, $stateParams) {
          return $http.get('/api/seasons/' + $stateParams.id);
        }
      }
    }).
    state('game', {
      url: '/games/:id',
      templateUrl: 'partials/game',
      controller: 'GameCtrl',
      resolve: {
        response: function ($http, $stateParams) {
          return $http.get('/api/games/' + $stateParams.id);
        }
      }
    }).
    state('board', {
      url: '/board',
      templateUrl: 'partials/board',
      controller: 'BoardCtrl'
    });
}).
config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain. **.
    'http://localhost:8000/**',
    'http://192.168.4.1:8000/**',
    'http://192.168.178.41:8000/**',
    'http://192.168.4.19:8000/**',
])});
