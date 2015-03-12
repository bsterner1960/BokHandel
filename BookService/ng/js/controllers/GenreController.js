app.controller("GenreController", ["$scope", "genre", function ($scope, Genre) {
    console.log("genrecontrollern funkar");

    //$scope.authors = Author.index();
    //Detail
    //Author	Jane Austen
    //Title	Pride and Prejudice
    //Year	1813
    //Genre	Comedy of manners
    //Price	9.99
    //anropar genres listan
    
    $scope.genres = Genre.index();

    //the book model to be sent to Database
    //$scope.bookData = {};

    // do not show the author list of existing authors initially
    // (not really necessary since $scope.showAuthorList 
    // would be undefined otherwise and undefined is "falsy")§
    //$scope.showAuthorList = false;

    //click handler for form
    /*$scope.save = function () {
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
    */

}]);