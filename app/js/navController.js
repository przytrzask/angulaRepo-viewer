
(function() {
   'use strict';

   angular.module('starterApp').controller('NavController', function ($scope, $http, $route) {
        $scope.currentNavItem = 'about';
        $scope.reload = function() {
            $route.reload()
        }
    });

}());