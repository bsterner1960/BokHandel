app.controller("genreController", ["$scope", "Genres","$routeParams", function ($scope, Genres, $routeParams) {

    console.log("genre controllern är igång!", $routeParams);

    //$scope.genres = Genres.index();
    $scope.jonas = Genres.show($routeParams);
     
}]);

