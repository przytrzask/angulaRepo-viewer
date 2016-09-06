
(function() {
   'use strict';
angular.module('starterApp').controller('MainController', function ($scope, $http, MyService) {

        $scope.sortType = 'name';
        $scope.userState = undefined;

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            // TODO $scope.reverse = !$scope.reverse;  set ascending or descending order
        }

        $scope.setSelectedUrl = function (param) {
            MyService.setCurrentUrl(param);

        }
        $scope.isLoading = true;
        $scope.main = {
            page: 1,
            take: 30,    //30 is also githubAPi max and default
            pages: 6
        };


        $scope.getData = function () {
            $http({
                method: "GET",
                url: "https://api.github.com/orgs/angular/repos?access_token=22eeb8d95eef2e22a16e6610ae0aeba4b062355b&page=" + $scope.main.page + "&per_page=perpage"
            }).then(function mySucces(response) {

                $scope.mydata = response.data;
                $scope.isLoading = false;
                $scope.result = $scope.mydata.map(function (a) { return { 'name': a.name, 'html_url': a.html_url }; }); //map only interesting data
            },
                function myError(response) {
                    $scope.error = response.statusText;

                });
        };
        $scope.getData();
        $scope.nextPage = function () {

            if ($scope.main.page < $scope.main.pages) {
                $scope.main.page++;
                $scope.getData();
            }
        };

        $scope.previousPage = function () {
            if ($scope.main.page > 1) {
                $scope.main.page--;
                $scope.getData();
            }

        }

    });

})();