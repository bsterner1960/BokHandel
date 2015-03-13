app.controller("genreController", ["$scope", "Genres", function ($scope, Genres) {

    console.log("genre controllern är igång!");
    //$scope.jonas = "JONAS ÄR BÄST!!";
  
        $scope.genres = Genres.index();

  
 
}]);

