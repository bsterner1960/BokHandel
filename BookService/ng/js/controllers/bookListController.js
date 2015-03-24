// This controller is going to provide a list of books based on a search result.
app.controller("bookListController", ["$scope", "$rootScope", "Search", function ($scope, $rootScope, Search) {
    console.log("bookListController is alive!, RockOn!");

    // Using this to make sure a serach is not sent to the backend 
    // when only initializing the controller for the first time
    // we need only to react on a real search.
    var myFirstRun;

    //using $rootScope.watch to listen for new data on "bookSearchValue"
    $rootScope.$watch("bookSearchValue", function (data) {

        // Are we running this for the first time (the controller is included in code somewhere)
        if (myFirstRun === undefined) {
            myFirstRun = false;
        // Nope, not first time the controller is used so then we assume we got a search to work with.
        } else {
            $scope.books = Search.index({ whatToSearchFor: "books", searchValue: data });
        }

    });

}]);