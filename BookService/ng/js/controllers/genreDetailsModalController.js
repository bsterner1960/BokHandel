app.controller("genreDetailsModalController", ["$scope", "$rootScope", "Genres", "$modalInstance", "genre",
function ($scope, $rootScope, Genres, $modalInstance, genre)
{
 
    $scope.returnObject =
    {
        action: "",
        data: ""
    }

    $scope.myGenre = Genres.show({ Id: genre.Id },
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
        Id: genre.Id
    };

    $scope.test = "";

    $scope.alerts = [];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.Delete = function ()
    {
        $scope.alerts = [];

        Genres.destroy($scope.deletionObject,
        function (data)
        {
            //Success call
            //console.log("Target successfully terminated, searching for new targets... " + data);

            $scope.returnObject.action = "delete";
            $scope.returnObject.data = data;

            $modalInstance.close($scope.returnObject);
        },
        function (error)
        {
            // Error call
            //console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
            $scope.alerts.push({ type: 'danger', msg: "Failure to terminate target, recharging main weapons...: " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Save = function ()
    {
        $scope.alerts = [];

        $scope.actualObject =
        {
            Id: $scope.myGenre.Id,
            Name: $scope.myGenre.Name,
            Description: $scope.myGenre.Description
        };

        //console.log($scope.actualObject.Id);

        Genres.update($scope.actualObject,
        function (data)
        {
        // Success!

        $scope.returnObject.action = "save";
        $scope.returnObject.data = data;

        $modalInstance.close($scope.returnObject);
        },
        function (error)
        {
            $scope.alerts.push({ type: 'danger', msg: "Failed to complete the save operation, self-destruction imminent: " + error.status + " " + error.statusText + "" });
        })
   }

    $scope.Cancel = function ()
    {
        //console.log("Self-destruct has been overridden, systems functional, awating orders.");
        $scope.returnObject.action = "cancel";
        $modalInstance.close($scope.returnObject);
    };
}]);