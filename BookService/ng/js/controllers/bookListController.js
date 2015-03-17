// This controller is going to provide a list of books
 app.controller("bookListController", ["$scope", "Book", function ($scope, Book) {
    console.log("bookListController is alive!");
    
     // Here we put a list of books into scope
    $scope.books = Book.index(); 

}]);