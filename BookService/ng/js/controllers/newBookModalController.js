app.controller("newBookModalController", ["$scope", "Authors", "Book", "Genres", "$modalInstance",
    function ($scope, Authors, Book, Genres, $modalInstance)
{



    $scope.newBook = {};

    $scope.actualObject =
    {
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


    

    // Empty array that the user can fill with authors of this book
    // When clicking the addAuthor button
    $scope.addAuthor = function ()
    {
        // Read current value of select list for authors (an author id)
        var selectedAuthorID = $scope.selectedAuthorID;
        // Find the author object by id amongst all authors
        for (var i = 0; i < $scope.Authors.length; i++)
        {
            if (selectedAuthorID == $scope.Authors[i].Id)
            {
                // Only add the author to the bookAuthor list if not already in it (indexOf check)
                if ($scope.selectedAuthors.indexOf($scope.Authors[i]) < 0)
                {
                    $scope.selectedAuthors.push($scope.Authors[i]);
                    $scope.actualObject.AuthorIDs.push($scope.Authors[i].Id);
                }
            }
        }
    }

    $scope.removeAuthor = function(value)
    {
        $scope.selectedAuthors.splice(value, 1);
        $scope.actualObject.AuthorIDs.splice(value, 1);

    }


    $scope.addGenre = function()
    {

        var selectedGenreID = $scope.selectedGenreID;

        for(var i = 0; i < $scope.Genres.length;i++)
        {
            if(selectedGenreID == $scope.Genres[i].Id)
            {
                if ($scope.selectedGenres.indexOf($scope.Genres[i]) < 0)
                {
                    $scope.selectedGenres.push($scope.Genres[i]);
                    $scope.actualObject.GenreIDs.push($scope.Genres[i].Id);
                }
            }
        }
    }

    $scope.removeGenre = function(value)
    {
        $scope.selectedGenres.splice(value, 1);
        $scope.actualObject.GenreIDs.splice(value, 1);
    }

    // click event Create
    $scope.Create = function ()
    {
        if ($scope.newBook.Name)
        {
            
            ////console.log("Name:"+ $scope.newBook.Name);

            $scope.actualObject.Title = $scope.newBook.Name;
            $scope.actualObject.Description = $scope.newBook.Description;
            $scope.actualObject.Price = $scope.newBook.Price;
            $scope.actualObject.Year = $scope.newBook.Year;
            $scope.actualObject.StockBalance = $scope.newBook.StockBalance;
            $scope.actualObject.ISBN = $scope.newBook.ISBN;

            ////console.log("$scope.actualObject.ISBN: " + $scope.actualObject.ISBN);

            ////console.log($scope.actualObject);
            Book.create($scope.actualObject,
            function (data)
            {
                ////console.log("data: " + data);
                //for successful calls
                //$modalInstance.close(data);
                $modalInstance.close(data);
                ////console.log("Efter .close i newBookModalController: ");

            },
            function ()
            {
                //for unsuccessful calls
                ////console.log("Unable to create a new book. ");
                $scope.alert = { type: 'danger', msg: 'Unable to create a new book' };
                $scope.bookError = true;
            });
        }
    }

    // clickevent Cancel
    $scope.Cancel = function ()
    {
        $modalInstance.close("");
    };
}]);