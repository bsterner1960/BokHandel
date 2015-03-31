﻿app.controller("authorDetailsModalController", ["$scope", "$rootScope", "Authors", "$modalInstance", "author",
function ($scope, $rootScope, Authors, $modalInstance, author)
{
    console.log("author is: " + author.Name);
    $scope.author = author;
    $scope.authorError = false;

    
    console.log("Booting up authorDetailsModal successful, awaiting orders.");

    $scope.deletionObject =
    {
        Id: author.Id
    };

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.Delete = function ()
    {
        
        $scope.alerts = [];

        Authors.destroy($scope.deletionObject,
        function ()
        {
            //Success call
            console.log("Target successfully terminated, searching for new targets... " + data);
            $modalInstance.close("");
        },
        function (error)
        {
            // Error call
            console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
            $scope.alerts.push({ type: 'danger', msg: "Failure to terminate target, recharging main weapons... : " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Save = function()
    {
        $scope.alerts = [];

        $scope.actualObject =
        {
            Id: $scope.author.Id,
            Name: $scope.author.Name
        };

        Authors.update($scope.actualObject,
        function (data)
        {
            //for successful calls
            $modalInstance.close("");
        },
        function (error)
        {
            // Success!
            console.log("Unable to update author. ");
            $scope.alerts.push({ type: 'danger', msg: "Failed to complete the save operation, self-destruction imminent: " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Cancel = function ()
    {
        console.log("Self-destruct has been overridden, emergency shut-down in 3... 2.... 1...");
        $modalInstance.close("");
    };
}]);