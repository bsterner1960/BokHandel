app.controller("sidebarController", ["$scope", "$rootScope","Genres", function ($scope, $rootScope,Genres) {

    console.log("All systems online, sidebarController successfully engaged, awaiting orders.");


    $scope.Genres = Genres.index();

    $scope.sidebar = {};
    $scope.sidebar.checkedBoxes = {};

    $rootScope.sidebar = $scope.sidebar;

    
    $scope.viewGenreDetails = function(clickedGenre)
    {
        console.log("You clicked: " + clickedGenre.Name);
    }



}]);
