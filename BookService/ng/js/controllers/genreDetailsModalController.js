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

    $scope.Delete = function ()
    {
        console.log("genre.Id" + genre.Id);
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
        });
    }

    $scope.Save = function ()
    {
        $scope.actualObject =
        {
            GenreID: $scope.genre.Id,
            Name: $scope.genre.Name,
            Description: $scope.genre.Description
        };

        Genres.update($scope.actualObject,
        function (data)
        {
        console.log("data: " + data);
        //for successful calls
        $modalInstance.close(data);
    })
   }

    $scope.Cancel = function ()
    {
        console.log("Self-destruct has been overridden, systems functional, awating orders.");
        $modalInstance.close();
    };
}]);