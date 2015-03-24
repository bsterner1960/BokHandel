angular.module('ui.bootstrap').controller('navbarController', function ($scope, $rootScope)
{

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
        console.log("sidebar params: ", $scope.sidebar);
        
        if ($scope.radioModel === "Book")
        {
            //$rootScope.$broadcast('bookSearchValue', $scope.mySearch);
            $rootScope.bookSearchValue = $scope.mySearch;
        }
        else
        {
            //$rootScope.authorSearchValue = $scope.mySearch;
        }
    }

});