app.controller("genreController", ["$scope", "Genres", "$routeParams", "$location", function ($scope, Genres, $routeParams, $location) {

    console.log("genre controllern är igång! routeParams är nu: ", $routeParams);
    if (!$routeParams || !$routeParams.id) {
        $location.url("/");
    }

    //$scope är ett Javascript objekt som knyter en vy till kontrollern.
    //i Model View Controllern blir detta $scope objektet modellen. 
    
    //$scope.genres = Genres.index();

    $scope.genre = Genres.show($routeParams);


}]);

