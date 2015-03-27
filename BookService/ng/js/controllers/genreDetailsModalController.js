﻿app.controller("genreDetailsModalController", ["$scope", "$rootScope", "Genres", "$modalInstance", "genre",
function ($scope, $rootScope, Genres, $modalInstance, genre)
{
    
    console.log("My genre is: " + genre.Name);
    $scope.genre = genre;

    $scope.Delete = function () {
        console.log("destroying genre.Id" + genre.Id);
        Genres.destroy(genre.Id);
        $modalInstance.close();
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
        function (data) {
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