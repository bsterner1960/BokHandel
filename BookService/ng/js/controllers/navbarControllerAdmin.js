app.controller('navbarControllerAdmin', function ($scope, $rootScope, $modal, $log)
{
    console.log("navbarController is alive! Wohooooo :D");
    $scope.minTest = "hejsan!"


    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }

    $scope.createAuthor = function (size) {
        console.log("Author hejhej");

        //opening a new modal instance
        var modalInstance = $modal.open({
            templateUrl: 'partials/newAuthorModal.html',
            controller: 'newAuthorModalController',
            size: size
        });

        //waiting for modal instance to complete
        modalInstance.result.then(
            function (newAuthorFromDB) {
            //when modal closes
            console.log("Modal closed! newAuthorFromDB: ", newAuthorFromDB);
        }, function () {
            //when modal dismisses
            $log.info('Modal dismissed at: ' + new Date());
        });

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