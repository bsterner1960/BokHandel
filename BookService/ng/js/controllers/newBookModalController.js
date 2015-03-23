app.controller("newBookModalController", ["$scope", "Authors", "Genres", "$modalInstance", function ($scope, Authors, Genres, $modalInstance) {

    $scope.genreError = false;

    console.log("newBookModalController is online, engaging scanners...");

    $scope.newBook = {};

    // All authors in our system
    $scope.Authors = Authors.index();

    $scope.Genres = Genres.index();



    $scope.selectedItem = "";
    $scope.bookItem = "";

    // Empty array that the user can fill with authors of this book
    $scope.bookAuthors = [];

    // When clicking the addAuthor button
    $scope.addAuthor = function ()
    {
        // Read current value of select list for authors (an author id)
        var idOfAuthorToAdd = $scope.selectedAuthorId;
        // Find the author object by id amongst all authors
        for (var i = 0; i < $scope.Authors.length; i++)
        {
            if (idOfAuthorToAdd == $scope.Authors[i].Id)
            {
                // Only add the autor to the bookAuthor list if not already in it (indexOf check)
                if ($scope.bookAuthors.indexOf($scope.Authors[i]) < 0)
                {
                    $scope.bookAuthors.push($scope.Authors[i]);
                }
            }
        }
    }

    $scope.removeAuthor = function(value)
    {

        console.log("Before the for loop!");
        for (i = 0; i < $scope.bookAuthors.length; i++)
        {
            console.log($scope.bookAuthors[i].Id);
            //if($scope.bookAuthors.)
        }
        console.log("initiate splice:");
        $scope.bookAuthors.splice(value, 1);

        console.log("slice completed, initiating the second for loop.")
        for (i = 0; i < $scope.bookAuthors.length; i++)
        {
            console.log($scope.bookAuthors[i].Id);
            //if($scope.bookAuthors.)
        }
        console.log("second for loop completed, signing off.");
    }

    // klickevent Create
    $scope.Create = function (book)
    {

        if ($scope.newBook.Name)
        {


            Genres.create($scope.newBook,
                function (data)
                {
                    //for successful calls
                    $modalInstance.close(data);
                },
                function ()
                {
                    //for unsuccessful calls
                    console.log("Fel vid Create genre. ");
                    $scope.alert = { type: 'danger', msg: 'Fel vid create Genre' };
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