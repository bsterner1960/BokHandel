app.controller("bookformController", ["$scope", "Books", "Authors", function ($scope, Books, Authors) {
    console.log("bookformController is alive! Wohooooo :D");

    //first make a call to get all authors
    Authors.get();
    //listen for the data to come back
    $scope.$on("restSuccess", function (event, data) {
        console.log("restSuccess: ", data);
        $scope.authors = data;
    });

    //the book model to be sent to Database
    $scope.bookData = {};

    //click handler for form
    $scope.save = function () {
        //console.log("save: ", $scope.bookData);
        Books.post($scope.bookData);
    };


}]);