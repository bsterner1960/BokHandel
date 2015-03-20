// This controller is going to provide a list of books based on a search result.
app.controller("bookListController", ["$scope", "$rootScope", "BookSearch", function ($scope, $rootScope, BookSearch) {
    console.log("bookListController is alive!, RockOn!");

    // Here we put a list of all books into scope
    //$scope.books = Book.index();

    //using $rootScope.watch to listen for new data on "bookSearchValue"
    $rootScope.$watch("bookSearchValue", function (data) {
        //console.log("bookSearchValue watch triggered and got the search value: ", data);
        console.log("BookListControllerSearchValue: " + data);
        $scope.books = BookSearch.show({ bookSearchValue: data });
    });

}]);