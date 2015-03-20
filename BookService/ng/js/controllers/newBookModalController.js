app.controller("newBookModalController", ["$scope", "Authors", "Genres", "$modalInstance", function ($scope, Authors, Genres, $modalInstance) {

    $scope.genreError = false;


    $scope.newBook = {};

    // All authors in our system
    $scope.Authors = Authors.index();

    $scope.Genres = Genres.index();




    // Empty array that the user can fill with authors of this book
    $scope.bookAuthors = [];
    // When clicking the addAuthor button
    $scope.addAuthor = function ()
    {
        // Read current value of select list for authors (an author id)
        var selectedAuthorID = $scope.selectedAuthorID;
        // Find the author object by id amongst all authors
        for (var i = 0; i < $scope.Authors.length; i++) {
            if (selectedAuthorID == $scope.Authors[i].Id) {
                // Only add the autor to the bookAuthor list if not already in it (indexOf check)
                if ($scope.bookAuthors.indexOf($scope.Authors[i]) < 0) {
                    
                    $scope.bookAuthors.push($scope.Authors[i]);
                }
            }
        }
    }

    $scope.removeAuthor = function(value)
    {
        $scope.bookAuthors.splice(value, 1);

    }

    $scope.bookGenres = [];

    $scope.addGenre = function()
    {

        var selectedGenreID = $scope.selectedGenreID;

        for(var i = 0; i < $scope.Genres.length;i++)
        {
            if(selectedGenreID == $scope.Genres[i].Id)
            {
                if($scope.bookGenres.indexOf($scope.Genres[i]) < 0)
                {
                    $scope.bookGenres.push($scope.Genres[i]);
                }
            }
        }
    }

    $scope.removeGenre = function(value)
    {
        $scope.bookGenres.splice(value, 1);
    }

    // klickevent Create
    $scope.Create = function (book) {

        if ($scope.newBook.Name) {


            Genres.create($scope.newBook,
                function (data) {
                    //for successful calls
                    $modalInstance.close(data);
                },
                function () {
                    //for unsuccessful calls
                    console.log("Unable to create a new book. ");
                    $scope.alert = { type: 'danger', msg: 'Unable to create a new book' };
                    $scope.genreError = true;
                }
                );
        }
    }

    // klickevent Cancel
    $scope.Cancel = function () {
        $modalInstance.close();

    };
}]);