app.controller('navbarControllerAdmin', ["$scope", "$rootScope", "$modal", "$log",
    function ($scope, $rootScope, $modal, $log)
{

    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }


    $scope.setBook = function ()
    {
        $rootScope.isBook = true;
    }

    $scope.setAuthor = function ()
    {
        $rootScope.isBook = false;
    }

    $scope.radioModel = "Author";

    $scope.search = function () {
    
    $rootScope.searchValue = $scope.mySearch;

        if ($scope.radioModel === "Book") {
            // Tell the controller that is listening for this event to do a search and
            // show the result on a view

            $rootScope.$broadcast('bookSearchEvent');
        }
        else {
            // Tell the controller that is listening for this event to do a search and
            // show the result on a view
            $rootScope.$broadcast('authorSearchEvent');
        }
    }

    $scope.createBook = function(size)
    {
        ////console.log("Initiating create Book sequence, standby...");

        //opening a new modal instance
        var modalInstance = $modal.open(
            {
                templateUrl: 'partials/newBookModal.html',
                controller: 'newBookModalController',
                size: size
            });

        //waiting for modal instance to complete
        modalInstance.result.then(
            function (newBookFromDB) {
                //when modal closes
            }, function () {
                //when modal dismisses
                $log.info('Modal dismissed at: ' + new Date());
            });
    }

    $scope.createAuthor = function (size)
    {

        //opening a new modal instance
        var modalInstance = $modal.open(
            {
                templateUrl: 'partials/newAuthorModal.html',
                controller: 'newAuthorModalController',
                size: size
            });

        //waiting for modal instance to complete
        modalInstance.result.then(
            function (newAuthorFromDB) {
                //when modal closes
            }, function () {
                //when modal dismisses
                $log.info('Modal dismissed at: ' + new Date());
            });
    }


        $scope.createGenre = function (size) 
        {

            //opening a new modal instance
            var modalInstance = $modal.open(
                {
                templateUrl: 'partials/newGenreModal.html',
                controller: 'newGenreModalController',
                size: size
            });

            //waiting for modal instance to complete
            modalInstance.result.then(
                function (newGenreFromDB) 
                {
                    //when modal closes
                }, function () 
                {
                    //when modal dismisses
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }
    }]);