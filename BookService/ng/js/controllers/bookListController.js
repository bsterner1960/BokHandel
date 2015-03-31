// This controller is going to provide a list of books based on a search result.
app.controller("bookListController", ["$scope", "$rootScope", "Search", "Book", "$modal",
function ($scope, $rootScope, Search, Book, $modal)
{
    //console.log("bookListController is alive!, RockOn!");

    // Where to put the alerts
    $scope.alerts = [];

    // Default load the book view with a search of all books.
    $scope.books = Search.index({ whatToSearchFor: "books", searchValue: null });


    // Function to bring up the detailed view of a specific book.
    $scope.viewBookDetails = function(book)
    {
        console.log("Initiating view book details sequence, standby...");

        console.log("You pressed: " + book.Title);

        var modalInstance = $modal.open(
        {
            templateUrl: 'partials/bookDetailsModal.html',
            controller: 'bookDetailsModalController',
            resolve:
            {
                book: function ()
                {
                    return book;
                    
                }
            }
        });

        modalInstance.result.then(function (data)
        {
            if (data !== "")
            {
                console.log(data);
                console.log("You've got more mail: " + data.Id);


                for (var i = 0; i < $scope.books.length; i++) {
                    if ($scope.books[i].Id === data.Id) {
                        $scope.books.splice(i, 1);
                    }
                }
            }
        });

    }



    // This will remove the alert popup when user clicks on the alert
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    console.log($scope.closeAlert.index);

    // Using this to make sure a serach is not sent to the backend 
    // when only initializing the controller for the first time
    // we need only to react on a real search.  
    var myFirstRun;

    $rootScope.$watch("bookSearchValue", function () {
        // Are we running this for the first time (the controller is included in code somewhere)
        if (myFirstRun === undefined) {
            myFirstRun = false;
            // Nope, not first time the controller is used so then we assume we got a search to work with.
        } else {

            // If there allready is any error messages displayed then destory them.
            $scope.alerts = [];
            
            var genreCheckBoxIds = []; // Array to hold only genre id:s

            // put the genres id (based on what genre that has been checked in the sidebar) in a seperate "tidy" array to send to the backend
            for (var checkBox in $scope.sidebar.checkedBoxes) {
                if ($scope.sidebar.checkedBoxes[checkBox]) {
                    genreCheckBoxIds.push(checkBox); // Putting the genre Id in the "tidy" array ;-).
                }
            }


            $scope.books = Search.index({ whatToSearchFor: "books", searchValue: $rootScope.bookSearchValue, priceFrom: $scope.sidebar.priceFrom, priceTo: $scope.sidebar.priceTo, genreId: genreCheckBoxIds },
            
            //$scope.books = Search.index({ whatToSearchFor: "books", searchValues: $rootScope.bookSearchValue, priceFrom: $scope.sidebar.priceFrom, priceTo: $scope.sidebar.priceTo, checkedBoxes: $scope.sidebar.checkedBoxes },
                //On success (if you want to do anything on success you can add it here
                function (data) {
                    // Nothing to see here yet, just move along and have a good day :-).
                },
            // And here we can handle error stuff when something goes wrong
            // for example show an error message to the user
            function (error) {
                //On error
                // console.log("Ojsan, fick problem när jag kallade på servern " + error.status + " " + error.statusText + "");
                $scope.alerts.push({ type: 'danger', msg: "Oh my, something went wrong! Stepped into trouble when I tried to communicate with the backend, bookListController: " + error.status + " " + error.statusText + "" });

            });

        }
    });

}]);