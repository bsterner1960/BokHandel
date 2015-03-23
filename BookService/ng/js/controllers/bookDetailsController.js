app.controller("bookDetailsController", ["$scope", "Book", "$routeParams", "$location", function ($scope, Book, $routeParams, $location) {

    console.log("bookDetailsController controllern är igång! routeParams är nu: ", $routeParams);
    if (!$routeParams || !$routeParams.id) {
        $location.url("/");
    }
    //$scope.genres = Genres.index();
    $scope.book = Book.show($routeParams);


}]);
