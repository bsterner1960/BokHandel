app.controller("authorDetailsModalController", ["$scope", "Authors", "$modalInstance", "items", function ($scope, Authors, $modalInstance, items)
{
    console.log("items is: " + items.Name);
    $scope.author = items;
    $scope.authorError = false;

    console.log("Booting up authorDetailsModal successful, awaiting orders.");

    $scope.Cancel = function ()
    {
        console.log("Self-destruct has been overridden, emergency shut-down in 3... 2.... 1...");
        $modalInstance.close();
    };
}]);