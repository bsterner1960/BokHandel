app.controller("newGenreModalController", ["$scope", "Genres", "$modalInstance", function ($scope, Genres, $modalInstance) {

    $scope.genreError = false;

    console.log("Skapa genre controllern är igång! ");

    $scope.newGenre = {};

    // klickevent Skapa
     $scope.Skapa = function (authorname) {

        if   ($scope.newGenre.Name)  {


            Genres.create($scope.newGenre, 
                function(data){
                    //for successful calls
                    $modalInstance.close(data);
                }, 
                function () {
                    //for unsuccessful calls
                    console.log("Fel vid skapa genre. ");
                    $scope.alert = { type: 'danger', msg: 'Fel vid create Genre' };
                    $scope.genreError = true;

                }
                );

        }
    }

    // klickevent Avbryt
     $scope.Avbryt = function () {
         $modalInstance.close();

     };
}]);