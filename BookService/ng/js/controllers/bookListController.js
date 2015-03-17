// This controller is going to provide a list of books
 app.controller("bookListController", ["$scope", "$modal", "Book", function ($scope, $modal, Book) {
    console.log("bookListController is alive!");
    
     // Here we put a list of books into scope
    $scope.books = Book.index(); 

}]);