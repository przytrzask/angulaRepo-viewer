(function() {

    'use strict';
    
    angular.module('starterApp')
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('light-blue');
    })
    .config(function ($mdProgressCircularProvider) {
        // Example of changing the default progress options.
        $mdProgressCircularProvider.configure({
            progressSize: 100,
            strokeWidth: 10,
            duration: 400
        });
    })
    .config(function ($routeProvider) {
        $routeProvider

            .when('/', {
                templateUrl: 'assets/templates/about.html',
                controller: 'MainController'
            })

            .when('/repos', {
                templateUrl: 'assets/templates/repo.html',
                controller: 'MainController'
            })

            .when('/users', {
                templateUrl: 'assets/templates/users.html',
                controller: 'usersController'
            });
    })


    .factory('MyService', function () {  //comunicate between controllers

        var currentUrl = 'angular';

        return {
            setCurrentUrl: function (param) {
                currentUrl = param;
            },

            getCurrentUrl: function () {
                return currentUrl;
            }

        }

    })

    

    .factory('CurrentUser', function () {

        var user = "";

        return {
            setUser: function (name) {
                user = name;
            },
            getUser: function () {
                return user;
            }
        }
    });

    }());