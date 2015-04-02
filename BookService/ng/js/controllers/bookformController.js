app.controller("bookformController", ["$scope", "Book", "Author", function ($scope, Book, Author) {
    console.log("bookformController is alive! Wohooooo :D");

    //first make a call to get all authors
    $scope.authors = Author.index();

    //the book model to be sent to Database
    $scope.bookData = {};

    // do not show the author list of existing authors initially
    // (not really necessary since $scope.showAuthorList 
    // would be undefined otherwise and undefined is "falsy")
    $scope.showAuthorList = false;

    //click handler for form
    $scope.save = function () {
        if ($scope.showAuthorList) {
            // ok, we are choosing an existing author
            // so we shouldn't have an author object
            delete $scope.bookData.Author;
        }
        else {
            // if we are creating a new author
            // do not send the property AuthorId
            delete $scope.bookData.AuthorId;
        }
        Book.create($scope.bookData);
    };


}]);