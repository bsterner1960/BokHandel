﻿app.controller("genreController", ["$scope", "Genres", function ($scope, Genres) {

    console.log("genre controllern är igång!");

    //$scope.genres = Genres.index();
    $scope.jonas = Genres.show({ id: 1 });

}]);

