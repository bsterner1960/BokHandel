// This controller is going to provide a list of books
 app.controller("bookListController", ["$scope", "Book", function ($scope, Book) {
    console.log("bookListController is alive!");
    
     // Here we put a list of books into scope
    $scope.books = Book.index();

     // Test to react on a scope call
     //using $rootScope.on to listen for new data from restCall .success()
    $rootScope.$watch("bookSearchValue", function (event, data) {
        //console.log("restSuccess triggered: ", data);
        console.log("triggad: " + event + " theData:" + data);
        //$scope.output = JSON.stringify(data, null, '\t');
    });

}]);