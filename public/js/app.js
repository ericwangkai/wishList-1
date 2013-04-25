'use strict';

// Declare app level module which depends on filters, and services
angular.module('wishList', ['wishList.filters', 'wishList.services', 'wishList.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
  }]).run(['$rootScope', '$http', '$location', function($rootScope, $http, $location){
	$rootScope.isLogin = false;
	$rootScope.checkUser = function () {
        if ($rootScope.global.user) {
            $rootScope.isLogin = true;
        } else {
            $rootScope.isLogin = false;
        }
    };
  }]);