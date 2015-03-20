app.controller("newBookModalController", ["$scope", "Authors", "Genres", "$modalInstance", function ($scope, Authors, Genres, $modalInstance) {

    $scope.genreError = false;

    console.log("newBookModalController is online, engaging scanners...");

    $scope.newBook = {};

    $scope.Authors = Authors.index();
    $scope.Genres = Genres.index();
    // klickevent Create
    $scope.Create = function (book) {

        if ($scope.newBook.Name) {


            Genres.create($scope.newBook,
                function (data) {
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
    $scope.Cancel = function () {
        $modalInstance.close();

    };
}]);