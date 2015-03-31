app.controller("genreDetailsModalController", ["$scope", "$rootScope", "Genres", "$modalInstance", "genre",
function ($scope, $rootScope, Genres, $modalInstance, genre)
{
    
    console.log("My genre is: " + genre.Name);
    $scope.genre = genre;

    $scope.deletionObject =
    {

    };

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
            console.log("Target successfully terminated, searching for new targets... " + data);
            $modalInstance.close(data);
        },
        function (error)
        {
            // Error call
            console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
            $scope.alerts.push({ type: 'danger', msg: "Failure to terminate target, recharging main weapons...: " + error.status + " " + error.statusText + "" });
        });
    }

    $scope.Save = function ()
    {
        $scope.alerts = [];

        $scope.actualObject =
        {
            Id: $scope.genre.Id,
            Name: $scope.genre.Name,
            Description: $scope.genre.Description
        };

        console.log($scope.actualObject.Id);

        Genres.update($scope.actualObject,
        function (data)
        {
        console.log("data: " + data);
        // Success
        $modalInstance.close("");
        },
        function (error)
        {
            $scope.alerts.push({ type: 'danger', msg: "Failed to complete the save operation, self-destruction imminent: " + error.status + " " + error.statusText + "" });
        })
   }

    $scope.Cancel = function ()
    {
        console.log("Self-destruct has been overridden, systems functional, awating orders.");
        $modalInstance.close("");
    };
}]);