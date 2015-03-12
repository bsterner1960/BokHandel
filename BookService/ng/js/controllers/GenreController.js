app.controller("genreController", ["$scope", "genre", "log", "greeting", function ($scope, genre, log, greeting) {
    console.log("genrecontrollern funkar");

   

    function MyController($scope) {
        $scope.log = 'testar';
    };

    $scope.detta = function () {
        $scope.greeting = 'detta ' + $scope.log + '!';
    };

    //function MyController($scope) {
      //  $scope.username = 'World';
    //};
        
    //$scope.sayHello = function () {
    //    $scope.greeting = 'Hello ' + $scope.username + '!';
    //};

    $scope.genres = genre.index();

    console.log("genre controllern är igång!");
        //+ genre.index);

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