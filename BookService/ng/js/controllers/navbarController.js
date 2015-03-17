angular.module('ui.bootstrap').controller('navbarController', function ($scope, $rootScope)
{
    console.log("navbarController is alive! Wohooooo :D");
    $scope.minTest = "hejsan!"

    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }
});