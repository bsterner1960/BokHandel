app.controller("bookDetailsController", ["$scope", "Books", "$routeParams", "$location", function ($scope, Books, $routeParams, $location) {

    console.log("bookDetailsController controllern är igång! routeParams är nu: ", $routeParams);
    if (!$routeParams || !$routeParams.id) {
        $location.url("/");
    }

    //$scope.genres = Genres.index();
    $scope.book = Books.show($routeParams);


}]);
