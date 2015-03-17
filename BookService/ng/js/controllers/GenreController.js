app.controller("genreController", ["$scope", "Genres","$routeParams", function ($scope, Genres, $routeParams) {

<<<<<<< HEAD
    console.log("genre controllern är igång!", $routeParams);

    //$scope.genres = Genres.index();
    $scope.jonas = Genres.show($routeParams);
     
=======
    console.log("genre controllern är igång!");

    //$scope.genres = Genres.index();
    $scope.jonas = Genres.show({ id: 1 });

>>>>>>> origin/master
}]);

