app.controller("genreController", ["$scope", "Genres", "$routeParams", "$location", function ($scope, Genres, $routeParams, $location) {

    console.log("genre controllern är igång! routeParams är nu: ", $routeParams);
//if ($routeParams.id.indexOf("Genre")) {
        //$location.url("/");
    //}


    //$scope.genres = Genres.index();
    $scope.jonas = Genres.show({ id: 1 });
  

    $scope.options = ["Genre1", "Genre2", "Genre3"];

    $scope.madeSelection = function (selectedIndex) {
        alert("user is going to route: " + "/genredetails/" + $scope.options[selectedIndex]);
        $location.url("/genredetails/" + $scope.options[selectedIndex]);
    }

}]);

