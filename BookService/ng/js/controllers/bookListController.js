// This controller is going to provide a list of books based on a search result.
app.controller("bookListController", ["$scope", "$rootScope", "Search", "Book", "$modal",
function ($scope, $rootScope, Search, Book, $modal)
{
    ////console.log("bookListController is alive!, RockOn!");

    // Where to put the alerts
    $scope.alerts = [];

    // Default load the book view with a search of all books.
    $scope.books = Search.index({ whatToSearchFor: "books", searchValue: null });


    // Function to bring up the detailed view of a specific book.
    $scope.viewBookDetails = function(book)
    {
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

        modalInstance.result.then(function (redTruckWithStuffAndThings)
        {
            if (redTruckWithStuffAndThings.action !== "cancel")
            {
                for (var i = 0; i < $scope.books.length; i++)
                {
                    if ($scope.books[i].Id === redTruckWithStuffAndThings.data.Id)
                    {
                        if (redTruckWithStuffAndThings.action === "save")
                        {
                            $scope.books[i].Title = redTruckWithStuffAndThings.data.Title;
                            $scope.books[i].Price = redTruckWithStuffAndThings.data.Price;
                            $scope.books[i].StockBalance = redTruckWithStuffAndThings.data.StockBalance;
                        }
                        else if (redTruckWithStuffAndThings.action === "delete")
                        {
                            //console.log("delete...");
                            $scope.books.splice(i, 1);
                        }
                    }
                }
            }
        });
    }



    // This will remove the alert popup when user clicks on the alert
    $scope.closeAlert = function (index)
    {
        $scope.alerts.splice(index, 1);
    };

    // Here we listen for when the user wants to perfome a search
    $rootScope.$on('bookSearchEvent', function ()
    {
        
        // If there already is any error messages displayed then destory them.
        $scope.alerts = [];

        var genreCheckBoxIds = []; // Array to hold only genre id:s

        // put the genres id (based on what genre that has been checked in the sidebar) in a seperate "tidy" array to send to the backend
        for (var checkBox in $scope.sidebar.checkedBoxes)
        {
            if ($scope.sidebar.checkedBoxes[checkBox])
            {
                genreCheckBoxIds.push(checkBox); // Putting the genre Id in the "tidy" array ;-).
            }
        }

        // Send the request to the backend and then show the result on the view
        $scope.books = Search.index({ whatToSearchFor: "books", searchValue: $rootScope.searchValue, priceFrom: $scope.sidebar.priceFrom, priceTo: $scope.sidebar.priceTo, genreId: genreCheckBoxIds },

        //$scope.books = Search.index({ whatToSearchFor: "books", searchValues: $rootScope.bookSearchValue, priceFrom: $scope.sidebar.priceFrom, priceTo: $scope.sidebar.priceTo, checkedBoxes: $scope.sidebar.checkedBoxes },
            //On success (if you want to do anything on success you can add it here
            function (data)
            {
                // Nothing to see here yet, just move along and have a good day :-).
            },
        // And here we can handle error stuff when something goes wrong
        // for example show an error message to the user
        function (error)
        {
            //On error
            // //console.log("Ojsan, fick problem när jag kallade på servern " + error.status + " " + error.statusText + "");
            $scope.alerts.push({ type: 'danger', msg: "Oh my, something went wrong! Stepped into trouble when I tried to communicate with the backend, bookListController: " + error.status + " " + error.statusText + "" });
        });
    });

 }]);