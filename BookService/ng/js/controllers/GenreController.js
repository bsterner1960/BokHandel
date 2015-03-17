app.controller("genreController", ["$scope", "Genres", "$routeParams", "$location", function ($scope, Genres, $routeParams, $location) {

    console.log("genre controllern är igång! routeParams är nu: ", $routeParams);
    if (!$routeParams || !$routeParams.id) {
        $location.url("/");
    }

    //$scope.genres = Genres.index();
    $scope.genre = Genres.show($routeParams);
  

    ////$scope.options = ["Genre1", "Genre2", "Genre3"];
    ////$scope.options = [Genres.show({id:6})];
    //$scope.options = [Genres.show({ id: 1 })];

    //$scope.madeSelection = function (selectedIndex) {
    //    //alert("user is going to route: " + "/genredetails/" + $scope.options[selectedIndex]);
    //    alert("user is going to route: " + "/genredetails/" + $scope.options[selectedIndex].Id);
    //    console.log($scope.options[selectedIndex].Id)
    //    $location.url("/genredetails/" + $scope.options[selectedIndex].Id);
    //}

}]);

