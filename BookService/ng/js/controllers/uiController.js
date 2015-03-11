app.controller("uiController", ["$scope", function ($scope)
{
    console.log("uiController is alive!");
}]);

$scope.allPartials =
    [
        {
            template: 'partials/bookform.html',
            controller: "bookformController"
        }
    ];

$scope.partialPath = $scope.allPartials[0];