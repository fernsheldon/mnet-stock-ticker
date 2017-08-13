'use strict';

// Declare app level module which depends on views, and components


var express = require('express');
var app = express();
app.use(express.static(__dirname + '/app'));
app.listen(process.env.PORT || 3000);

angular.module('stockTicker', [
    'ngRoute',
    'stockTicker.view1',
  ])

  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
      redirectTo: '/view1'
    });
  }]);
