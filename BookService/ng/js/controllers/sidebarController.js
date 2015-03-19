angular.module('ui.bootstrap').controller('sidebarController', function ($scope, $rootScope)
{
    console.log("All systems online, sidebarController successfully engaged, awaiting orders.");
    $scope.minTest = "Test Successful!"

    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }
});