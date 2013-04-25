'use strict';

/* Directives */


angular.module('wishList.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive('dropdown', function () {
    return function (scope, elm, attrs) {
         $(elm).dropdown();
        };
    });
