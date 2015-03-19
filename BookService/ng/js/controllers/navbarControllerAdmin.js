﻿app.controller('navbarControllerAdmin', function ($scope, $rootScope, $modal, $log)
{
    console.log("navbarController is alive! Wohooooo :D");
    $scope.minTest = "hejsan!"


    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }

    $rootScope.$watch("bookSearchValue", function () {
        console.log("Triggered!, " + $rootScope.bookSearchValue);
    });
    $scope.createAuthor = function (size) {
        console.log("Author hejhej");



    $scope.setBook = function () {
        $rootScope.isBook = true;
        $rootScope.bookSearchValue = "Muffins!";
    }

    $scope.setAuthor = function () {
        $rootScope.bookSearchValue = "I am the Muffin King!";
        $rootScope.isBook = false;
    }

    $scope.radioModel = "Author";

    $scope.search = function () {


        if ($scope.radioModel === "Book") {
            $rootScope.bookSearchValue = $scope.mySearch;
        }
        else {
            $rootScope.authorSearchValue = $scope.mySearch;
        }

        console.log("mySearch: ", $scope.mySearch);
        console.log("radioModel: ", $scope.radioModel);
    }
    $scope.createGenre = function (size) {
        console.log("Genre hejhej");

        //opening a new modal instance
        var modalInstance = $modal.open({
            templateUrl: 'partials/newGenreModal.html',
            controller: 'newGenreModalController',
            size: size
        });

        //waiting for modal instance to complete
        modalInstance.result.then(
            function (newGenreFromDB) {
                //when modal closes
                console.log("Modal closed! newGenreFromDB: ", newGenreFromDB);
            }, function () {
                //when modal dismisses
                $log.info('Modal dismissed at: ' + new Date());
            });

    }
});