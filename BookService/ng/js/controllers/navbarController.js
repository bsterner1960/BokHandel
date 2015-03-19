angular.module('ui.bootstrap').controller('navbarController', function ($scope, $rootScope)
{
    console.log("navbarController is alive! Wohooooo :D");
    $scope.minTest = "hejsan!"

    $scope.adminSwitch = function () {
        $rootScope.isAdmin = !$rootScope.isAdmin;
    }

    $scope.setBook = function()
    {
        $rootScope.isBook = true;
    }

    $scope.setAuthor = function()
    {
        $rootScope.isBook = false;
    }

    $scope.radioModel = "Author";
    
    $scope.search = function ()
    {

        
        if ($scope.radioModel === "Book")
        {
            //$rootScope.$broadcast('bookSearchValue', $scope.mySearch);
            $rootScope.bookSearchValue = $scope.mySearch;
        }
        else
        {
            //$rootScope.authorSearchValue = $scope.mySearch;
        }

        console.log("mySearch: ", $scope.mySearch);
        console.log("radioModel: ", $scope.radioModel);
    }

});