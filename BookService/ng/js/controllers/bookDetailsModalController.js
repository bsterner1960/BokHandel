app.controller("bookDetailsModalController", ["$scope", "$rootScope", "Authors", "Book", "Genres", "$modalInstance", "book",
    function ($scope, $rootScope, Authors, Book, Genres, $modalInstance, book)
    {

        $scope.returnObject =
        {
            action: "",
            data: ""
        }

        $scope.book = book;

        $scope.newBook = {};
        // RETURN HERE WHEN ID'S ARE RETURNED (2015-03-30-14:31)!

        $scope.alerts = [];

        $scope.closeAlert = function (index)
        {
            $scope.alerts.splice(index, 1);
        };

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

        // The keys of creation!
    var keyOfEarth = false;
    var keyOfWater = false;
    var keyOfFire = false;

    // All authors in our system
    $scope.Authors = Authors.index(
        function ()
        {
            //Success!
            keyOfEarth = true;
            $scope.templeOfDoom();
        },
        function ()
        {
            // Failure...
            keyOfEarth = false;
        });
    
    // All genres in our system
    $scope.Genres = Genres.index(
    function ()
    {
        //Success!
        keyOfWater = true;
        $scope.templeOfDoom();

    },
    function ()
    {
        // Failure...
        keyOfWater = false;
    });


    $scope.myBook = Book.show({ Id: book.Id },
    function ()
    {
    //Success!
        keyOfFire = true;
        $scope.templeOfDoom();
    },
    function (error)
    {
        //Failure...
        $scope.alerts.push({ type: 'danger', msg: "Failure, the data requested was not retrieved successfully: " + error.status + " " + error.statusText + "" });
    });


    $scope.templeOfDoom = function()
    {
        if(keyOfEarth && keyOfWater && keyOfFire)
        {
            keyOfEarth = false;
            keyOfWater = false;
            keyOfFire = false;

            for (var i = 0; i < $scope.myBook.AuthorNIs.length; i++) {
                console.log("value: " + $scope.Authors.length);
                for (var j = 0; j < $scope.Authors.length; j++) {
                    console.log("sigh: " + $scope.Authors.length);
                    //console.log("if " + $scope.myBook.AuthorNIs[i].Id + " === " + $scope.Authors[j].Id);
                    if ($scope.myBook.AuthorNIs[i].Id === $scope.Authors[j].Id) {
                        $scope.selectedAuthors.push($scope.Authors[j]);
                        $scope.actualObject.AuthorIDs.push($scope.Authors[j].Id);
                    }
                }
            }

            for (var i = 0; i < $scope.myBook.GenreNIs.length; i++) {
                for (var j = 0; j < $scope.Genres.length; j++) {
                    if ($scope.myBook.GenreNIs[i].Id === $scope.Genres[j].Id) {
                        //console.log("pushing genre");
                        $scope.selectedGenres.push($scope.Genres[j]);
                        $scope.actualObject.GenreIDs.push($scope.Genres[j].Id);
                    }
                }
            }
        }
    }

    $scope.authorString = $rootScope.isAdmin ? "Edit authors:" : "Authors:";
    $scope.genreString = $rootScope.isAdmin ? "Edit genres:" : "Genres:";

    // Empty array that the user can fill with authors of this book
    // When clicking the addAuthor button
    $scope.addAuthor = function ()
    {
        // Read current value of select list for authors (an author id)
        var selectedAuthorID = $scope.selectedAuthorID;

        console.log("selectedAuthorID: " + $scope.selectedAuthorID);

        // Find the author object by id amongst all authors
        for (var i = 0; i < $scope.Authors.length; i++)
        {
            if (selectedAuthorID == $scope.Authors[i].Id)
            {
                // Only add the author to the bookAuthor list if not already in it (indexOf check)
                if ($scope.selectedAuthors.indexOf($scope.Authors[i]) < 0) {
                    $scope.selectedAuthors.push($scope.Authors[i]);
                    $scope.actualObject.AuthorIDs.push($scope.Authors[i].Id);
                }
            }
        }
    }

    $scope.removeAuthor = function (value)
    {
        $scope.selectedAuthors.splice(value, 1);
        $scope.actualObject.AuthorIDs.splice(value, 1);
    }


    $scope.addGenre = function ()
    {

        var selectedGenreID = $scope.selectedGenreID;

        for (var i = 0; i < $scope.Genres.length; i++)
        {
            if (selectedGenreID == $scope.Genres[i].Id)
            {
                if ($scope.selectedGenres.indexOf($scope.Genres[i]) < 0)
                {
                    $scope.selectedGenres.push($scope.Genres[i]);
                    $scope.actualObject.GenreIDs.push($scope.Genres[i].Id);
                }
            }
        }
    }

    $scope.removeGenre = function (value)
    {
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
            $scope.returnObject.action = "delete";
            $scope.returnObject.data = data;
            $modalInstance.close($scope.returnObject);
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
            function (data)
            {
                // Success!
                $scope.returnObject.action = "save";
                $scope.returnObject.data = data;
                $modalInstance.close($scope.returnObject);
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
        $scope.returnObject.action = "cancel";
        $modalInstance.close($scope.returnObject);
    };
}]);