app.controller("sidebarController", ["$scope", "$rootScope", "Genres", "$modal",
    function ($scope, $rootScope, Genres, $modal)
{

    ////console.log("All systems online, sidebarController successfully engaged, awaiting orders.");


    $scope.Genres = Genres.index();

    $scope.sidebar = {};
    $scope.sidebar.checkedBoxes = {};

    $rootScope.sidebar = $scope.sidebar;

    
    $scope.viewGenreDetails = function(genre)
    {
        ////console.log("Initiating view genre details sequence, standby...");

        ////console.log("You pressed: " + genre.Name);

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

        modalInstance.result.then(function (redTruckWithStuffAndThings)
        {
            if (redTruckWithStuffAndThings.action !== "cancel")
            {
                for (var i = 0; i < $scope.Genres.length; i++)
                {
                    if ($scope.Genres[i].Id === redTruckWithStuffAndThings.data.Id)
                    {
                        if (redTruckWithStuffAndThings.action === "save") {
                            $scope.Genres[i].Name = redTruckWithStuffAndThings.data.Name;
                        }
                        else if (redTruckWithStuffAndThings.action === "delete")
                        {
                            $scope.Genres.splice(i, 1);
                        }
                    }
                }
            }
        });
    }
}]);
