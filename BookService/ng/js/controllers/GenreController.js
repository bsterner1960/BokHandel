app.controller("genreController", ["$scope", function ($scope) {
    
    $scope.jonas = "JONAS ÄR BÄST!!";
    $scope.genredetailsDB = ("select * from " + Genres);

        //stmt.executeQuery(
          //  "SELECT * FROM " + dbName + ".COFFEES");
  
 
    console.log("genre controllern är igång!");
 
}]);

