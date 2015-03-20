﻿app.controller("newBookModalController", ["$scope", "Genres", "$modalInstance", function ($scope, Genres, $modalInstance) {

    $scope.genreError = false;

    console.log("newBookModalController is online, engaging scanners...");

    $scope.newBook = {};

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