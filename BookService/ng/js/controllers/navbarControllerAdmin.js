app.controller('navbarControllerAdmin', function ($scope, $rootScope, $modal, $log)
{
    console.log("navbarController is alive! Wohooooo :D");
    $scope.minTest = "hejsan!"


    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }

    $rootScope.$watch("bookSearchValue", function () {
        console.log("Triggered!, " + $rootScope.bookSearchValue);
    });



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



});