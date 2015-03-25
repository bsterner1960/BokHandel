// This controller is going to provide a list of books based on a search result.
app.controller("bookListController", ["$scope", "$rootScope", "Search", function ($scope, $rootScope, Search) {
    console.log("bookListController is alive!, RockOn!");

    // Where to put the alerts
    $scope.alerts = [];

    // This will remove the alert popup when user clicks on the alert
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    console.log($scope.closeAlert.index);

    // Using this to make sure a serach is not sent to the backend 
    // when only initializing the controller for the first time
    // we need only to react on a real search.  
    var myFirstRun;

    $rootScope.$watch("bookSearchYellowTruck", function () {
        // Are we running this for the first time (the controller is included in code somewhere)
        if (myFirstRun === undefined) {
            myFirstRun = false;
            // Nope, not first time the controller is used so then we assume we got a search to work with.
        } else {

            // If there allready is any error messages displayed then destory them.
           // console.log("Nicklas sökvärde: ", $rootScope.bookSearchYellowTruck);
           // console.log("Björns Checkboxes: ", $scope.sidebar.checkedBoxes);
            //console.log("Björns price from: ", $scope.sidebar.priceFrom);
            //console.log("Björns price from: ", $scope.sidebar.priceTo);



            $scope.alerts = [];
            $scope.books = Search.index({ whatToSearchFor: "books", searchValues: $rootScope.bookSearchYellowTruck, priceFrom: $scope.sidebar.priceFrom, priceTo: $scope.sidebar.priceTo, checkedBoxes: $scope.sidebar.checkedBoxes },
                //On success (if you want to do anything on success you can add it here
                function (data) {
                    // Nothing to see here yet, just move along and have a good day :-).
                },
            // And here we can handle error stuff when something goes wrong
            // for example show an error message to the user
            function (error) {
                //On error
                // console.log("Ojsan, fick problem när jag kallade på servern " + error.status + " " + error.statusText + "");
                $scope.alerts.push({ type: 'danger', msg: "Kära hjärtanes något gick snett! Fick problem när jag kallade på servern " + error.status + " " + error.statusText + "" });

            });

        }
    });

}]);