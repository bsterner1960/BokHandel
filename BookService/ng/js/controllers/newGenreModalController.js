app.controller("newGenreModalController", ["$scope", "Genres", "$modalInstance", function ($scope, Genres, $modalInstance) {

    $scope.genreError = false;

    console.log("Create genre controllern är igång! ");

    $scope.newGenre = {};

    // klickevent Create
     $scope.Create = function (authorname) {

        if   ($scope.newGenre.Name)  {


            Genres.create($scope.newGenre, 
                function(data){
                    //for successful calls
                    $modalInstance.close(data);
                }, 
                function () {
                    //for unsuccessful calls
                    console.log("Fel vid Create genre. ");
                    $scope.alert = { type: 'danger', msg: 'Fel vid create Genre' };
                    $scope.genreError = true;

                }
                );

        }
    }

    // klickevent Cancel
     $scope.Cancel = function (data) {
         $modalInstance.close(data);

     };
}]);