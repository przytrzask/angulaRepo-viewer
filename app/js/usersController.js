
(function () {
    'use strict';
    angular.module('starterApp').controller('usersController', function ($scope, $http, $q, MyService, $mdDialog, CurrentUser, $route) {

        $scope.pathReload = function () {
            $scope.path = 'angular';
            $scope.getUsers();
        }
        $scope.sortType = 'name';
        $scope.userState = undefined;

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
        }

        $scope.parseHeader = function (header) {   // i get this function from http://stackoverflow.com/questions/31812350/access-headers-properties-within-a-http-call-in-angularjs
            // Split parts by comma                     it works just fine
            var parts = header.split(',');
            var links = {};
            // Parse each part into a named link
            angular.forEach(parts, function (p) {
                var section = p.split(';');
                if (section.length != 2) {
                    throw new Error("section could not be split on ';'");
                }
                var url = section[0].replace(/<(.*)>/, '$1').trim();
                var queryString = {};
                url.replace(
                    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
                    function ($0, $1, $2, $3) { queryString[$1] = $3; }
                );
                var page = queryString['page'];
                if (angular.isString(page)) {
                    page = parseInt(page);
                }
                var name = section[1].replace(/rel="(.*)"/, '$1').trim();
                links[name] = page;
            });

            return links;
        }

        $scope.path = 'angular';

        $scope.isLoading = true;
        $scope.path = MyService.getCurrentUrl();
        

        $scope.main = {
            page: 1,
            take: 30,
            pages: 1 //by default
        };

        $scope.getUsers = function () {
 


            $http({
                method: "GET",
                url: "https://api.github.com/repos/angular/" + $scope.path + "/contributors?access_token=688f431c2ad958661086cd0c5fb1de859e25ce1e&perPage=" + $scope.main.take + "&page=" + $scope.main.page + "&per_page=perpage"

            }).then(function mySucces(response) {
               $scope.mydata = response.data;
                $scope.myHeader = response.headers().link;
                if ($scope.myHeader === undefined) {
                    $scope.main.pages === 1
                } else {
                console.log($scope.myHeader);
                $scope.parseHeader($scope.myHeader);
                $scope.main.pages = $scope.parseHeader(response.headers().link).last;
                }   //geting number of pages from header
                

            }, function myError(response) {
                $scope.error = response.statusText;

            });
        };
        $scope.getUsers();
        $scope.nextPage = function () {

            if ($scope.main.page < $scope.main.pages) {
                $scope.main.page++;
                $scope.getUsers();
            }
        };

        $scope.previousPage = function () {
            if ($scope.main.page > 1) {
                $scope.main.page--;
                $scope.getUsers();
            }

        }

        $scope.setUser = function (name) {
            CurrentUser.setUser(name);
        }


        $scope.showAdvanced = function (event) {
            $mdDialog.show({
                controller: 'usersController',
                templateUrl: 'assets/templates/dialog.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen
            });

        };

    });

})();