app.controller("bookDetailsModalController", ["$scope", "$rootScope", "Authors", "Book", "Genres", "$modalInstance", "book",
    function ($scope, $rootScope, Authors, Book, Genres, $modalInstance, book)
    {

        $scope.book = book;

        console.log("Engaging bookDetailsModalController.");

        console.log("$scope.book: " + $scope.book.Title);

        $scope.newBook = {};
        // RETURN HERE WHEN ID'S ARE RETURNED (2015-03-30-14:31)!

        $scope.alerts = [];

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.myBook = Book.show({ Id: book.Id },
        function (book)
        {
            //Success call
            for (var i = 0; i < $scope.myBook.AuthorNIs.length; i++)
            {
                for (var j = 0; j < $scope.Authors.length; j++)
                {
                    if ($scope.myBook.AuthorNIs[i].Id == $scope.Authors[j].Id)
                    {
                        $scope.selectedAuthors.push($scope.Authors[j]);
                        $scope.actualObject.AuthorIDs.push($scope.Authors[j].Id);
                    }
                }
            }

            for(var i = 0; i < $scope.myBook.GenreNIs.length; i++)
            {
                for(var j = 0; j < $scope.Genres.length; j++)
                {
                    if ($scope.myBook.GenreNIs[i].Id == $scope.Genres[j].Id)
                    {
                        $scope.selectedGenres.push($scope.Genres[j]);
                        $scope.actualObject.GenreIDs.push($scope.Genres[j].Id);
                    }
                }
            }

        },
        function(error)
        {
            //Fail call
            $scope.alerts.push({ type: 'danger', msg: "Failure, the data requested was not retrieved successfully: " + error.status + " " + error.statusText + "" });
        });
        



    $scope.actualObject =
    {
        Id : "",
        Title: "",
        Description: "",
        Price: "",
        Year: "",
        StockBalance: "",
        ISBN: "",
        AuthorIDs: [],
        GenreIDs: []
    };

    $scope.selectedAuthors = [];
    $scope.selectedGenres = [];
    // All authors in our system
    $scope.Authors = Authors.index();

    $scope.Genres = Genres.index();

    $scope.authorString = $rootScope.isAdmin ? "Edit authors:" : "Authors:";

    $rootScope.$broadcast($scope.myBroadCast, "I'm broadcasting!");



    // Empty array that the user can fill with authors of this book
    // When clicking the addAuthor button
    $scope.addAuthor = function ()
    {
        // Read current value of select list for authors (an author id)
        var selectedAuthorID = $scope.selectedAuthorID;

        console.log("selectedAuthorID: " + $scope.selectedAuthorID);

        // Find the author object by id amongst all authors
        for (var i = 0; i < $scope.Authors.length; i++) {
            if (selectedAuthorID == $scope.Authors[i].Id) {
                // Only add the author to the bookAuthor list if not already in it (indexOf check)
                if ($scope.selectedAuthors.indexOf($scope.Authors[i]) < 0) {
                    $scope.selectedAuthors.push($scope.Authors[i]);
                    $scope.actualObject.AuthorIDs.push($scope.Authors[i].Id);
                }
            }
        }
    }

    $scope.removeAuthor = function (value) {
        $scope.selectedAuthors.splice(value, 1);
        $scope.actualObject.AuthorIDs.splice(value, 1);

    }


    $scope.addGenre = function () {

        var selectedGenreID = $scope.selectedGenreID;

        for (var i = 0; i < $scope.Genres.length; i++) {
            if (selectedGenreID == $scope.Genres[i].Id) {
                if ($scope.selectedGenres.indexOf($scope.Genres[i]) < 0) {
                    $scope.selectedGenres.push($scope.Genres[i]);
                    $scope.actualObject.GenreIDs.push($scope.Genres[i].Id);
                }
            }
        }
    }

    $scope.removeGenre = function (value) {
        $scope.selectedGenres.splice(value, 1);
        $scope.actualObject.GenreIDs.splice(value, 1);
    }

    $scope.deletionObject =
    {
        Id: book.Id
    };

    $scope.Delete = function()
    {
        console.log("book.Id" + book.Id);
        Book.destroy($scope.deletionObject,
        function(data)
        {
            //Success call
            $modalInstance.close(data);
        },
        function(error)
        {
            // Error call
            console.log("Unable to terminate target. Target appears to be angry, suggestion: RUN! " + error);
            $scope.alerts.push({ type: 'danger', msg: "Failure to terminate target, recharging main weapons... : " + error.status + " " + error.statusText + "" });
        });
        
    }

    $scope.Save = function ()
    {
        console.log($scope.myBook);
        console.log("cookie: " + $scope.myBook.Title);
        $scope.alerts = [];

        if ($scope.myBook.Title)
        {
            $scope.actualObject.Id = book.Id;
            $scope.actualObject.Title = $scope.myBook.Title;
            $scope.actualObject.Description = $scope.myBook.Description;
            $scope.actualObject.Price = $scope.myBook.Price;
            $scope.actualObject.Year = $scope.myBook.Year;
            $scope.actualObject.StockBalance = $scope.myBook.StockBalance;
            $scope.actualObject.ISBN = $scope.myBook.ISBN;

            console.log($scope.actualObject);
            Book.update($scope.actualObject,
            function () {
                // Success!
                $modalInstance.close("");
            },
            function (error)
            {
                // Failure...
                console.log("Failed to complete the operation, self-destruction imminent in 3... 2... 1...");
                $scope.alerts.push({ type: 'danger', msg: "Failed to complete the save operation, self-destruction imminent: " + error.status + " " + error.statusText + "" });
            }
            );
        }
    }

    // clickevent Cancel
    $scope.Cancel = function ()
    {
        $modalInstance.close("");
    };
}]);