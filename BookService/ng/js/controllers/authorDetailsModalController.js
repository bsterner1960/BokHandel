app.controller("authorDetailsModalController", ["$scope", "$rootScope", "Authors", "$modalInstance", "author",
function ($scope, $rootScope, Authors, $modalInstance, author)
{

    $scope.returnObject =
    {
        action: "",
        data: ""
    }

    $scope.myAuthor = Authors.show({ Id: author.Id },
    function (book)
    {
        //Success!

    }, function (error)
    {
        // Failure...
        $scope.alerts.push({ type: 'danger', msg: "Failure, the data requested was not retrieved successfully: " + error.status + " " + error.statusText + "" });
    });
    
    $scope.deletionObject =
    {
        Id: author.Id
    };

    $scope.alerts = [];

    $scope.closeAlert = function (index)
    {
        $scope.alerts.splice(index, 1);
    };

    $scope.Delete = function ()
    {
        
        $scope.alerts = [];

        Authors.destroy($scope.deletionObject,
        function (data)
        {
            //Success call
            ////console.log("Target successfully terminated, searching for new targets... " + data);

            $scope.returnObject.action = "delete";
            $scope.returnObject.data = data;
            $modalInstance.close($scope.returnObject);
        },
        function (error)
        {
            // Error call
            ////console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
            $scope.alerts.push({ type: 'danger', msg: "Failure to terminate target, recharging main weapons... : " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Save = function()
    {
        $scope.alerts = [];

        $scope.actualObject =
        {
            Id: $scope.myAuthor.Id,
            Name: $scope.myAuthor.Name
        };

        Authors.update($scope.actualObject,
        function (data)
        {
            // Success!
            $scope.returnObject.action = "save";
            $scope.returnObject.data = data;
            $modalInstance.close($scope.returnObject);
        },
        function (error)
        {
            // Failure...
            ////console.log("Unable to update author. ");
            $scope.alerts.push({ type: 'danger', msg: "Failed to complete the save operation, self-destruction imminent: " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Cancel = function ()
    {
        ////console.log("Self-destruct has been overridden, emergency shut-down in 3... 2.... 1...");
        $scope.returnObject.action = "cancel";
        $modalInstance.close($scope.returnObject);
    };
}]);