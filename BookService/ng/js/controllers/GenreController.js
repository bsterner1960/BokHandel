app.controller("genreController", ["$scope", "Author", function ($scope, Author) {
    
    $scope.jonas = "JONAS ÄR BÄST!!";
  
        $scope.authors = Author.index();

  
    console.log("genre controllern är igång!");
 
}]);

