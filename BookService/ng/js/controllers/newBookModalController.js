app.controller("newBookModalController", ["$scope", "Authors", "Book", "Genres", "$modalInstance", function ($scope, Authors, Book, Genres, $modalInstance) {

    $scope.bookError = false;


    $scope.newBook = {};

    $scope.actualObject =
    {
        Name: "",
        Description: "",
        Price: "",
        Year: "",
        StockBalance: "",
        Authors: [],
        Genres: []
    };

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
                if ($scope.actualObject.Authors.indexOf($scope.Authors[i]) < 0)
                {
                    $scope.actualObject.Authors.push($scope.Authors[i]);
                }
            }
        }
    }

    $scope.removeAuthor = function(value)
    {
        $scope.actualObject.Authors.splice(value, 1);

    }


    $scope.addGenre = function()
    {

        var selectedGenreID = $scope.selectedGenreID;

        for(var i = 0; i < $scope.Genres.length;i++)
        {
            if(selectedGenreID == $scope.Genres[i].Id)
            {
                if ($scope.actualObject.Genres.indexOf($scope.Genres[i]) < 0)
                {
                    $scope.actualObject.Genres.push($scope.Genres[i]);
                }
            }
        }
    }

    $scope.removeGenre = function(value)
    {
        $scope.actualObject.Genres.splice(value, 1);
    }

    // click event Create
    $scope.Create = function ()
    {
        if ($scope.newBook.Name)
        {
            
            $scope.actualObject.Name = $scope.newBook.Name;
            $scope.actualObject.Description = $scope.newBook.Description;
            $scope.actualObject.Price = $scope.newBook.Price;
            $scope.actualObject.Year = $scope.newBook.Year;
            $scope.actualObject.StockBalance = $scope.newBook.StockBalance;

            console.log($scope.actualObject);
            Book.create($scope.actualObject,
            function (data)
            {
                console.log("data: " + data);
                //for successful calls
                $modalInstance.close(data);
            },
            function ()
            {
                //for unsuccessful calls
                console.log("Unable to create a new book. ");
                $scope.alert = { type: 'danger', msg: 'Unable to create a new book' };
                $scope.bookError = true;
            });
        }
    }

    // clickevent Cancel
    $scope.Cancel = function ()
    {
        $modalInstance.close();
    };
}]);