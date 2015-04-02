app.controller("sidebarController", ["$scope", "$rootScope", "Genres", "$modal",
    function ($scope, $rootScope, Genres, $modal)
{

    //console.log("All systems online, sidebarController successfully engaged, awaiting orders.");

    

    // Loads all of the genres!
    $scope.loadEverything = function () {
        $scope.Genres = Genres.index();
    }

    $scope.loadEverything();


    $rootScope.$on('updateGenres', function () {
        $scope.loadEverything();
    });

    $scope.sidebar = {};
    $scope.sidebar.checkedBoxes = {};

    $rootScope.sidebar = $scope.sidebar;

    
    $scope.viewGenreDetails = function(genre)
    {
        //console.log("Initiating view genre details sequence, standby...");

        //console.log("You pressed: " + genre.Name);

        //opening a new modal instance
        var modalInstance = $modal.open(
        {
            templateUrl: 'partials/genreDetailsModal.html',
            controller: 'genreDetailsModalController',
            resolve:
            {
                genre: function ()
                {
                    return genre;
                }
            }
        });

        modalInstance.result.then(function (myReturnObject)
        {
            if (myReturnObject.action !== "cancel")
            {
                for (var i = 0; i < $scope.Genres.length; i++)
                {
                    if ($scope.Genres[i].Id === myReturnObject.data.Id)
                    {
                        if (myReturnObject.action === "save") {
                            $scope.Genres[i].Name = myReturnObject.data.Name;
                        }
                        else if (myReturnObject.action === "delete")
                        {
                            $scope.Genres.splice(i, 1);
                        }
                    }
                }
            }
        });
    }
}]);
