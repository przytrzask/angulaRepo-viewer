
(function() {
   'use strict';
angular.module('starterApp').controller('userController', function ($scope, $http, CurrentUser) {

        $scope.user = CurrentUser.getUser();
        $scope.getuserDetails = function () {
            $http({
                method: "GET",
                url: "https://api.github.com/users/" + $scope.user + "?access_token=9a49d57f55580ffaee31dbf403e220d77c1c7db0"
            }).then(function mySucces(response) {
                console.log(response.data)
                $scope.userInfo = response.data;

                // $scope.result = $scope.mydata.map(function (a) { return { 'name': a.name, 'html_url': a.html_url }; });  TODO map only interestin content
                console.log($scope.result);

            }, function myError(response) {
                $scope.error = response.statusText;

            });
        };

        $scope.getuserDetails();




    });

})();